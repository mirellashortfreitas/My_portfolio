require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const certificates = require('./data/certificates.json');
const extraCourses = require('./data/extracourse.json');

const app = express();
app.set('trust proxy', 1); // remove if there is NO proxy in front (e.g. running locally)
app.use(helmet());
app.use(express.json({ limit: '10kb' }));

const PORT = process.env.PORT || 3000;

// ---------- Rate limiters ----------
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5, // 5 messages per IP per hour
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', apiLimiter);

// ---------- Static files ----------
app.use(express.static(path.join(__dirname, 'public')));

// ---------- Data API ----------
app.get('/api/certificates', (req, res) => {
  const sorted = [...certificates].sort((a, b) => b.date.localeCompare(a.date));
  res.json(sorted);
});

app.get('/api/extras', (req, res) => {
  const sorted = [...extraCourses].sort((a, b) => b.date.localeCompare(a.date));
  res.json(sorted);
});

// ---------- Contact form ----------
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

app.post('/api/contact', contactLimiter, async (req, res) => {
  const { name, email, message, website } = req.body || {};

  // Honeypot: pretend success so the bot does not retry
  if (website) return res.json({ ok: true });

  if ([name, email, message].some(v => typeof v !== 'string')) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  const n = name.trim();
  const e = email.trim();
  const m = message.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  if (!n || n.length > 80 || e.length > 120 || !emailOk || m.length < 10 || m.length > 2000) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  try {
    await transporter.sendMail({
      from: `"Portfolio" <${process.env.SMTP_USER}>`, // never use user input here
      to: process.env.CONTACT_TO,
      replyTo: e,
      subject: `Portfolio contact from ${n.replace(/[\r\n]+/g, ' ')}`, // prevents header injection
      text: `Name: ${n}\nEmail: ${e}\n\n${m}`, // plain text, not HTML
    });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not send message' });
  }
});

// ---------- 404 and error handlers (always last) ----------
app.use((req, res) => res.status(404).send('Not found'));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: 'Something went wrong' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});