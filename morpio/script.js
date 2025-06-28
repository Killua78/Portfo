console.log("🔥 Mon script.js est chargé !");

const grille = document.querySelector(".grille");
const resetBtn = document.getElementById("reset");
const revancheBtn = document.getElementById("revanche");
const scoreboard = document.getElementById("scoreboard");
const modal = document.getElementById("confirmResetModal");
const btnYes = document.getElementById("confirmResetYes");
const btnNo = document.getElementById("confirmResetNo");

document.addEventListener("DOMContentLoaded", () => {
  // Cache les éléments tant que les noms ne sont pas encore saisis
  resetBtn.classList.add("hidden");
  resetBtn.classList.remove("visible");

  revancheBtn.classList.add("hidden");
  revancheBtn.classList.remove("visible");

  scoreboard.classList.add("hidden");
  scoreboard.classList.remove("visible");
});

// Variables
let joueur = "X";

// nom du joueur from PHP
let joueurActif;

// pour terminer le jeu
let jeuTermine = false;

// message tour
const choixDiv = document.querySelector("#choix");

// conditions de victoire
const victoires = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Désactive les clics sur toutes les cases au départ
document.querySelectorAll(".case").forEach((caseElement) => {
  caseElement.style.pointerEvents = "none";
});

// choix joueur initial
function choixJoueurInitial() {
  joueur = Math.random() < 0.5 ? "X" : "O";

  if (joueur === "X") {
    joueurActif = playerX;
  } else {
    joueurActif = playerO;
  }

  choixDiv.textContent = `${joueurActif} commence !`;
  choixDiv.style.color = joueur === "X" ? "red" : "blue";
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault(); // stop le rechargement

  const playerXInput = document
    .querySelector('input[name="playerX"]')
    .value.trim();
  const playerOInput = document
    .querySelector('input[name="playerO"]')
    .value.trim();

  if (!playerXInput || !playerOInput) {
    alert("Remplis les deux noms !");
    return;
  }

  document.querySelectorAll(".case").forEach((caseElement) => {
    caseElement.style.pointerEvents = "auto";
  });

  // Récupère les valeurs actuelles
  window.playerX = document.querySelector('input[name="playerX"]').value.trim();
  window.playerO = document.querySelector('input[name="playerO"]').value.trim();

  // cacher le formulaire
  e.target.style.display = "none";

  resetBtn.classList.add("visible");
  resetBtn.classList.remove("hidden");

  revancheBtn.classList.add("visible");
  revancheBtn.classList.remove("hidden");

  scoreboard.classList.add("visible");
  scoreboard.classList.remove("hidden");

  // afficher le tableau des scores avec les noms
  afficherScoreboard();

  // initialiser la partie
  choixJoueurInitial();
});

/**
 * Affiche le tableau de score et met à jour les noms des joueurs.
 * Doit être appelé dès que les joueurs sont connus (après formulaire validé).
 */
function afficherScoreboard() {
  const scoreboard = document.getElementById("scoreboard");

  // Vérifie que les noms joueurs sont définis
  if (typeof playerX !== "undefined" && typeof playerO !== "undefined") {
    // Met à jour les noms dans le tableau
    document.getElementById("playerXName").textContent = playerX;
    document.getElementById("playerOName").textContent = playerO;
    // Affiche le tableau
    scoreboard.classList.add("visible");
    scoreboard.classList.remove("hidden");
  } else {
    // Sinon, cache le tableau
    scoreboard.classList.add("hidden");
    scoreboard.classList.remove("visible");
  }
}

// afficher les scores
scoreboard.classList.add("visible");
scoreboard.classList.remove("hidden");

// Pour mettre à jour le message pendant le jeu, après chaque coup :
function majMessageTour() {
  choixDiv.textContent = `Au tour de ${joueurActif}`;
  choixDiv.style.color = joueur === "X" ? "red" : "blue";
}

// Fonctions
function changerJoueur() {
  if (joueur === "X") {
    joueur = "O";
    joueurActif = playerO;
  } else {
    joueur = "X";
    joueurActif = playerX;
  }
  majMessageTour(); // appelle la fonction qui met à jour le message à chaque changement
  console.log(
    "changerJoueur: joueur =",
    joueur,
    ", joueurActif =",
    joueurActif
  );
}

