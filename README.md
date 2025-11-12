# Portfolio

A modern, fully responsive personal portfolio website built with HTML5, CSS3, and JavaScript.

## Run locally

Install dev dependencies and run a static server (recommended):

1. npm install
2. npm run start

Open http://localhost:8080 in your browser.

## Tests (E2E)

The repository includes Playwright tests that run against a tiny Node static server.

1. npm install
2. npx playwright install
3. npx playwright test

Note: The contact tests mock the serverless endpoint; to enable real email sending deploy one of the serverless functions and configure SENDGRID_API_KEY.

```

## Local SMTP testing with Mailtrap (example)

You can test the SMTP serverless variant locally using Mailtrap (or any SMTP testing inbox).

1. Create a free Mailtrap account and get SMTP credentials (host, port, user, pass).
2. Option A — PowerShell (ad-hoc):

```powershell
$env:SMTP_HOST = 'smtp.mailtrap.io'
$env:SMTP_PORT = '2525'
$env:SMTP_USER = '<your-mailtrap-user>'
$env:SMTP_PASS = '<your-mailtrap-pass>'
$env:SEND_TO = '<your-email-or-inbox>'
npm run test:smtp
```

3. Option B — .env file (development):

Create a `.env` file in the project root with:

```
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_user
SMTP_PASS=your_pass
SEND_TO=you@example.com
```

Then run:

```powershell
npm install
npm run test:smtp
```

The script `scripts/send-test-email.js` uses `nodemailer` and will send a short test message; Mailtrap will capture it so you don't send real emails.

## Deploying to Vercel or Netlify (CI / env vars)

Both Vercel and Netlify support serverless functions used by this project. Two variants are included:

- `api/sendEmail.js` (example SendGrid integration)
- `api/sendEmail-smtp.js` (nodemailer / SMTP example)
- `netlify/functions/sendEmail.js` and `netlify/functions/sendEmail-smtp.js` for Netlify

Recommended environment variables (set these in your deployment platform):

- For SendGrid variant:
	- SENDGRID_API_KEY — your SendGrid API key
	- SEND_TO — destination email address
	- SEND_FROM — optional from address (defaults to no-reply@example.com)

- For SMTP (nodemailer) variant:
	- SMTP_HOST — SMTP server hostname (e.g., smtp.sendgrid.net, smtp.gmail.com)
	- SMTP_PORT — port (465 for SMTPS, 587 for STARTTLS)
	- SMTP_USER — SMTP username
	- SMTP_PASS — SMTP password
	- SEND_TO — destination email
	- SEND_FROM — from address (optional)

On Vercel:

1. Deploy the project (connect the repo).
2. In the Dashboard -> Settings -> Environment Variables, add the required env vars.
3. The Vercel functions live under `/api/*` and will be available automatically.

On Netlify:

1. Add files under `netlify/functions/` (already included). Netlify will build them as functions.
2. Add the required env vars under Site settings -> Build & deploy -> Environment.

Test your deployed contact form by sending a message from the live site; the client will try `/api/sendEmail` and `/.netlify/functions/sendEmail` as configured.

## Replacing placeholder images

The current project uses SVG placeholders in `assets/images/` named:

- `project-1.svg`, `project-2.svg`, `project-3.svg`, `project-4.svg`

To replace them with your own images, provide PNG/JPG/SVG files and:

1. Add them to `assets/images/` keeping the same filenames — the HTML already references those names.
2. For retina images, include `project-1@2x.png` etc. and update `index.html` if you want srcset support.

If you'd like, you can upload the images here and I'll replace the placeholder SVGs directly.

# Portfolio
A modern, fully responsive personal portfolio website built with HTML5, CSS3, and JavaScript.
