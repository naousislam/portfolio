/**
 * The email Nao receives when someone sends the contact form.
 *
 * Email clients ignore most modern CSS, so this is deliberately old-fashioned: tables for
 * layout and every style written inline. The colours and type mirror the tokens in app.css.
 */

export interface ContactMessage {
	name: string;
	email: string;
	message: string;
}

const ink = '#1b1c1f';
const inkFill = '#1f2023';
const inkSoft = '#2a2c30';
const line = '#e2e3e6';
const surface = '#f6f6f7';
const peach = '#fff0e4';

const sans = "'Instrument Sans', -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";
const serif = "'Instrument Serif', Georgia, 'Times New Roman', serif";

/** Everything a visitor typed is escaped before it goes anywhere near the markup. */
function escapeHtml(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}

function detailRow(label: string, value: string) {
	return `<tr>
<td style="padding:14px 0;border-top:1px solid ${line};font-family:${sans};font-size:15px;line-height:1.4;font-weight:600;letter-spacing:-0.01em;color:${ink};width:104px;vertical-align:top;">${label}</td>
<td style="padding:14px 0;border-top:1px solid ${line};font-family:${sans};font-size:16px;line-height:1.4;font-weight:500;color:${inkSoft};vertical-align:top;">${value}</td>
</tr>`;
}

export function contactEmail({ name, email, message }: ContactMessage) {
	const subject = `New message from ${name}`;
	const firstName = name.split(/\s+/)[0];
	const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent('Re: your message on naous.dev')}`;
	const received = new Intl.DateTimeFormat('en-CA', {
		dateStyle: 'medium',
		timeStyle: 'short',
		timeZone: 'America/Vancouver'
	}).format(new Date());

	const safeName = escapeHtml(name);
	const safeEmail = escapeHtml(email);
	const safeMessage = escapeHtml(message).replaceAll(/\r?\n/g, '<br>');

	const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<title>${escapeHtml(subject)}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=Instrument+Serif:ital@1&display=swap">
</head>
<body style="margin:0;padding:0;background:${surface};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${safeName} wrote to you through naous.dev.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${surface};">
<tr><td align="center" style="padding:40px 16px;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;">
<tr><td style="background:#ffffff;border-radius:28px;padding:40px 36px;">

<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
<td style="background:${peach};border-radius:999px;padding:8px 14px;font-family:${sans};font-size:14px;line-height:1;font-weight:500;color:${ink};">New Message</td>
</tr></table>

<h1 style="margin:22px 0 0;font-family:${sans};font-size:34px;line-height:1.08;font-weight:500;letter-spacing:-0.035em;color:${ink};">${safeName} would like to <span style="font-family:${serif};font-style:italic;font-weight:400;letter-spacing:-0.015em;">talk.</span></h1>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:26px;"><tr>
<td style="background:${surface};border-radius:18px;padding:22px 24px;font-family:${sans};font-size:17px;line-height:1.55;font-weight:500;color:${inkSoft};">${safeMessage}</td>
</tr></table>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;border-bottom:1px solid ${line};">
${detailRow('Name', safeName)}
${detailRow('Email', `<a href="mailto:${safeEmail}" style="color:${inkSoft};text-decoration:underline;text-decoration-color:#cbcdd1;">${safeEmail}</a>`)}
${detailRow('Received', escapeHtml(received))}
</table>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:32px;"><tr>
<td style="background:${inkFill};border-radius:999px;">
<a href="${replyHref}" style="display:inline-block;padding:17px 30px;font-family:${sans};font-size:16px;line-height:1;font-weight:500;color:#ffffff;text-decoration:none;">Reply to ${escapeHtml(firstName)} &rarr;</a>
</td>
</tr></table>

<p style="margin:18px 0 0;font-family:${sans};font-size:15px;line-height:1.5;font-weight:500;color:${inkSoft};">Or just hit reply. It goes straight to <strong style="font-weight:600;color:${ink};">${safeEmail}</strong>. Reply expected within <strong style="font-weight:600;color:${ink};">two business days</strong>.</p>

</td></tr>

</table>

</td></tr>
</table>
</body>
</html>`;

	const text = [
		`${name} would like to talk.`,
		'',
		message,
		'',
		`Name: ${name}`,
		`Email: ${email}`,
		`Received: ${received}`,
		'',
		'Sent from the contact form on naous.dev.'
	].join('\n');

	return { subject, html, text };
}
