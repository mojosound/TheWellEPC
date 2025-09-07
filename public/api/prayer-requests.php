<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$conn = getDBConnection();

switch ($method) {
    case 'GET':
        // Get all prayer requests (admin only)
        $stmt = $conn->query("SELECT * FROM prayer_requests ORDER BY created_at DESC");
        $prayers = $stmt->fetchAll();
        sendResponse($prayers);
        break;

    case 'POST':
        // Create new prayer request
        $data = getPostData();

        if (!$data) {
            sendResponse(['error' => 'No data provided'], 400);
        }

        // Validate required fields
        $required_fields = ['name', 'email', 'request'];
        foreach ($required_fields as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                sendResponse(['error' => "Missing required field: $field"], 400);
            }
        }

        // Prepare data
        $name = sanitizeInput($data['name']);
        $email = sanitizeInput($data['email']);
        $phone = isset($data['phone']) ? sanitizeInput($data['phone']) : '';
        $request = sanitizeInput($data['request']);
        $is_public = isset($data['is_public']) ? intval($data['is_public']) : 0;
        $is_urgent = isset($data['is_urgent']) ? intval($data['is_urgent']) : 0;
        $category = isset($data['category']) ? sanitizeInput($data['category']) : 'general';

        // Insert prayer request
        $stmt = $conn->prepare("INSERT INTO prayer_requests (name, email, phone, request, is_public, is_urgent, category) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$name, $email, $phone, $request, $is_public, $is_urgent, $category]);

        $prayer_id = $conn->lastInsertId();
        sendResponse(['success' => true, 'id' => $prayer_id, 'message' => 'Prayer request submitted successfully'], 201);
        break;

    case 'PUT':
        // Update prayer request (admin only)
        if (!isset($_GET['id'])) {
            sendResponse(['error' => 'Prayer request ID required'], 400);
        }

        $id = intval($_GET['id']);
        $data = getPostData();

        if (!$data) {
            sendResponse(['error' => 'No data provided'], 400);
        }

        // Build update query
        $update_fields = [];
        $values = [];

        $fields_map = [
            'name' => 's',
            'email' => 's',
            'phone' => 's',
            'request' => 's',
            'is_public' => 'i',
            'is_urgent' => 'i',
            'category' => 's',
            'is_answered' => 'i'
        ];

        foreach ($fields_map as $field => $type) {
            if (isset($data[$field])) {
                $update_fields[] = "$field = ?";
                $values[] = $data[$field];
            }
        }

        if (empty($update_fields)) {
            sendResponse(['error' => 'No fields to update'], 400);
        }

        $values[] = $id;
        $query = "UPDATE prayer_requests SET " . implode(', ', $update_fields) . " WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->execute($values);

        sendResponse(['success' => true, 'message' => 'Prayer request updated successfully']);
        break;

    case 'DELETE':
        // Delete prayer request (admin only)
        if (!isset($_GET['id'])) {
            sendResponse(['error' => 'Prayer request ID required'], 400);
        }

        $id = intval($_GET['id']);
        $stmt = $conn->prepare("DELETE FROM prayer_requests WHERE id = ?");
        $stmt->execute([$id]);

        sendResponse(['success' => true, 'message' => 'Prayer request deleted successfully']);
        break;

    default:
        sendResponse(['error' => 'Method not allowed'], 405);
        break;
}

// Helper function to get POST data
function getPostData() {
    return json_decode(file_get_contents('php://input'), true);
}
?></content>
<parameter name="filePath">c:\projects\AI-Generated-Website\website\public\api\prayer-requests.php
