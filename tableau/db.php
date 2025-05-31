<?php
// Informations de connexion
$host = 'mysql-portfolio-nacime.alwaysdata.net';
$db   = 'portfolio-nacime_users';
$user = '414981';
$pass = 'naruto78hr'; // mot de passe vide par défaut sur XAMPP
$charset = 'utf8mb4';

// Construction de la chaîne de connexion PDO
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

// Options pour lever les erreurs en cas de problème
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
];

// Connexion à la base de données avec gestion d’erreur
try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}
?>
