<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Get form data and sanitize it
    $yourname = htmlspecialchars(trim($_POST['yourname']));
    $yourmailid = filter_var(trim($_POST['yourmailid']), FILTER_SANITIZE_EMAIL);
    $contactnumber = htmlspecialchars(trim($_POST['contactnumber']));
    $city = htmlspecialchars(trim($_POST['city']));
    $date = htmlspecialchars(trim($_POST['date']));
    $time = htmlspecialchars(trim($_POST['time']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Check if required fields are filled
    if (empty($yourname) || empty($yourmailid) || empty($contactnumber) || empty($message)) {
        echo "Please fill in all required fields.";
        exit;
    }

    // Validate email
    if (!filter_var($yourmailid, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format";
        exit;
    }

    // Set email details
    $to = "owner@example.com";  // Replace with the recipient email address (website owner's email)
    $subject = "New Event Booking Inquiry";

    // Create HTML message for the website owner
    $message_content = "
    <html>
    <head>
        <title>New Event Booking Inquiry</title>
        <style>
            body { font-family: Arial, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f2f2f2; padding: 10px; text-align: center; }
            .header img { width: 150px; }
            .details { padding: 20px; background-color: #fff; }
            .details h3 { color: #333; }
            .details p { line-height: 1.5; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <img src='https://yourdomain.com/logo.png' alt='Your Logo'>
            </div>
            <div class='details'>
                <h3>New Event Booking Inquiry</h3>
                <p><strong>Name:</strong> $yourname</p>
                <p><strong>Email:</strong> $yourmailid</p>
                <p><strong>Contact Number:</strong> $contactnumber</p>
                <p><strong>City:</strong> $city</p>
                <p><strong>Date:</strong> $date</p>
                <p><strong>Time:</strong> $time</p>
                <p><strong>Message:</strong><br>$message</p>
            </div>
        </div>
    </body>
    </html>";

    // Set headers for email to owner
    $headers  = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'From: <' . $yourmailid . '>' . "\r\n";

    // Send email to the website owner
    if (mail($to, $subject, $message_content, $headers)) {
        // Prepare auto-reply for the sender
        $subject_reply = "Thank you for your inquiry!";
        $reply_content = "
        <html>
        <head>
            <title>Thank You for Your Inquiry</title>
            <style>
                body { font-family: Arial, sans-serif; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #f2f2f2; padding: 10px; text-align: center; }
                .header img { width: 150px; }
                .message { padding: 20px; background-color: #fff; }
                .message p { line-height: 1.5; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <img src='https://yourdomain.com/logo.png' alt='Your Logo'>
                </div>
                <div class='message'>
                    <p>Dear $yourname,</p>
                    <p>Thank you for reaching out to us. We have received your inquiry and will get back to you shortly.</p>
                    <p><strong>Your Inquiry Details:</strong></p>
                    <p><strong>Date:</strong> $date</p>
                    <p><strong>Time:</strong> $time</p>
                    <p><strong>Message:</strong><br>$message</p>
                    <p>Best regards,<br>Team</p>
                </div>
            </div>
        </body>
        </html>";

        // Set headers for auto-reply email
        $headers_reply  = "MIME-Version: 1.0" . "\r\n";
        $headers_reply .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers_reply .= 'From: no-reply@yourdomain.com' . "\r\n";

        // Send auto-reply email to the sender
        mail($yourmailid, $subject_reply, $reply_content, $headers_reply);

        // Success message
        echo "Your inquiry has been sent successfully.";
    } else {
        echo "There was an error sending your message.";
    }
}
?>
