<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'mailer/Exception.php';
require 'mailer/PHPMailer.php';
require 'mailer/SMTP.php';

$mail = new PHPMailer(true);

try {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $message = $_POST['message'] ?? '';

    
    $mail->isSMTP();
    $mail->Host = 'w0203cb1.kasserver.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'kontakt@adrian-preis.de';
    $mail->Password = 'Developerakademie26111322'; 
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->setFrom('kontakt@adrian-preis.de', 'Portfolio Kontakt');
    $mail->addAddress('adrianpreis86@gmail.com');
    $mail->addReplyTo($email);

    $mail->isHTML(false);
    $mail->Subject = 'Neue Nachricht von deiner Portfolio-Website';
    $mail->Body = "Name: $name\nE-Mail: $email\n\nNachricht:\n$message";

    $mail->send();
    http_response_code(200);
    echo "Nachricht erfolgreich gesendet.";
} catch (Exception $e) {
    http_response_code(500);
    echo "Fehler beim Senden: {$mail->ErrorInfo}";
}
?>
