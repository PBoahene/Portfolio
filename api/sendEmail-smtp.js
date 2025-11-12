// Vercel serverless function example using nodemailer (SMTP)
// Set these environment variables in your deployment platform:
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SEND_TO, SEND_FROM

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.SEND_TO || process.env.MY_EMAIL;
  const from = process.env.SEND_FROM || process.env.SMTP_USER;

  if (!host || !user || !pass || !to) {
    return res.status(501).json({ error: 'SMTP not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS, and SEND_TO.' });
  }

  try {
    const transporter = nodemailer.createTransport({ host, port, auth: { user, pass }, secure: port === 465 });
    await transporter.sendMail({
      from: from,
      to: to,
      subject: `Portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    });
    return res.status(200).json({ message: 'Message sent (SMTP).' });
  } catch (err) {
    console.error('SMTP error', err);
    return res.status(502).json({ error: 'Unable to send email' });
  }
}
