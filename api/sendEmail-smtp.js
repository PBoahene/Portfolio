const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.SEND_TO;

  if (!host || !user || !pass || !to) {
    return res.status(501).json({ 
      error: 'SMTP not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS, and SEND_TO.' 
    });
  }

  try {
    const transporter = nodemailer.createTransporter({
      host,
      port,
      auth: { user, pass },
      secure: port === 465
    });

    await transporter.sendMail({
      from: user,
      to: to,
      subject: Portfolio Contact: Message from ,
      text: Name: \nEmail: \n\nMessage:\n,
      html: <h3>New Portfolio Contact</h3><p><strong>Name:</strong> </p><p><strong>Email:</strong> </p><p><strong>Message:</strong></p><p></p>
    });

    return res.status(200).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error('SMTP error:', err);
    return res.status(502).json({ error: 'Unable to send email', details: err.message });
  }
};
