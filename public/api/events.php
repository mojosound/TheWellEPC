<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$conn = getDBConnection();

switch ($method) {
    case 'GET':
        // Get all events or a specific event
        if (isset($_GET['id'])) {
            // Get specific event
            $id = intval($_GET['id']);
            $stmt = $conn->prepare("SELECT * FROM events WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $event = $result->fetch_assoc();
                sendResponse($event);
            } else {
                sendResponse(['error' => 'Event not found'], 404);
            }
        } else {
            // Get all events
            $result = $conn->query("SELECT * FROM events ORDER BY event_date ASC");

            if ($result) {
                $events = [];
                while ($row = $result->fetch_assoc()) {
                    $events[] = $row;
                }
                sendResponse($events);
            } else {
                sendResponse(['error' => 'Failed to fetch events'], 500);
            }
        }
        break;

    case 'POST':
        // Create new event
        $data = getPostData();

        if (!$data) {
            sendResponse(['error' => 'No data provided'], 400);
        }

        // Validate required fields
        $required_fields = ['title', 'event_date', 'start_time'];
        foreach ($required_fields as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                sendResponse(['error' => "Missing required field: $field"], 400);
            }
        }

        // Prepare data
        $title = sanitizeInput($data['title']);
        $description = isset($data['description']) ? sanitizeInput($data['description']) : '';
        $event_date = sanitizeInput($data['event_date']);
        $start_time = sanitizeInput($data['start_time']);
        $end_time = isset($data['end_time']) ? sanitizeInput($data['end_time']) : null;
        $location = isset($data['location']) ? sanitizeInput($data['location']) : '';
        $category = isset($data['category']) ? sanitizeInput($data['category']) : 'other';
        $max_attendees = isset($data['max_attendees']) ? intval($data['max_attendees']) : null;
        $contact_person = isset($data['contact_person']) ? sanitizeInput($data['contact_person']) : '';
        $contact_email = isset($data['contact_email']) ? sanitizeInput($data['contact_email']) : '';
        $contact_phone = isset($data['contact_phone']) ? sanitizeInput($data['contact_phone']) : '';
        $created_by = isset($data['created_by']) ? intval($data['created_by']) : 1; // Default to admin

        // Insert event
        $stmt = $conn->prepare("INSERT INTO events (title, description, event_date, start_time, end_time, location, category, max_attendees, contact_person, contact_email, contact_phone, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssssisssi", $title, $description, $event_date, $start_time, $end_time, $location, $category, $max_attendees, $contact_person, $contact_email, $contact_phone, $created_by);

        if ($stmt->execute()) {
            $event_id = $conn->insert_id;
            sendResponse(['success' => true, 'id' => $event_id, 'message' => 'Event created successfully'], 201);
        } else {
            sendResponse(['error' => 'Failed to create event', 'message' => $stmt->error], 500);
        }
        break;

    case 'PUT':
        // Update event
        if (!isset($_GET['id'])) {
            sendResponse(['error' => 'Event ID required'], 400);
        }

        $id = intval($_GET['id']);
        $data = getPostData();

        if (!$data) {
            sendResponse(['error' => 'No data provided'], 400);
        }

        // Build update query dynamically
        $update_fields = [];
        $types = '';
        $values = [];

        $fields_map = [
            'title' => 's',
            'description' => 's',
            'event_date' => 's',
            'start_time' => 's',
            'end_time' => 's',
            'location' => 's',
            'category' => 's',
            'max_attendees' => 'i',
            'contact_person' => 's',
            'contact_email' => 's',
            'contact_phone' => 's'
        ];

        foreach ($fields_map as $field => $type) {
            if (isset($data[$field])) {
                $update_fields[] = "$field = ?";
                $types .= $type;
                $values[] = $type === 'i' ? intval($data[$field]) : sanitizeInput($data[$field]);
            }
        }

        if (empty($update_fields)) {
            sendResponse(['error' => 'No fields to update'], 400);
        }

        $types .= 'i';
        $values[] = $id;

        $query = "UPDATE events SET " . implode(', ', $update_fields) . " WHERE id = ?";
        $stmt = $conn->prepare($query);

        $stmt->bind_param($types, ...$values);

        if ($stmt->execute()) {
            sendResponse(['success' => true, 'message' => 'Event updated successfully']);
        } else {
            sendResponse(['error' => 'Failed to update event', 'message' => $stmt->error], 500);
        }
        break;

    case 'DELETE':
        // Delete event
        if (!isset($_GET['id'])) {
            sendResponse(['error' => 'Event ID required'], 400);
        }

        $id = intval($_GET['id']);

        $stmt = $conn->prepare("DELETE FROM events WHERE id = ?");
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                sendResponse(['success' => true, 'message' => 'Event deleted successfully']);
            } else {
                sendResponse(['error' => 'Event not found'], 404);
            }
        } else {
            sendResponse(['error' => 'Failed to delete event', 'message' => $stmt->error], 500);
        }
        break;

    default:
        sendResponse(['error' => 'Method not allowed'], 405);
        break;
}

$conn->close();
?>
