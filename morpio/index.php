<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $_SESSION["playerX"] = $_POST["playerX"];
  $_SESSION["playerO"] = $_POST["playerO"];
}

// var_dump($_SESSION['playerX'], $_SESSION['playerO']);

if (isset($_GET['reset'])) {
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
  <form action="" method="post" id="choixNoms">
    <input type="text" name="playerX" placeholder="Nom du joueur X">
    <input type="text" name="playerO" placeholder="Nom du joueur O">
    <button type="submit">Commencer la partie</button>
  </form>
  <div id="choix"></div>
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
  <button id="reset">Recommencer</button>
  <div id="messageVictoire"></div>
</body>

<?php if (isset($_SESSION['playerX']) && isset($_SESSION['playerO'])): ?>
<script>
  const playerX = <?= json_encode($_SESSION['playerX']) ?>;
  const playerO = <?= json_encode($_SESSION['playerO']) ?>;
</script>
<?php endif; ?>

<script src="script.js"></script>

</html>