<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$conn = getDBConnection();

switch ($method) {
    case 'GET':
        // Get all event registrations or registrations for a specific event
        if (isset($_GET['event_id'])) {
            // Get registrations for specific event
            $event_id = intval($_GET['event_id']);
            $stmt = $conn->prepare("SELECT er.*, e.title as event_title FROM event_registrations er JOIN events e ON er.event_id = e.id WHERE er.event_id = ? ORDER BY er.created_at DESC");
            $stmt->execute([$event_id]);
            $registrations = $stmt->fetchAll();
            sendResponse($registrations);
        } else {
            // Get all registrations
            $stmt = $conn->query("SELECT er.*, e.title as event_title FROM event_registrations er JOIN events e ON er.event_id = e.id ORDER BY er.created_at DESC");
            $registrations = $stmt->fetchAll();
            sendResponse($registrations);
        }
        break;

    case 'POST':
        // Create new event registration
        $data = getPostData();

        if (!$data) {
            sendResponse(['error' => 'No data provided'], 400);
        }

        // Validate required fields
        $required_fields = ['event_id', 'name', 'email'];
        foreach ($required_fields as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                sendResponse(['error' => "Missing required field: $field"], 400);
            }
        }

        $event_id = intval($data['event_id']);

        // Check if event exists and has capacity
        $stmt = $conn->prepare("SELECT max_attendees, (SELECT COUNT(*) FROM event_registrations WHERE event_id = ?) as current_registrations FROM events WHERE id = ?");
        $stmt->execute([$event_id, $event_id]);
        $event_data = $stmt->fetch();

        if (!$event_data) {
            sendResponse(['error' => 'Event not found'], 404);
        }

        if ($event_data['max_attendees'] && $event_data['current_registrations'] >= $event_data['max_attendees']) {
            sendResponse(['error' => 'Event is at capacity'], 409);
        }

        // Check if user is already registered
        $email = sanitizeInput($data['email']);
        $stmt = $conn->prepare("SELECT id FROM event_registrations WHERE event_id = ? AND email = ?");
        $stmt->execute([$event_id, $email]);
        $result = $stmt->fetch();

        if ($result) {
            sendResponse(['error' => 'You are already registered for this event'], 409);
        }

        // Prepare data
        $name = sanitizeInput($data['name']);
        $phone = isset($data['phone']) ? sanitizeInput($data['phone']) : '';
        $guests = isset($data['guests']) ? intval($data['guests']) : 0;
        $special_requests = isset($data['special_requests']) ? sanitizeInput($data['special_requests']) : '';
        $registration_status = 'confirmed';

        // Insert registration
        $stmt = $conn->prepare("INSERT INTO event_registrations (event_id, name, email, phone, guests, special_requests, registration_status) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$event_id, $name, $email, $phone, $guests, $special_requests, $registration_status]);

        $registration_id = $conn->lastInsertId();
        sendResponse(['success' => true, 'id' => $registration_id, 'message' => 'Successfully registered for event'], 201);
        break;

    case 'PUT':
        // Update registration (admin only)
        if (!isset($_GET['id'])) {
            sendResponse(['error' => 'Registration ID required'], 400);
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
            'guests' => 'i',
            'special_requests' => 's',
            'registration_status' => 's',
            'attended' => 'i'
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
        $query = "UPDATE event_registrations SET " . implode(', ', $update_fields) . " WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->execute($values);

        sendResponse(['success' => true, 'message' => 'Registration updated successfully']);
        break;

    case 'DELETE':
        // Cancel registration
        if (!isset($_GET['id'])) {
            sendResponse(['error' => 'Registration ID required'], 400);
        }

        $id = intval($_GET['id']);
        $stmt = $conn->prepare("DELETE FROM event_registrations WHERE id = ?");
        $stmt->execute([$id]);

        sendResponse(['success' => true, 'message' => 'Registration cancelled successfully']);
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
<parameter name="filePath">c:\projects\AI-Generated-Website\website\public\api\event-registrations.php
