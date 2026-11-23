/**
 * Sliding-window rate limiter for the contact form.
 * The pattern follows the one in Monody (packages/core/src/ratelimit/limiter.ts).
 *
 * Backed by Upstash Redis when its two variables are set, so the count is shared by every
 * server instance. Without them it counts in memory, which only limits one instance at a
 * time: fine for the dev server, weak on serverless where instances come and go.
 */
import type { Ratelimit } from '@upstash/ratelimit';
import { UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } from '$app/env/private';

export interface RateLimit {
	limit: number;
	windowMs: number;
}

const HOUR = 60 * 60 * 1000;

export const RATE_LIMITS = {
	/** One visitor: a handful of messages an hour is plenty for a real person. */
	contactPerIp: { limit: 5, windowMs: HOUR },
	/** Everyone together: keeps a flood from using up the email allowance. */
	contactOverall: { limit: 40, windowMs: 24 * HOUR }
} satisfies Record<string, RateLimit>;

const upstashLimiters = new Map<string, Ratelimit>();
const memoryBuckets = new Map<string, { count: number; resetAt: number }>();

// @upstash/* is only loaded when Redis is configured.
async function upstashLimiter({ limit, windowMs }: RateLimit): Promise<Ratelimit | null> {
	if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) return null;

	const id = `${limit}:${windowMs}`;
	const cached = upstashLimiters.get(id);
	if (cached) return cached;

	const [{ Ratelimit }, { Redis }] = await Promise.all([
		import('@upstash/ratelimit'),
		import('@upstash/redis')
	]);
	const limiter = new Ratelimit({
		redis: new Redis({ url: UPSTASH_REDIS_REST_URL, token: UPSTASH_REDIS_REST_TOKEN }),
		limiter: Ratelimit.slidingWindow(limit, `${windowMs} ms`),
		prefix: 'naous-dev:rl',
		analytics: false
	});
	upstashLimiters.set(id, limiter);
	return limiter;
}

/** Spends one of the key's allowance. True while there was still some left. */
export async function checkRateLimit(key: string, rule: RateLimit): Promise<boolean> {
	const upstash = await upstashLimiter(rule);
	if (upstash) {
		try {
			return (await upstash.limit(key)).success;
		} catch (error) {
			// If the store is down, let people through rather than lock everyone out.
			console.error('[rate-limit] store unavailable:', (error as Error).name);
			return true;
		}
	}

	const now = Date.now();
	const bucket = memoryBuckets.get(key);
	if (!bucket || bucket.resetAt < now) {
		memoryBuckets.set(key, { count: 1, resetAt: now + rule.windowMs });
		return true;
	}
	if (bucket.count >= rule.limit) return false;
	bucket.count += 1;
	return true;
}
