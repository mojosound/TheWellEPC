<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$conn = getDBConnection();

switch ($method) {
    case 'GET':
        // Get all contact messages (admin only)
        $result = $conn->query("SELECT * FROM contact_messages ORDER BY created_at DESC");

        if ($result) {
            $messages = [];
            while ($row = $result->fetch_assoc()) {
                $messages[] = $row;
            }
            sendResponse($messages);
        } else {
            sendResponse(['error' => 'Failed to fetch contact messages'], 500);
        }
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
        $stmt->bind_param("ssssssi", $name, $email, $phone, $subject, $message, $message_type, $is_read);

        if ($stmt->execute()) {
            $message_id = $conn->insert_id;
            sendResponse(['success' => true, 'id' => $message_id, 'message' => 'Message sent successfully'], 201);
        } else {
            sendResponse(['error' => 'Failed to send message', 'message' => $stmt->error], 500);
        }
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
        $types = '';
        $values = [];

        $fields_map = [
            'is_read' => 'i',
            'is_replied' => 'i',
            'admin_notes' => 's'
        ];

        foreach ($fields_map as $field => $type) {
            if (isset($data[$field])) {
                $update_fields[] = "$field = ?";
                $types .= $type;
                $values[] = $data[$field];
            }
        }

        if (empty($update_fields)) {
            sendResponse(['error' => 'No fields to update'], 400);
        }

        $values[] = $id;
        $types .= 'i';

        $query = "UPDATE contact_messages SET " . implode(', ', $update_fields) . " WHERE id = ?";
        $stmt = $conn->prepare($query);

        $stmt->bind_param($types, ...$values);

        if ($stmt->execute()) {
            sendResponse(['success' => true, 'message' => 'Message updated successfully']);
        } else {
            sendResponse(['error' => 'Failed to update message', 'message' => $stmt->error], 500);
        }
        break;

    case 'DELETE':
        // Delete contact message (admin only)
        if (!isset($_GET['id'])) {
            sendResponse(['error' => 'Message ID required'], 400);
        }

        $id = intval($_GET['id']);
        $stmt = $conn->prepare("DELETE FROM contact_messages WHERE id = ?");
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            sendResponse(['success' => true, 'message' => 'Message deleted successfully']);
        } else {
            sendResponse(['error' => 'Failed to delete message', 'message' => $stmt->error], 500);
        }
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
