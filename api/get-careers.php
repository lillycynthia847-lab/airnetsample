<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$careersPath = __DIR__ . '/../data/careers.json';

if (!file_exists($careersPath)) {
    echo json_encode([]);
    exit;
}

$data = file_get_contents($careersPath);
$jobs = json_decode($data, true);
echo json_encode($jobs ?: []);
