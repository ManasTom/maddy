<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate the email input
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);

    // Error array to store any validation errors
    $errors = [];

    // Validate Email
    if (empty($email)) {
        $errors[] = "Email is required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    }

    // Check for any validation errors
    if (empty($errors)) {
        // No errors - proceed with email sending
        $to = "manastom670@gmail.com"; // Replace with your actual email
        $subject = "New Connection Request";
        $body = "Someone has shown interest in connecting with you.\nEmail: $email";
        $headers = "From: $email\r\nReply-To: $email\r\n";

        if (mail($to, $subject, $body, $headers)) {
            echo "<script type='text/javascript'>alert('Thank you for your interest. We will be in touch soon.');</script>";
        } else {
            echo "<script type='text/javascript'>alert('Sorry, there was a problem processing your request. Please try again later.');</script>";
        }
    } else {
        // Output validation errors
        foreach ($errors as $error) {
            echo "<p>Error: $error</p>";
        }
    }
}
?>
