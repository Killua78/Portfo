<?php 
include 'db.php'; 

// Vérifie que l’ID est bien dans l’URL
$id = $_GET['id'] ?? null;
if (!$id) die("ID manquant");

// Supprime l’utilisateur
$stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
$stmt->execute([$id]);
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Suppression utilisateur</title>
    <link rel="stylesheet" href="css/style.css" />
</head>
<body>
    <p>Utilisateur supprimé.</p>
    <a href="read.php" class="button">Retour à la liste</a>
</body>
</html>
