<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$conn = getDBConnection();

switch ($method) {
    case 'GET':
        // Get all ministries (admin only)
        $stmt = $conn->query("SELECT * FROM ministries ORDER BY name ASC");
        $ministries = $stmt->fetchAll();
        sendResponse($ministries);
        break;

    case 'POST':
        // Create new ministry (admin only)
        $data = getPostData();

        if (!$data) {
            sendResponse(['error' => 'No data provided'], 400);
        }

        // Validate required fields
        $required_fields = ['name', 'description'];
        foreach ($required_fields as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                sendResponse(['error' => "Missing required field: $field"], 400);
            }
        }

        // Prepare data
        $name = sanitizeInput($data['name']);
        $description = sanitizeInput($data['description']);
        $leader_name = isset($data['leader_name']) ? sanitizeInput($data['leader_name']) : '';
        $leader_email = isset($data['leader_email']) ? sanitizeInput($data['leader_email']) : '';
        $leader_phone = isset($data['leader_phone']) ? sanitizeInput($data['leader_phone']) : '';
        $meeting_schedule = isset($data['meeting_schedule']) ? sanitizeInput($data['meeting_schedule']) : '';
        $meeting_location = isset($data['meeting_location']) ? sanitizeInput($data['meeting_location']) : '';
        $volunteer_needs = isset($data['volunteer_needs']) ? sanitizeInput($data['volunteer_needs']) : '';
        $is_active = isset($data['is_active']) ? intval($data['is_active']) : 1;

        // Insert ministry
        $stmt = $conn->prepare("INSERT INTO ministries (name, description, leader_name, leader_email, leader_phone, meeting_schedule, meeting_location, volunteer_needs, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$name, $description, $leader_name, $leader_email, $leader_phone, $meeting_schedule, $meeting_location, $volunteer_needs, $is_active]);

        $ministry_id = $conn->lastInsertId();
        sendResponse(['success' => true, 'id' => $ministry_id, 'message' => 'Ministry created successfully'], 201);
        break;

    case 'PUT':
        // Update ministry (admin only)
        if (!isset($_GET['id'])) {
            sendResponse(['error' => 'Ministry ID required'], 400);
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
            'description' => 's',
            'leader_name' => 's',
            'leader_email' => 's',
            'leader_phone' => 's',
            'meeting_schedule' => 's',
            'meeting_location' => 's',
            'volunteer_needs' => 's',
            'is_active' => 'i'
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
        $query = "UPDATE ministries SET " . implode(', ', $update_fields) . " WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->execute($values);

        sendResponse(['success' => true, 'message' => 'Ministry updated successfully']);
        break;

    case 'DELETE':
        // Delete ministry (admin only)
        if (!isset($_GET['id'])) {
            sendResponse(['error' => 'Ministry ID required'], 400);
        }

        $id = intval($_GET['id']);
        $stmt = $conn->prepare("DELETE FROM ministries WHERE id = ?");
        $stmt->execute([$id]);

        sendResponse(['success' => true, 'message' => 'Ministry deleted successfully']);
        break;

    default:
        sendResponse(['error' => 'Method not allowed'], 405);
        break;
}

// Helper function to get POST data
function getPostData() {
    return json_decode(file_get_contents('php://input'), true);
}
?>
