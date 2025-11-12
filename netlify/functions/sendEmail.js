const fetch = require('node-fetch');

// Netlify Function: expects SENDGRID_API_KEY env var or SMTP to be configured
exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  let body = {};
  try { body = JSON.parse(event.body); } catch (e) { return { statusCode: 400, body: 'Invalid JSON' }; }
  const { name, email, message } = body;
  if (!name || !email || !message) return { statusCode: 400, body: 'Missing fields' };

  if (process.env.SENDGRID_API_KEY) {
    try {
      const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: process.env.SEND_TO || process.env.MY_EMAIL }], subject: `Portfolio message from ${name}` }],
          from: { email: process.env.SEND_FROM || 'no-reply@example.com', name: 'Portfolio App' },
          content: [{ type: 'text/plain', value: `Name: ${name}\nEmail: ${email}\n\n${message}` }]
        })
      });
      if (!res.ok) {
        const t = await res.text();
        console.error('SendGrid response', t);
        return { statusCode: 502, body: 'Email provider error' };
      }
      return { statusCode: 200, body: JSON.stringify({ message: 'Message sent (SendGrid).' }) };
    } catch (err) {
      console.error(err);
      return { statusCode: 500, body: 'Server error' };
    }
  }

  return { statusCode: 501, body: 'Email service not configured. Set SENDGRID_API_KEY.' };
};
