<?php 
include 'db.php'; 

// Vérifie que l’ID est bien présent dans l’URL
$id = $_GET['id'] ?? null;
if (!$id) die("ID manquant");

// Récupère les infos actuelles de l’utilisateur
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$id]);
$user = $stmt->fetch();

// Si le formulaire est soumis
$message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$_POST['name'], $_POST['email'], $id]);
    $message = "Utilisateur mis à jour !";
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Modifier un utilisateur</title>
    <link rel="stylesheet" href="css/style.css" />
</head>
<body>
    <h1>Modifier un utilisateur</h1>

    <?php if ($message): ?>
        <p class="message"><?= htmlspecialchars($message) ?></p>
    <?php endif; ?>

    <!-- Formulaire pré-rempli avec les valeurs existantes -->
    <form method="post">
      <input type="text" name="name" value="<?= htmlspecialchars($user['name']) ?>" required>
      <input type="email" name="email" value="<?= htmlspecialchars($user['email']) ?>" required>
      <button type="submit">Modifier</button>
    </form>

    <a href="index.php" class="button">Retour à la liste</a>
</body>
</html>
