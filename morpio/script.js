console.log("test");
console.log("Bienvenue :");
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

// choix joueur initial
function choixJoueurInitial() {
  joueur = Math.random() < 0.5 ? "X" : "O";

  if (joueur === "X") {
    joueurActif = playerX;
  } else {
    joueurActif = playerO;
  }

  choixDiv.textContent = `Le joueur ${joueurActif} commence !`;
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

  // Récupère les valeurs actuelles
  window.playerX = document.querySelector('input[name="playerX"]').value.trim();
  window.playerO = document.querySelector('input[name="playerO"]').value.trim();

  // cacher le formulaire
  e.target.style.display = "none";

  // afficher la grille
  document.querySelector(".grille").style.display = "grid";
  document.getElementById("reset").style.display = "inline-block";

  // initialiser la partie
  choixJoueurInitial();
});

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
  joueur = "X";
  jeuTermine = false;
  choixJoueurInitial();
  document.getElementById("messageVictoire").textContent = "";
  document.getElementById("messageVictoire").textContent = "";
}

document.getElementById("reset").addEventListener("click", resetJeu);
