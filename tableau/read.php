<?php include 'db.php'; ?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Liste des utilisateurs</title>
    <link rel="stylesheet" href="css/style.css" />
</head>
<body>
    <h1>Liste des utilisateurs</h1>
    <a href="create.php" class="button">Ajouter un utilisateur</a>
    <div class="table-wrapper">
      <table>
          <thead>
              <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Actions</th>
              </tr>
          </thead>
          <tbody>
          <?php
          $sql = "SELECT * FROM users ORDER BY id DESC";
          $stmt = $pdo->query($sql);
          $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
          foreach ($users as $user) {
              echo "<tr>
                      <td>" . htmlspecialchars($user['id']) . "</td>
                      <td>" . htmlspecialchars($user['name']) . "</td>
                      <td>" . htmlspecialchars($user['email']) . "</td>
                      <td>
                          <a href='update.php?id=" . $user['id'] . "' class='button'>Modifier</a>
                          <a href='delete.php?id=" . $user['id'] . "' class='button delete' onclick='return confirm(\"Supprimer cet utilisateur ?\")'>Supprimer</a>
                      </td>
                  </tr>";
          }
          ?>
          </tbody>
      </table>
    </div>
</body>
</html>
