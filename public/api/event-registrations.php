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
            $stmt->bind_param("i", $event_id);
            $stmt->execute();
            $result = $stmt->get_result();

            $registrations = [];
            while ($row = $result->fetch_assoc()) {
                $registrations[] = $row;
            }
            sendResponse($registrations);
        } else {
            // Get all registrations
            $result = $conn->query("SELECT er.*, e.title as event_title FROM event_registrations er JOIN events e ON er.event_id = e.id ORDER BY er.created_at DESC");

            if ($result) {
                $registrations = [];
                while ($row = $result->fetch_assoc()) {
                    $registrations[] = $row;
                }
                sendResponse($registrations);
            } else {
                sendResponse(['error' => 'Failed to fetch event registrations'], 500);
            }
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
        $stmt->bind_param("ii", $event_id, $event_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 0) {
            sendResponse(['error' => 'Event not found'], 404);
        }

        $event_data = $result->fetch_assoc();
        if ($event_data['max_attendees'] && $event_data['current_registrations'] >= $event_data['max_attendees']) {
            sendResponse(['error' => 'Event is at capacity'], 409);
        }

        // Check if user is already registered
        $email = sanitizeInput($data['email']);
        $stmt = $conn->prepare("SELECT id FROM event_registrations WHERE event_id = ? AND email = ?");
        $stmt->bind_param("is", $event_id, $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
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
        $stmt->bind_param("isssiss", $event_id, $name, $email, $phone, $guests, $special_requests, $registration_status);

        if ($stmt->execute()) {
            $registration_id = $conn->insert_id;
            sendResponse(['success' => true, 'id' => $registration_id, 'message' => 'Successfully registered for event'], 201);
        } else {
            sendResponse(['error' => 'Failed to register for event', 'message' => $stmt->error], 500);
        }
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
        $types = '';
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
                $types .= $type;
                $values[] = $data[$field];
            }
        }

        if (empty($update_fields)) {
            sendResponse(['error' => 'No fields to update'], 400);
        }

        $values[] = $id;
        $types .= 'i';

        $query = "UPDATE event_registrations SET " . implode(', ', $update_fields) . " WHERE id = ?";
        $stmt = $conn->prepare($query);

        $stmt->bind_param($types, ...$values);

        if ($stmt->execute()) {
            sendResponse(['success' => true, 'message' => 'Registration updated successfully']);
        } else {
            sendResponse(['error' => 'Failed to update registration', 'message' => $stmt->error], 500);
        }
        break;

    case 'DELETE':
        // Cancel registration
        if (!isset($_GET['id'])) {
            sendResponse(['error' => 'Registration ID required'], 400);
        }

        $id = intval($_GET['id']);
        $stmt = $conn->prepare("DELETE FROM event_registrations WHERE id = ?");
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            sendResponse(['success' => true, 'message' => 'Registration cancelled successfully']);
        } else {
            sendResponse(['error' => 'Failed to cancel registration', 'message' => $stmt->error], 500);
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
<parameter name="filePath">c:\projects\AI-Generated-Website\website\public\api\event-registrations.php
