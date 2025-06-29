console.log("🔥 Mon script.js est chargé !");

// Récupération des éléments du DOM utilisés plusieurs fois
const grille = document.querySelector(".grille");
const resetBtn = document.getElementById("reset");
const revancheBtn = document.getElementById("revanche");
const scoreboard = document.getElementById("scoreboard");
const modal = document.getElementById("confirmResetModal");
const btnYes = document.getElementById("confirmResetYes");
const btnNo = document.getElementById("confirmResetNo");

// Au chargement complet du DOM, on cache les éléments qui dépendent des noms joueurs
document.addEventListener("DOMContentLoaded", () => {
  // Boutons reset, revanche et tableau des scores cachés tant que noms pas saisis
  resetBtn.classList.add("hidden");
  resetBtn.classList.remove("visible");

  revancheBtn.classList.add("hidden");
  revancheBtn.classList.remove("visible");

  scoreboard.classList.add("hidden");
  scoreboard.classList.remove("visible");
});

// Variables de gestion du jeu
let joueur = "X"; // joueur courant, "X" ou "O"
let joueurActif; // nom du joueur actuel (playerX ou playerO)
let jeuTermine = false; // flag pour savoir si la partie est finie

// Élément pour afficher le message du tour
const choixDiv = document.querySelector("#choix");

// Toutes les combinaisons gagnantes possibles sur la grille
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

// Au départ, on bloque les clics sur les cases (avant que les joueurs soient connus)
document.querySelectorAll(".case").forEach((caseElement) => {
  caseElement.style.pointerEvents = "none";
});

// Choix aléatoire du joueur qui commence et mise à jour de l’affichage
function choixJoueurInitial() {
  joueur = Math.random() < 0.5 ? "X" : "O";

  joueurActif = joueur === "X" ? playerX : playerO;

  choixDiv.textContent = `${joueurActif} commence !`;
  choixDiv.style.color = joueur === "X" ? "red" : "blue";
}

// Met la 1ère lettre en majuscule, le reste en minuscules
function ucfirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Gestion du formulaire noms joueurs
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault(); // bloque le rechargement de page

  // Récupère les noms, nettoie et formate avec majuscule initiale
  const playerXInput = ucfirst(
    document.querySelector('input[name="playerX"]').value.trim()
  );
  const playerOInput = ucfirst(
    document.querySelector('input[name="playerO"]').value.trim()
  );

  // Vérifie que les deux noms sont remplis
  if (!playerXInput || !playerOInput) {
    alert("Remplis les deux noms !");
    return;
  }

  // Active les clics sur les cases
  document.querySelectorAll(".case").forEach((caseElement) => {
    caseElement.style.pointerEvents = "auto";
  });

  // Stocke les noms dans la variable globale pour pouvoir les utiliser partout
  window.playerX = playerXInput;
  window.playerO = playerOInput;

  // Cache le formulaire de saisie
  e.target.style.display = "none";

  // Affiche les boutons reset et revanche
  resetBtn.classList.add("visible");
  resetBtn.classList.remove("hidden");

  revancheBtn.classList.add("visible");
  revancheBtn.classList.remove("hidden");

  // Affiche le tableau des scores
  scoreboard.classList.add("visible");
  scoreboard.classList.remove("hidden");

  // Met à jour le scoreboard avec les noms
  afficherScoreboard();

  // Lance la partie avec choix du joueur initial
  choixJoueurInitial();
});


/**
 * Met à jour le tableau des scores avec les noms joueurs
 * Doit être appelé après validation des noms
 */
function afficherScoreboard() {
  const scoreboard = document.getElementById("scoreboard");

  // Si les noms sont définis, on les affiche et montre le tableau
  if (typeof playerX !== "undefined" && typeof playerO !== "undefined") {
    document.getElementById("playerXName").textContent = playerX;
    document.getElementById("playerOName").textContent = playerO;
    scoreboard.classList.add("visible");
    scoreboard.classList.remove("hidden");
  } else {
    // Sinon on cache le tableau des scores
    scoreboard.classList.add("hidden");
    scoreboard.classList.remove("visible");
  }
}

// On affiche le tableau des scores (utile au lancement)
scoreboard.classList.add("visible");
scoreboard.classList.remove("hidden");

