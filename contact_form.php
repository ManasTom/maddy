<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate the input data
    $name = filter_var(trim($_POST["name"]), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = filter_var(trim($_POST["message"]), FILTER_SANITIZE_STRING);

    // Error array to store any validation errors
    $errors = [];

    // Validate Name
    if (empty($name)) {
        $errors[] = "Name is required.";
    }

    // Validate Email
    if (empty($email)) {
        $errors[] = "Email is required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    }

    // Validate Message
    if (empty($message)) {
        $errors[] = "Message is required.";
    }

    // Check for any validation errors
    if (empty($errors)) {
        // No errors - proceed with email sending
        $to = "manastom670@gmail.com"; // Replace with your actual email
        $subject = "Contact Form Submission from $name";
        $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
        $headers = "From: $email\r\nReply-To: $email\r\n";

        if (mail($to, $subject, $body, $headers)) {
            echo "<script type='text/javascript'>alert('Thank you, your message has been sent.');</script>";
        } else {
            echo "<script type='text/javascript'>alert('Sorry, there was a problem sending your message. Please try again later.');</script>";
        }
    } else {
        // Output validation errors
        foreach ($errors as $error) {
            echo "<p>Error: $error</p>";
        }
    }
}
?>
