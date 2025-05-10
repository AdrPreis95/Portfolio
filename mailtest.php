<?php
$to = "adrianpreis86@gmail.com";
$subject = "Testmail von Server";
$message = "Hallo Adrian,\ndas ist ein direkter PHP-Mail-Test.";
$headers = "From: kontakt@adrian-preis.de\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo "✅ Mail wurde gesendet.";
} else {
    echo "❌ Mail konnte nicht gesendet werden.";
}
?>
