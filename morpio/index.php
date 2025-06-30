<?php
session_start();

// var_dump($_POST);
// var_dump($_SESSION);

// données du form envoyés dans $_SESSION + échec en php à mettre la 1ère lettre du mot en majuscule
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $_SESSION["playerX"] = ucfirst(strtolower(trim($_POST["playerX"])));
  $_SESSION["playerO"] = ucfirst(strtolower(trim($_POST["playerO"])));

  header("Location: index.php"); // redirection en GET
  exit;
}

// initialisation des scores à 0
if (!isset($_SESSION["scoreX"])) {
  $_SESSION["scoreX"] = 0;
}

if (!isset($_SESSION["scoreO"])) {
  $_SESSION["scoreO"] = 0;
}

// incrémentation des scores à la victoire + communication au fichier JS
if (isset($_GET["winner"])) {
  if ($_GET["winner"] === "X") {
    $_SESSION["scoreX"]++;
  } elseif ($_GET["winner"] === "O") {
    $_SESSION["scoreO"]++;
  }

  header('Content-Type: application/json');
  echo json_encode([
    'scoreX' => $_SESSION['scoreX'],
    'scoreO' => $_SESSION['scoreO']
  ]);
  exit;
}

// var_dump($_SESSION);
// var_dump($_SESSION['playerX'], $_SESSION['playerO']);

if (isset($_GET['reset']) || isset($_GET['resetAll'])) {
  session_destroy();
  header('Location: index.php');
  exit;
}

?>

<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="style.css">
  <title>Morpion</title>
</head>

<body>
  <!-- tableau des scores -->
  <div id="scoreboard">
    <p><strong>Scores :</strong></p>
    <p>
      <span id="playerXName"><?= htmlspecialchars($_SESSION['playerX'] ?? '') ?></span> :
      <span id="scoreX"><?= $_SESSION['scoreX'] ?? 0 ?></span>
      <span class="score-plus" id="plusX" aria-hidden="true">+1</span>
    </p>
    <p>
      <span id="playerOName"><?= htmlspecialchars($_SESSION['playerO'] ?? '') ?></span> :
      <span id="scoreO"><?= $_SESSION['scoreO'] ?? 0 ?></span>
      <span class="score-plus" id="plusO" aria-hidden="true">+1</span>
    </p>
  </div>
  <!-- formulaire joueurs -->
  <form action="index.php" method="post" id="choixNoms">
    <input type="text" name="playerX" placeholder="Nom du joueur X"
      value="<?= htmlspecialchars($_SESSION['playerX'] ?? '') ?>">
    <input type="text" name="playerO" placeholder="Nom du joueur O"
      value="<?= htmlspecialchars($_SESSION['playerO'] ?? '') ?>">
    <button type="submit">Commencer la partie</button>
  </form>
  <!-- div qui va afficher "au tour de X", "X commence" etc. -->
  <div id="choix"></div>
  <!-- grille morpion -->
  <div class="grille">
    <div class="case"></div>
    <div class="case"></div>
    <div class="case"></div>
    <div class="case"></div>
    <div class="case"></div>
    <div class="case"></div>
    <div class="case"></div>
    <div class="case"></div>
    <div class="case"></div>
  </div>
 
  <div class="buttons-container">
    <button id="reset">Recommencer</button>
    <button id="revanche">Revanche</button>
  </div>
  <div id="messageVictoire"></div>

  <!-- demande confirmation recommencer -->
  <div id="confirmResetModal" class="modal hidden">
    <div class="modal-content">
      <p>Êtes-vous sûr de vouloir recommencer la partie ?</p>
      <button id="confirmResetYes">Oui</button>
      <button id="confirmResetNo">Non</button>
    </div>
  </div>

 <!-- communication des pseudos du formulaire au JS -->
  <?php if (isset($_SESSION['playerX']) && isset($_SESSION['playerO'])): ?>
    <script>
      const playerX = <?= json_encode($_SESSION['playerX']) ?>;
      const playerO = <?= json_encode($_SESSION['playerO']) ?>;
    </script>
  <?php endif; ?>

  <script src="script.js"></script>
</body>

</html>