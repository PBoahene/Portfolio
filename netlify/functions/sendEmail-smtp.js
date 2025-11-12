const nodemailer = require('nodemailer');

// Netlify function using nodemailer. Configure the following env vars in Netlify:
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SEND_TO, SEND_FROM

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  let body = {};
  try { body = JSON.parse(event.body); } catch (e) { return { statusCode: 400, body: 'Invalid JSON' }; }
  const { name, email, message } = body;
  if (!name || !email || !message) return { statusCode: 400, body: 'Missing fields' };

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.SEND_TO || process.env.MY_EMAIL;
  const from = process.env.SEND_FROM || process.env.SMTP_USER;

  if (!host || !user || !pass || !to) {
    return { statusCode: 501, body: 'SMTP not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS, and SEND_TO.' };
  }

  try {
    const transporter = nodemailer.createTransport({ host, port, auth: { user, pass }, secure: port === 465 });
    await transporter.sendMail({ from, to, subject: `Portfolio message from ${name}`, text: `Name: ${name}\nEmail: ${email}\n\n${message}` });
    return { statusCode: 200, body: JSON.stringify({ message: 'Message sent (SMTP).' }) };
  } catch (err) {
    console.error('SMTP error', err);
    return { statusCode: 502, body: 'Unable to send email' };
  }
};
