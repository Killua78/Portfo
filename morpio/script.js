console.log("test");
// Variables
let joueur = "X";

// pour terminer le jeu
let jeuTermine = false;

// message tour
const choixDiv = document.querySelector('#choix');

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
  if (Math.random() < 0.5) {
    joueur = "X";
  } else {
    joueur = "O";
  }
  const message = document.getElementById("messageVictoire");
  message.textContent = "Le joueur " + joueur + " commence !";
  message.style.color = joueur === "X" ? "red" : "blue";
}

function choixJoueurInitial() {
  joueur = Math.random() < 0.5 ? "X" : "O";
  choixDiv.textContent = `Le joueur ${joueur} commence !`;
  choixDiv.style.color = joueur === "X" ? "red" : "blue";
}

// Pour mettre à jour le message pendant le jeu, après chaque coup :  
function majMessageTour() {
  choixDiv.textContent = `Au tour de ${joueur}`;
  choixDiv.style.color = joueur === "X" ? "red" : "blue";
}

// Appelle au lancement et après reset :  
window.onload = () => {
  choixJoueurInitial();
};

// Fonctions
function changerJoueur() {
  if (joueur === "X") {
    joueur = "O";
  } else {
    joueur = "X";
  }
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
    document.getElementById("messageVictoire").textContent = "Victoire des " + victoire;
    jeuTermine = true;
  } else {
    const toutesOccupees = [...cases].every(
      (caseElement) =>
        caseElement.querySelector(".croix") ||
        caseElement.querySelector(".cercle")
    );
    if (toutesOccupees) {
      document.getElementById("messageVictoire").textContent = "Match nul !";
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
      case_morp.appendChild(turn);
      joueur = "O";
      checkVictoire();
    } else {
      turn.classList.add("cercle");
      case_morp.appendChild(turn);
      joueur = "X";
    }
    majMessageTour();
    checkVictoire();
  });
});

function resetJeu(){
    cases.forEach(case_morp => {
        case_morp.innerHTML = ""; // vider les cases
    });
    joueur = "X";
    jeuTermine = false;
    choixJoueurInitial();
    document.getElementById("messageVictoire").textContent = "";
    document.getElementById("messageVictoire").textContent = "";
}

document.getElementById("reset").addEventListener("click", resetJeu);

