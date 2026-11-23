import { enhancedImages } from '@sveltejs/enhanced-img';
import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		enhancedImages(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter(),
			prerender: {
				handleHttpError: ({ path, message }) => {
					// TODO(Nao): remove this once static/resume.pdf (public, no phone number) is added.
					// Every other broken link still fails the build.
					if (path === '/resume.pdf') {
						console.warn('\n[todo] static/resume.pdf is missing; the Résumé links will 404.\n');
						return;
					}
					throw new Error(message);
				}
			}
		})
	]
});
