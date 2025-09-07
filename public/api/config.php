<?php
// Database configuration for The Well EPC website
// Update these values with your actual GoDaddy database credentials

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'your_cpanel_username_thewell_user'); // Replace with actual username
define('DB_PASS', 'your_database_password'); // Replace with actual password
define('DB_NAME', 'your_cpanel_username_thewell_epc'); // Replace with actual database name

// Create database connection
function getDBConnection() {
    try {
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

        if ($conn->connect_error) {
            throw new Exception("Connection failed: " . $conn->connect_error);
        }

        $conn->set_charset("utf8");
        return $conn;
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed', 'message' => $e->getMessage()]);
        exit();
    }
}

// Helper function to sanitize input
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Helper function to send JSON response
function sendResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit();
}

// Helper function to get POST data
function getPostData() {
    return json_decode(file_get_contents('php://input'), true);
}
?>
