document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('carousel-track');
  const prev = document.getElementById('carousel-prev');
  const next = document.getElementById('carousel-next');

  if (!track) return;

  const slides = track.children;
  let index = 0;

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  prev.addEventListener('click', () => goTo(index - 1));
  next.addEventListener('click', () => goTo(index + 1));
});