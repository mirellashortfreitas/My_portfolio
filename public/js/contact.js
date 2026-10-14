const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.className = '';
  status.textContent = 'Sending...';

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    if (!res.ok) throw new Error();

    form.reset();
    status.className = 'success';
    status.textContent = 'Message sent. Thank you!';
  } catch {
    status.className = 'error';
    status.textContent = 'Could not send your message. Please try again later.';
  }
});