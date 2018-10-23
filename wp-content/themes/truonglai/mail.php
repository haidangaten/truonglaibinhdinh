<?php 
if ($_POST["email"]<>'') { 
    $ToEmail = 'builyhaidang@gmail.com'; 
    $EmailSubject = 'Site contact form'; 
    $mailheader = "From: ".$_POST["email"]."\r\n"; 
    $mailheader .= "Reply-To: ".$_POST["email"]."\r\n"; 
    $mailheader .= "Content-type: text/html; charset=iso-8859-1\r\n"; 
    $MESSAGE_BODY = "Name: ".$_POST["text"].""; 
    $MESSAGE_BODY .= "Email: ".$_POST["email"].""; 
    $MESSAGE_BODY .= "Comment: ".nl2br($_POST["textarea"]).""; 
    mail($ToEmail, $EmailSubject, $MESSAGE_BODY, $mailheader) or die ("Failure"); 
?>
Your message was sent