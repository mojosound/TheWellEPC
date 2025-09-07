<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$conn = getDBConnection();

switch ($method) {
    case 'GET':
        // Get all newsletter subscriptions (admin only)
        $result = $conn->query("SELECT * FROM newsletter_subscriptions ORDER BY created_at DESC");

        if ($result) {
            $subscriptions = [];
            while ($row = $result->fetch_assoc()) {
                $subscriptions[] = $row;
            }
            sendResponse($subscriptions);
        } else {
            sendResponse(['error' => 'Failed to fetch newsletter subscriptions'], 500);
        }
        break;

    case 'POST':
        // Create new newsletter subscription
        $data = getPostData();

        if (!$data) {
            sendResponse(['error' => 'No data provided'], 400);
        }

        // Validate required fields
        if (!isset($data['email']) || empty($data['email'])) {
            sendResponse(['error' => 'Email address is required'], 400);
        }

        $email = sanitizeInput($data['email']);

        // Validate email format
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            sendResponse(['error' => 'Invalid email format'], 400);
        }

        // Check if email already exists
        $stmt = $conn->prepare("SELECT id FROM newsletter_subscriptions WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            sendResponse(['error' => 'Email already subscribed'], 409);
        }

        // Prepare data
        $name = isset($data['name']) ? sanitizeInput($data['name']) : '';
        $preferences = isset($data['preferences']) ? json_encode($data['preferences']) : '[]';
        $is_active = 1;

        // Insert subscription
        $stmt = $conn->prepare("INSERT INTO newsletter_subscriptions (email, name, preferences, is_active) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("sssi", $email, $name, $preferences, $is_active);

        if ($stmt->execute()) {
            $subscription_id = $conn->insert_id;
            sendResponse(['success' => true, 'id' => $subscription_id, 'message' => 'Successfully subscribed to newsletter'], 201);
        } else {
            sendResponse(['error' => 'Failed to subscribe to newsletter', 'message' => $stmt->error], 500);
        }
        break;

    case 'PUT':
        // Update subscription (admin only or unsubscribe)
        if (!isset($_GET['id'])) {
            sendResponse(['error' => 'Subscription ID required'], 400);
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
            'preferences' => 's',
            'is_active' => 'i'
        ];

        foreach ($fields_map as $field => $type) {
            if (isset($data[$field])) {
                $update_fields[] = "$field = ?";
                $types .= $type;
                if ($field === 'preferences') {
                    $values[] = json_encode($data[$field]);
                } else {
                    $values[] = $data[$field];
                }
            }
        }

        if (empty($update_fields)) {
            sendResponse(['error' => 'No fields to update'], 400);
        }

        $values[] = $id;
        $types .= 'i';

        $query = "UPDATE newsletter_subscriptions SET " . implode(', ', $update_fields) . " WHERE id = ?";
        $stmt = $conn->prepare($query);

        $stmt->bind_param($types, ...$values);

        if ($stmt->execute()) {
            sendResponse(['success' => true, 'message' => 'Subscription updated successfully']);
        } else {
            sendResponse(['error' => 'Failed to update subscription', 'message' => $stmt->error], 500);
        }
        break;

    case 'DELETE':
        // Unsubscribe
        if (!isset($_GET['id'])) {
            sendResponse(['error' => 'Subscription ID required'], 400);
        }

        $id = intval($_GET['id']);
        $stmt = $conn->prepare("UPDATE newsletter_subscriptions SET is_active = 0 WHERE id = ?");
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            sendResponse(['success' => true, 'message' => 'Successfully unsubscribed from newsletter']);
        } else {
            sendResponse(['error' => 'Failed to unsubscribe', 'message' => $stmt->error], 500);
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
<parameter name="filePath">c:\projects\AI-Generated-Website\website\public\api\newsletter.php
