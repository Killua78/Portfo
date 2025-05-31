<?php
// Inclut le fichier db.php pour se connecter à la base de données.
// __DIR__ est le chemin du dossier actuel, ça évite les erreurs de chemin.
include __DIR__ . '/db.php';

// Exécute une requête SQL qui sélectionne tous les utilisateurs
// triés par ID décroissant (du plus récent au plus ancien).
// fetchAll(PDO::FETCH_ASSOC) récupère tous les résultats sous forme de tableau associatif.
$users = $pdo->query("SELECT * FROM users ORDER BY id DESC")->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Liste des utilisateurs</title>
    <!-- Lien vers le fichier CSS externe pour la mise en forme -->
    <link rel="stylesheet" href="css/style.css" />
</head>
<body>
    <h1>Liste des utilisateurs</h1>
    <!-- Lien vers la page create.php pour ajouter un nouvel utilisateur -->
    <a href="create.php" class="button">Ajouter un utilisateur</a>
    <div class="table-wrapper">
        <!-- Tableau HTML pour afficher la liste des utilisateurs -->
        <table>
            <thead>
                <tr>
                    <!-- En-têtes des colonnes du tableau -->
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php 
                // Boucle foreach qui parcourt chaque utilisateur dans le tableau $users
                foreach($users as $user): 
                ?>
                    <tr>
                        <!-- Affiche l'ID de l'utilisateur en sécurisant l'affichage -->
                        <td><?= htmlspecialchars($user['id']) ?></td>
                        <!-- Affiche le nom de l'utilisateur en sécurisant l'affichage -->
                        <td><?= htmlspecialchars($user['name']) ?></td>
                        <!-- Affiche l'email de l'utilisateur en sécurisant l'affichage -->
                        <td><?= htmlspecialchars($user['email']) ?></td>
                        <td>
                            <!-- Lien vers la page update.php avec l'ID de l'utilisateur pour modifier -->
                            <a href="update.php?id=<?= $user['id'] ?>" class="button">Modifier</a>
    
                            <!-- Lien vers delete.php avec l'ID pour supprimer l'utilisateur.
                                 Le onclick demande une confirmation avant suppression -->
                            <a href="delete.php?id=<?= $user['id'] ?>" class="button delete" onclick="return confirm('Supprimer cet utilisateur ?')">Supprimer</a>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</body>
</html>
