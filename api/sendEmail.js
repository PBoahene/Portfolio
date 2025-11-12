// Vercel /serverless function example (Node.js)
// Expects environment variable SENDGRID_API_KEY or SMTP_* variables to be set.
// This function proxies the contact form into an email provider.

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error: 'Method not allowed'});
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });

  // Example using SendGrid (preferred for serverless). Requires SENDGRID_API_KEY env var.
  if (process.env.SENDGRID_API_KEY) {
    try {
      const sgRes = await fetch('https://api.sendgrid.com/v3/mail/send', {
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
      if (!sgRes.ok) {
        const text = await sgRes.text();
        console.error('SendGrid error', text);
        return res.status(502).json({ error: 'Email provider error' });
      }
      return res.status(200).json({ message: 'Message sent (SendGrid).' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  // If no SendGrid key, return 501 with instructions
  return res.status(501).json({ error: 'Email service not configured. Set SENDGRID_API_KEY in environment.' });
}
