const toggleBtn = document.getElementById('theme-toggle');
const root = document.documentElement;

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

const savedTheme = localStorage.getItem('theme');
setTheme(savedTheme || 'dark');
setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

toggleBtn.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

const certList = document.getElementById('certificates-list');
let allCertificates = [];
let activeCategory = 'All';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(date) {
  if (!date) return '';
  const [year, month] = date.split('-');
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

function renderCertificates() {
  const categories = ['All', ...new Set(allCertificates.map(c => c.category))];

  const visible = activeCategory === 'All'
    ? allCertificates
    : allCertificates.filter(c => c.category === activeCategory);

  const filtersHtml = categories
    .map(cat => `<button class="filter-btn ${cat === activeCategory ? 'active' : ''}" data-category="${cat}">${cat}</button>`)
    .join('');

  const cardsHtml = visible
    .map(c => `
      <article class="cert-card">
        <span class="cert-category">${c.category}</span>
        <h3>${c.title}</h3>
        <p class="cert-meta">${c.issuer}${c.date ? ' · ' + formatDate(c.date) : ''}</p>
        ${c.link ? `<a class="cert-link" href="${c.link}" target="_blank" rel="noopener">View certificate →</a>` : ''}
      </article>
    `)
    .join('');

  certList.innerHTML = `
    <div class="filters">${filtersHtml}</div>
    <div class="cert-grid">${cardsHtml}</div>
  `;

  certList.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.category;
      renderCertificates();
    });
  });
}

async function loadCertificates() {
  try {
    const response = await fetch('/api/certificates');
    if (!response.ok) throw new Error('Request failed');
    allCertificates = await response.json();
    renderCertificates();
  } catch (error) {
    certList.innerHTML = '<p>Could not load certificates right now.</p>';
    console.error(error);
  }
}

loadCertificates();

const extrasList = document.getElementById('extras-courses-list');
let allExtras = [];
let activeExtraCategory = 'All';

function renderExtras() {
  const categories = ['All', ...new Set(allExtras.map(c => c.category))];

  const visible = activeExtraCategory === 'All'
    ? allExtras
    : allExtras.filter(c => c.category === activeExtraCategory);

  const filtersHtml = categories
    .map(cat => `<button class="filter-btn ${cat === activeExtraCategory ? 'active' : ''}" data-category="${cat}">${cat}</button>`)
    .join('');

  const cardsHtml = visible
    .map(c => `
      <article class="cert-card">
        <span class="cert-category">${c.category}</span>
        <h3>${c.title}</h3>
        <p class="cert-meta">${c.issuer}${c.date ? ' · ' + formatDate(c.date) : ''}</p>
        ${c.link ? `<a class="cert-link" href="${c.link}" target="_blank" rel="noopener">View certificate →</a>` : ''}
      </article>
    `)
    .join('');

  extrasList.innerHTML = `
    <div class="filters">${filtersHtml}</div>
    <div class="cert-grid">${cardsHtml}</div>
  `;

  extrasList.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeExtraCategory = btn.dataset.category;
      renderExtras();
    });
  });
}

async function loadExtras() {
  try {
    const response = await fetch('/api/extras');
    if (!response.ok) throw new Error('Request failed');
    allExtras = await response.json();
    renderExtras();
  } catch (error) {
    extrasList.innerHTML = '<p>Could not load extra courses right now.</p>';
    console.error(error);
  }
}

loadExtras();