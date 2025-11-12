/*
  send-test-email.js
  Simple Node script to test SMTP credentials (e.g., Mailtrap) with nodemailer.
  Usage (PowerShell):
    $env:SMTP_HOST='smtp.mailtrap.io'; $env:SMTP_PORT='2525'; $env:SMTP_USER='your_user'; $env:SMTP_PASS='your_pass'; $env:SEND_TO='you@example.com'
    node scripts/send-test-email.js

  Do NOT commit credentials. This script reads env vars directly.
*/

// Optionally load .env file when present (dev only)
try { require('dotenv').config(); } catch (e) { /* dotenv optional */ }
const nodemailer = require('nodemailer');

async function main() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.SEND_TO || process.env.MY_EMAIL;
  const from = process.env.SEND_FROM || user;

  if (!host || !user || !pass || !to) {
    console.error('Missing required environment variables. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and SEND_TO.');
    process.exit(1);
  }

  const transporter = nodemailer.createTransport({ host, port, auth: { user, pass }, secure: port === 465 });

  try {
    const info = await transporter.sendMail({
      from: from,
      to: to,
      subject: 'Portfolio Test Email (Mailtrap)',
      text: `This is a test message sent at ${new Date().toISOString()} to verify SMTP credentials.`
    });
    console.log('Test email sent. Response:', info && info.response ? info.response : info);
    process.exit(0);
  } catch (err) {
    console.error('Error sending test email:', err);
    process.exit(2);
  }
}

main();
