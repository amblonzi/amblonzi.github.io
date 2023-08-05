<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "amblonzi.evans@gmail.com"; 
    $subject = $_POST["subject"];
    $message = $_POST["message"];
    $headers = "From: " . $_POST["email"] . "\r\n";
    
    if (mail($to, $subject, $message, $headers)) {
        $status = "Message sent successfully!";
    } else {
        $status = "Message sending failed.";
    }
}
?>