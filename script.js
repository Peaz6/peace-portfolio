document.addEventListener('DOMContentLoaded', () => {
  const views = document.querySelectorAll('.view');
  let busy = false;

  function syncAria() {
    views.forEach(view => {
      view.setAttribute('aria-hidden', view.classList.contains('active') ? 'false' : 'true');
    });
  }

  function show(id, updateHash) {
    const next = document.getElementById(id);
    const current = document.querySelector('.view.active');
    if (!next || busy || next === current) return;

    busy = true;
    current.classList.add('leaving');

    if (updateHash !== false && history.pushState) {
      history.pushState(null, '', '#' + id);
    }

    setTimeout(() => {
      current.classList.remove('active', 'leaving');
      next.classList.add('active');
      window.scrollTo(0, 0);
      syncAria();
      busy = false;
    }, 350);
  }

  function activateFromHash() {
    const target = window.location.hash.slice(1);
    if (!target || !document.getElementById(target) || target === document.querySelector('.view.active').id) {
      return;
    }
    busy = true;
    document.querySelector('.view.active').classList.remove('active');
    document.getElementById(target).classList.add('active');
    window.scrollTo(0, 0);
    syncAria();
    busy = false;
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

  window.addEventListener('hashchange', activateFromHash);

  const form = document.querySelector('.contact-form');
  const formStatus = document.querySelector('.form-status');
  if (form && formStatus) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      formStatus.textContent = 'Thanks for reaching out — I will get back to you soon.';
      form.reset();
      setTimeout(() => {
        formStatus.textContent = '';
      }, 6000);
    });
  }

  activateFromHash();
  syncAria();
});