// Met à jour le message indiquant à qui c’est le tour de jouer
function majMessageTour() {
  choixDiv.textContent = `Au tour de ${joueurActif}`;
  choixDiv.style.color = joueur === "X" ? "red" : "blue";
}

// Change de joueur après chaque coup et met à jour le message
function changerJoueur() {
  if (joueur === "X") {
    joueur = "O";
    joueurActif = playerO;
  } else {
    joueur = "X";
    joueurActif = playerX;
  }
  majMessageTour();
  console.log(
    "changerJoueur: joueur =",
    joueur,
    ", joueurActif =",
    joueurActif
  );
}

let cases = document.querySelectorAll(".case");

/**
 * Vérifie si un joueur a gagné ou si la partie est nulle
 * Met à jour le score via fetch, affiche message et bloque le jeu si terminé
 */
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
    // Envoi requête pour mettre à jour le score côté serveur
    fetch(`index.php?winner=${victoire}`)
      .then((res) => res.json())
      .then((data) => {
        // Mise à jour des scores affichés et animation
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

    // Message de victoire affiché, on bloque le jeu
    const gagnant = victoire === "X" ? playerX : playerO;
    document.getElementById("messageVictoire").textContent =
      "Victoire de " + gagnant + " !";
    choixDiv.textContent = "";
    jeuTermine = true;
  } else {
    // Si aucune victoire, on teste si toutes les cases sont remplies (match nul)
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

// Écouteur de clic sur chaque case
cases.forEach((case_morp) => {
  case_morp.addEventListener("click", () => {
    if (jeuTermine) return; // bloqué si partie terminée

    // Ignore clic si case déjà jouée
    if (
      case_morp.querySelector(".cercle") ||
      case_morp.querySelector(".croix")
    ) {
      return;
    }

    // Crée le symbole du joueur courant (croix ou cercle)
    const turn = document.createElement("div");
    if (joueur === "X") {
      turn.classList.add("croix");
    } else {
      turn.classList.add("cercle");
    }

    case_morp.appendChild(turn); // place le symbole dans la case
    checkVictoire(); // vérifie l’état du jeu

    if (!jeuTermine) {
      changerJoueur(); // change de joueur si jeu pas fini
    }
  });
});

// Réinitialisation complète du jeu (reset)
function resetJeu() {
  // Vide toutes les cases
  cases.forEach((case_morp) => {
    case_morp.innerHTML = "";
  });

  jeuTermine = false;

  // Vide le message de victoire
  document.getElementById("messageVictoire").textContent = "";

  // Affiche le formulaire de saisie des noms, cache le reste
  document.querySelector("#choixNoms").style.display = "flex";

  grille.classList.add("hidden");
  grille.classList.remove("visible");

  resetBtn.classList.add("hidden");
  resetBtn.classList.remove("visible");

  document.getElementById("choix").style.display = "none";

  // Vide les inputs noms joueurs
  document.querySelector('input[name="playerX"]').value = "";
  document.querySelector('input[name="playerO"]').value = "";

  // Reset côté serveur et recharge la page
  fetch("index.php?reset=1");
  window.location.href = "index.php?reset=1";
}

// Réinitialisation pour une revanche (sans changer les joueurs)
function revancheJeu() {
  // Vide toutes les cases
  cases.forEach((case_morp) => {
    case_morp.innerHTML = "";
  });

  jeuTermine = false;
  choixJoueurInitial(); // nouveau joueur au hasard

  // Vide le message de victoire
  document.getElementById("messageVictoire").textContent = "";
}

// Bouton revanche appelle la fonction dédiée
document.getElementById("revanche").addEventListener("click", revancheJeu);

// Modal confirmation reset  
resetBtn.addEventListener("click", (e) => {
  e.preventDefault(); // bloque l’action par défaut (rechargement)
  modal.classList.remove("hidden");
  modal.classList.add("visible");
});

// Confirmation "Oui" dans la modal reset
btnYes.addEventListener("click", () => {
  // Lance le reset réel (rechargement avec reset=1)
  window.location.href = "index.php?reset=1";
});

// Confirmation "Non" ferme la modal sans rien faire
btnNo.addEventListener("click", () => {
  modal.classList.remove("visible");
  modal.classList.add("hidden");
});
