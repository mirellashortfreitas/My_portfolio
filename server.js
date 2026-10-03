const express = require('express');
const path = require('path');
const certificates = require('./data/certificates.json');
const extraCourses = require('./data/extracourse.json');

const app = express();
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