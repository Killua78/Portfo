<?php include 'db.php'; ?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Ajouter un utilisateur</title>
    <link rel="stylesheet" href="css/style.css" />
</head>
<body>
    <h1>Ajouter un utilisateur</h1>

    <form method="post">
      <input type="text" name="name" placeholder="Nom" required>
      <input type="email" name="email" placeholder="Email" required>
      <button type="submit" class="button add">Ajouter</button>
    </form>

    <a href="index.php" class="button">Retour à la liste</a>

    <?php
    // Si le formulaire a été soumis
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Préparation de la requête SQL
        $sql = "INSERT INTO users (name, email) VALUES (?, ?)";
        $stmt = $pdo->prepare($sql);

        // Exécution avec les données du formulaire
        $stmt->execute([$_POST['name'], $_POST['email']]);

        echo '<p class="message">Utilisateur ajouté !</p>';
    }
    ?>
</body>
</html>
