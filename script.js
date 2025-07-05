// --- Toggle Dark Mode avec localStorage ---
const toggleDarkBtn = document.getElementById("toggle-dark");
const body = document.body;

function setDarkMode(enabled) {
  if (enabled) {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }
  localStorage.setItem("darkMode", enabled ? "true" : "false");
}

// Initialisation au chargement
const savedDarkMode = localStorage.getItem("darkMode");
setDarkMode(savedDarkMode === "true");

toggleDarkBtn.addEventListener("click", () => {
  const isDark = body.classList.contains("dark-mode");
  setDarkMode(!isDark);
});

// --- Smooth Scroll pour ancres ---
document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);
    const navbarHeight = document.querySelector("header").offsetHeight || 100;
    if (target) {
      const elementPosition =
        target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// --- Apparition progressive des projets au scroll ---
// Tous les projets pour apparition en cascade
const projets = document.querySelectorAll(".projet");

// Tous les autres éléments directs de main hors projets
const autresElements = Array.from(document.querySelectorAll("main > *")).filter(el => !el.classList.contains("projet"));

const observerOptions = { threshold: 0.1 };

const observerProjets = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const index = Array.from(projets).indexOf(entry.target);
      entry.target.style.transitionDelay = `${index * 200}ms`;
      entry.target.classList.add("visible");
      observerProjets.unobserve(entry.target);
    }
  });
}, observerOptions);

const observerAutres = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const index = Array.from(autresElements).indexOf(entry.target);
      entry.target.style.transitionDelay = `${index * 200}ms`;
      entry.target.classList.add("visible");
      observerAutres.unobserve(entry.target);
    }
  });
}, observerOptions);

// Initialisation : cache tout
projets.forEach(p => {
  p.classList.add("hidden");
  observerProjets.observe(p);
});

autresElements.forEach(el => {
  el.classList.add("hidden");
  observerAutres.observe(el);
});

// --- Ton code formulaire, bouton fuyant, pulsation titre ---

// Formulaire avec envoi AJAX vers contact.php
document
  .querySelector(".contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const form = this;
    const response =
      document.getElementById("response") ||
      (() => {
        const p = document.createElement("p");
        p.id = "response";
        form.appendChild(p);
        return p;
      })();

    const formData = new FormData(form);

    fetch("contact.php", {
      method: form.method,
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur réseau");
        return res.text();
      })
      .then((text) => {
        response.textContent = "Message envoyé ! Merci pour ton contact.";
        response.classList.add("show");
        form.reset();
      })
      .catch((err) => {
        response.textContent = "Erreur lors de l'envoi, merci de réessayer.";
        response.classList.add("show");
        response.style.backgroundColor = "red";
        response.style.color = "white";
      });
  });

// Bouton "Ne surtout pas appuyer" qui s’échappe partout sur la page
const btn = document.getElementById("tricky-btn");

document.body.addEventListener("mousemove", (e) => {
  const btnRect = btn.getBoundingClientRect();
  const btnCenterX = btnRect.left + btnRect.width / 2;
  const btnCenterY = btnRect.top + btnRect.height / 2;

  const distance = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

  if (distance < 100) {
    let newX = btn.offsetLeft + (btnCenterX - e.clientX);
    let newY = btn.offsetTop + (btnCenterY - e.clientY);

    const maxX = window.innerWidth - btn.offsetWidth;
    const maxY = window.innerHeight - btn.offsetHeight;

    newX = Math.max(0, Math.min(maxX, newX));
    newY = Math.max(0, Math.min(maxY, newY));

    btn.style.left = `${newX}px`;
    btn.style.top = `${newY}px`;
  }
});

btn.addEventListener("click", () => {
  document.body.classList.add("collapse-page");
});

document.querySelectorAll(".projet h3").forEach((h3) => {
  h3.addEventListener("mouseenter", () => {
    h3.classList.add("pulse");
  });
  h3.addEventListener("mouseleave", () => {
    h3.classList.remove("pulse");
  });
});
