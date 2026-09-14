document.addEventListener('DOMContentLoaded', () => {
  const views = document.querySelectorAll('.view');
  let busy = false;

  function show(id) {
    const next = document.getElementById(id);
    const current = document.querySelector('.view.active');
    if (!next || busy || next === current) return;

    busy = true;
    current.classList.add('leaving');

    setTimeout(() => {
      current.classList.remove('active', 'leaving');
      next.classList.add('active');
      window.scrollTo(0, 0);
      busy = false;
    }, 350);
  }

  views.forEach(view => {
    view.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', event => {
        const id = link.getAttribute('href').slice(1);
        if (document.getElementById(id)) {
          event.preventDefault();
          show(id);
        }
      });
    });
  });
});