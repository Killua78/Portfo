// Mode sombre
document.getElementById('toggle-dark').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Formulaire avec envoi AJAX vers contact.php
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const form = this;
  const response = document.getElementById('response') || (() => {
    const p = document.createElement('p');
    p.id = 'response';
    form.appendChild(p);
    return p;
  })();

  // Récupérer les données du formulaire
  const formData = new FormData(form);

  fetch('contact.php', {
    method: form.method,
    body: formData,
  })
  .then(res => {
    if (!res.ok) throw new Error('Erreur réseau');
    return res.text();
  })
  .then(text => {
    // Afficher un vrai message de succès
    response.textContent = "Message envoyé ! Merci pour ton contact.";
    response.classList.add('show');
    form.reset();
  })
  .catch(err => {
    response.textContent = "Erreur lors de l'envoi, merci de réessayer.";
    response.classList.add('show');
    response.style.backgroundColor = 'red';
    response.style.color = 'white';
  });
});

// Bouton "Ne surtout pas appuyer" qui s’échappe partout sur la page
const btn = document.getElementById('tricky-btn');

document.body.addEventListener('mousemove', (e) => {
  const btnRect = btn.getBoundingClientRect();
  const btnCenterX = btnRect.left + btnRect.width / 2;
  const btnCenterY = btnRect.top + btnRect.height / 2;

  const distance = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

  if (distance < 100) {
    let newX = btn.offsetLeft + (btnCenterX - e.clientX);
    let newY = btn.offsetTop + (btnCenterY - e.clientY);

    // Limites de la page
    const maxX = window.innerWidth - btn.offsetWidth;
    const maxY = window.innerHeight - btn.offsetHeight;

    newX = Math.max(0, Math.min(maxX, newX));
    newY = Math.max(0, Math.min(maxY, newY));

    btn.style.left = `${newX}px`;
    btn.style.top = `${newY}px`;
  }
});

// Effondrement de la page au clic sur le bouton
btn.addEventListener('click', () => {
  document.body.classList.add('collapse-page');
});

document.querySelectorAll('.projet h3').forEach(h3 => {
  h3.addEventListener('mouseenter', () => {
    h3.classList.add('pulse');
  });
  h3.addEventListener('mouseleave', () => {
    h3.classList.remove('pulse');
  });
});