let cases = document.querySelectorAll(".case");

function checkVictoire() {
  let victoire = "";
  victoires.forEach((i) => {
    if (
      cases[i[0]].querySelector(".cercle") &&
      cases[i[1]].querySelector(".cercle") &&
      cases[i[2]].querySelector(".cercle")
    ) {
      victoire = "O";
    }
    if (
      cases[i[0]].querySelector(".croix") &&
      cases[i[1]].querySelector(".croix") &&
      cases[i[2]].querySelector(".croix")
    ) {
      victoire = "X";
    }
  });

  if (victoire) {
    fetch(`index.php?winner=${victoire}`)
      .then((res) => res.json())
      .then((data) => {
        const scoreXEl = document.getElementById("scoreX");
        const scoreOEl = document.getElementById("scoreO");
        const plusX = document.getElementById("plusX");
        const plusO = document.getElementById("plusO");

        if (victoire === "X") {
          scoreXEl.textContent = data.scoreX;
          plusX.classList.add("animate");
          setTimeout(() => plusX.classList.remove("animate"), 600);
        } else if (victoire === "O") {
          scoreOEl.textContent = data.scoreO;
          plusO.classList.add("animate");
          setTimeout(() => plusO.classList.remove("animate"), 600);
        }
      });

    const gagnant = victoire === "X" ? playerX : playerO;
    document.getElementById("messageVictoire").textContent =
      "Victoire de " + gagnant + " !";
    choixDiv.textContent = "";
    jeuTermine = true;
  } else {
    const toutesOccupees = [...cases].every(
      (caseElement) =>
        caseElement.querySelector(".croix") ||
        caseElement.querySelector(".cercle")
    );
    if (toutesOccupees) {
      document.getElementById("messageVictoire").textContent = "Match nul !";
      choixDiv.textContent = "";
      jeuTermine = true;
    }
  }
}


cases.forEach((case_morp) => {
  case_morp.addEventListener("click", () => {
    if (jeuTermine) return;

    if (
      case_morp.querySelector(".cercle") ||
      case_morp.querySelector(".croix")
    ) {
      return;
    }

    const turn = document.createElement("div");
    if (joueur === "X") {
      turn.classList.add("croix");
    } else {
      turn.classList.add("cercle");
    }

    case_morp.appendChild(turn);
    checkVictoire();

    if (!jeuTermine) {
      changerJoueur(); // ✅ met à jour joueur ET joueurActif
    }
  });
});

function resetJeu() {
  cases.forEach((case_morp) => {
    case_morp.innerHTML = ""; // vider les cases
  });

  jeuTermine = false;

  document.getElementById("messageVictoire").textContent = "";
  // affiche le formulaire au reset et on cache le reste
  document.querySelector("#choixNoms").style.display = "flex";

  grille.classList.add("hidden");
  grille.classList.remove("visible");

  resetBtn.classList.add("hidden");
  resetBtn.classList.remove("visible");

  document.getElementById("choix").style.display = "none";
  // vider les input
  document.querySelector('input[name="playerX"]').value = "";
  document.querySelector('input[name="playerO"]').value = "";

  fetch("index.php?reset=1");
  window.location.href = "index.php?reset=1";
}

function revancheJeu() {
  cases.forEach((case_morp) => {
    case_morp.innerHTML = ""; // vider les cases
  });

  jeuTermine = false;
  choixJoueurInitial();
  document.getElementById("messageVictoire").textContent = "";
}

document.getElementById("revanche").addEventListener("click", revancheJeu);

// modal de confirmation de reset
resetBtn.addEventListener("click", (e) => {
  e.preventDefault(); // bloque l'action par défaut (rechargement)
  modal.classList.remove("hidden");
  modal.classList.add("visible");
});

btnYes.addEventListener("click", () => {
  // Ici on lance le reset réel (rechargement avec reset=1)
  window.location.href = "index.php?reset=1";
});

btnNo.addEventListener("click", () => {
  // Ferme juste la modal
  modal.classList.remove("visible");
  modal.classList.add("hidden");
});