<?php
// Airnet Broadband - Content Save API
// Receives JSON content via POST and saves to data/content.json

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Read the JSON body
$input = file_get_contents('php://input');
$data = json_decode($input);

if ($data === null) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON data']);
    exit;
}

// Save to content.json
$filePath = __DIR__ . '/../data/content.json';
$result = file_put_contents($filePath, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

if ($result === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to write file. Check file permissions.']);
    exit;
}

http_response_code(200);
echo json_encode(['success' => true, 'message' => 'Content saved successfully']);
?>
