<?php
// Simple test script to verify API endpoints are working
require_once 'api/config.php';

echo "Testing API Endpoints...\n\n";

// Test Events API
echo "1. Testing Events API:\n";
try {
    $response = file_get_contents('http://localhost:3000/api/events.php');
    if ($response) {
        $data = json_decode($response, true);
        echo "✓ Events API working - Found " . count($data) . " events\n";
    } else {
        echo "✗ Events API not responding\n";
    }
} catch (Exception $e) {
    echo "✗ Events API error: " . $e->getMessage() . "\n";
}

// Test Ministries API
echo "\n2. Testing Ministries API:\n";
try {
    $response = file_get_contents('http://localhost:3000/api/ministries.php');
    if ($response) {
        $data = json_decode($response, true);
        echo "✓ Ministries API working - Found " . count($data) . " ministries\n";
    } else {
        echo "✗ Ministries API not responding\n";
    }
} catch (Exception $e) {
    echo "✗ Ministries API error: " . $e->getMessage() . "\n";
}

// Test Prayer Requests API (POST)
echo "\n3. Testing Prayer Requests API (POST):\n";
try {
    $postData = json_encode([
        'name' => 'Test User',
        'email' => 'test@example.com',
        'request' => 'Test prayer request'
    ]);

    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => 'Content-Type: application/json',
            'content' => $postData
        ]
    ]);

    $response = file_get_contents('http://localhost:3000/api/prayer-requests.php', false, $context);
    if ($response) {
        $data = json_decode($response, true);
        if (isset($data['success']) && $data['success']) {
            echo "✓ Prayer Requests API working - Successfully submitted test request\n";
        } else {
            echo "✗ Prayer Requests API error: " . ($data['error'] ?? 'Unknown error') . "\n";
        }
    } else {
        echo "✗ Prayer Requests API not responding\n";
    }
} catch (Exception $e) {
    echo "✗ Prayer Requests API error: " . $e->getMessage() . "\n";
}

echo "\nAPI Testing Complete!\n";
?>
