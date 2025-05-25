<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Récupérer les données du formulaire
$name = htmlspecialchars($_POST['name']);
$email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
$message = htmlspecialchars($_POST['message']);

if (!$email) {
  echo "Adresse email invalide.";
  exit;
}

// Créer l’email
$mail = new PHPMailer(true);

try {
  // Config SMTP
  $mail->isSMTP();
  $mail->Host = 'smtp.gmail.com';
  $mail->SMTPAuth = true;
  $mail->Username = 'nacimeboubekeur@gmail.com'; // ton adresse Gmail
  $mail->Password = 'efgt zqjq ttpk uyut'; // mot de passe d'application
  $mail->SMTPSecure = 'tls';
  $mail->Port = 587;

  // Contenu du mail
  $mail->setFrom($email, $name);
  $mail->addAddress('nacimeboubekeur@gmail.com'); // destinataire
  $mail->Subject = 'Message de ton portfolio';
  $mail->Body = "Nom : $name\nEmail : $email\n\nMessage :\n$message";

  $mail->send();
  echo "Message envoyé avec succès !";
} catch (Exception $e) {
  echo "Erreur : " . $mail->ErrorInfo;
}
?>
