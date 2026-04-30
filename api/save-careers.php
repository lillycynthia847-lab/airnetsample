<?php
session_start();
header('Content-Type: application/json');

// Auth check
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

$careersPath = __DIR__ . '/../data/careers.json';
$input = json_decode(file_get_contents('php://input'), true);
$action = $input['action'] ?? '';

// Load existing jobs
$jobs = [];
if (file_exists($careersPath)) {
    $data = file_get_contents($careersPath);
    $jobs = json_decode($data, true) ?: [];
}

if ($action === 'add') {
    $job = [
        'id'          => uniqid(),
        'title'       => trim($input['title'] ?? ''),
        'department'  => trim($input['department'] ?? ''),
        'location'    => trim($input['location'] ?? ''),
        'type'        => trim($input['type'] ?? 'Full Time'),
        'description' => trim($input['description'] ?? ''),
        'deadline'    => trim($input['deadline'] ?? ''),
        'posted'      => date('Y-m-d'),
    ];
    if (empty($job['title'])) {
        echo json_encode(['success' => false, 'message' => 'Job title is required']);
        exit;
    }
    $jobs[] = $job;
    file_put_contents($careersPath, json_encode($jobs, JSON_PRETTY_PRINT));
    echo json_encode(['success' => true, 'message' => 'Job posted successfully']);

} elseif ($action === 'delete') {
    $id = $input['id'] ?? '';
    $jobs = array_values(array_filter($jobs, fn($j) => $j['id'] !== $id));
    file_put_contents($careersPath, json_encode($jobs, JSON_PRETTY_PRINT));
    echo json_encode(['success' => true, 'message' => 'Job deleted']);

} else {
    echo json_encode(['success' => false, 'message' => 'Invalid action']);
}
