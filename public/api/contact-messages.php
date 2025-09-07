<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$conn = getDBConnection();

switch ($method) {
    case 'GET':
        // Get all contact messages (admin only)
        $stmt = $conn->query("SELECT * FROM contact_messages ORDER BY created_at DESC");
        $messages = $stmt->fetchAll();
        sendResponse($messages);
        break;

    case 'POST':
        // Create new contact message
        $data = getPostData();

        if (!$data) {
            sendResponse(['error' => 'No data provided'], 400);
        }

        // Validate required fields
        $required_fields = ['name', 'email', 'subject', 'message'];
        foreach ($required_fields as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                sendResponse(['error' => "Missing required field: $field"], 400);
            }
        }

        // Prepare data
        $name = sanitizeInput($data['name']);
        $email = sanitizeInput($data['email']);
        $phone = isset($data['phone']) ? sanitizeInput($data['phone']) : '';
        $subject = sanitizeInput($data['subject']);
        $message = sanitizeInput($data['message']);
        $message_type = isset($data['message_type']) ? sanitizeInput($data['message_type']) : 'general';
        $is_read = 0;

        // Insert contact message
        $stmt = $conn->prepare("INSERT INTO contact_messages (name, email, phone, subject, message, message_type, is_read) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$name, $email, $phone, $subject, $message, $message_type, $is_read]);

        $message_id = $conn->lastInsertId();
        sendResponse(['success' => true, 'id' => $message_id, 'message' => 'Message sent successfully'], 201);
        break;

    case 'PUT':
        // Update contact message (admin only - mark as read/replied)
        if (!isset($_GET['id'])) {
            sendResponse(['error' => 'Message ID required'], 400);
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
            'is_read' => 'i',
            'is_replied' => 'i',
            'admin_notes' => 's'
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
        $query = "UPDATE contact_messages SET " . implode(', ', $update_fields) . " WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->execute($values);

        sendResponse(['success' => true, 'message' => 'Message updated successfully']);
        break;

    case 'DELETE':
        // Delete contact message (admin only)
        if (!isset($_GET['id'])) {
            sendResponse(['error' => 'Message ID required'], 400);
        }

        $id = intval($_GET['id']);
        $stmt = $conn->prepare("DELETE FROM contact_messages WHERE id = ?");
        $stmt->execute([$id]);

        sendResponse(['success' => true, 'message' => 'Message deleted successfully']);
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
<parameter name="filePath">c:\projects\AI-Generated-Website\website\public\api\contact-messages.php
