const express = require('express');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const certificates = require('./data/certificates.json');
const extraCourses = require('./data/extracourse.json');

const app = express();
app.use(helmet());
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', apiLimiter);
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.get('/api/certificates', (req, res) => {
  const sorted = [...certificates].sort((a, b) => b.date.localeCompare(a.date));
  res.json(sorted);
});

app.get('/api/extras', (req, res) => {
  const sorted = [...extraCourses].sort((a, b) => b.date.localeCompare(a.date));
  res.json(sorted);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});