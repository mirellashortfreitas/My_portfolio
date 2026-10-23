const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.setAttribute('role', 'dialog');
lightbox.setAttribute('aria-label', 'Enlarged photo');
lightbox.innerHTML = '<button class="lb-close" aria-label="Close">&times;</button><img alt="">';
document.body.appendChild(lightbox);

const lbImg = lightbox.querySelector('img');
const close = () => lightbox.classList.remove('open');

document.querySelectorAll('.gallery-item img').forEach(img => {
  img.addEventListener('click', () => {
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lightbox.classList.add('open');
  });
});

lightbox.addEventListener('click', close);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') close();
});

// Disable right-click and dragging on gallery images
document.querySelectorAll('.gallery-item img').forEach(img => {
  img.addEventListener('contextmenu', e => e.preventDefault());
  img.setAttribute('draggable', 'false');
});