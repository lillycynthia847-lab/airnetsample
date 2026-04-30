<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON payload.']);
    exit;
}

$name = isset($input['name']) ? htmlspecialchars(strip_tags(trim($input['name']))) : '';
$email = isset($input['email']) ? filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL) : '';
$phone = isset($input['phone']) ? htmlspecialchars(strip_tags(trim($input['phone']))) : '';
$service = isset($input['service']) ? htmlspecialchars(strip_tags(trim($input['service']))) : 'General Inquiry';
$message = isset($input['message']) ? htmlspecialchars(strip_tags(trim($input['message']))) : '';

if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'Required fields are missing.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
    exit;
}

$to = 'operations@airnet.co.ke';
$subject = "New Website Inquiry from $name ($service)";

$body = "You have received a new message from your website contact form.\n\n";
$body .= "Name: $name\n";
$body .= "Email: $email\n";
if (!empty($phone)) {
    $body .= "Phone: $phone\n";
}
if (!empty($service)) {
    $body .= "Service Requested: $service\n";
}
$body .= "Message:\n$message\n";

$headers = "From: no-reply@airnet.co.ke\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Message sent successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to send the email. Server misconfiguration.']);
}
?>
