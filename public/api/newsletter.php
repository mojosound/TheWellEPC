<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$conn = getDBConnection();

switch ($method) {
    case 'GET':
        // Get all newsletter subscriptions (admin only)
        $stmt = $conn->query("SELECT * FROM newsletter_subscriptions ORDER BY created_at DESC");
        $subscriptions = $stmt->fetchAll();
        sendResponse($subscriptions);
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
        $stmt->execute([$email]);
        $result = $stmt->fetch();

        if ($result) {
            sendResponse(['error' => 'Email already subscribed'], 409);
        }

        // Prepare data
        $name = isset($data['name']) ? sanitizeInput($data['name']) : '';
        $preferences = isset($data['preferences']) ? json_encode($data['preferences']) : '[]';
        $is_active = 1;

        // Insert subscription
        $stmt = $conn->prepare("INSERT INTO newsletter_subscriptions (email, name, preferences, is_active) VALUES (?, ?, ?, ?)");
        $stmt->execute([$email, $name, $preferences, $is_active]);

        $subscription_id = $conn->lastInsertId();
        sendResponse(['success' => true, 'id' => $subscription_id, 'message' => 'Successfully subscribed to newsletter'], 201);
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
        $values = [];

        $fields_map = [
            'name' => 's',
            'preferences' => 's',
            'is_active' => 'i'
        ];

        foreach ($fields_map as $field => $type) {
            if (isset($data[$field])) {
                $update_fields[] = "$field = ?";
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
        $query = "UPDATE newsletter_subscriptions SET " . implode(', ', $update_fields) . " WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->execute($values);

        sendResponse(['success' => true, 'message' => 'Subscription updated successfully']);
        break;

    case 'DELETE':
        // Unsubscribe
        if (!isset($_GET['id'])) {
            sendResponse(['error' => 'Subscription ID required'], 400);
        }

        $id = intval($_GET['id']);
        $stmt = $conn->prepare("UPDATE newsletter_subscriptions SET is_active = 0 WHERE id = ?");
        $stmt->execute([$id]);

        sendResponse(['success' => true, 'message' => 'Successfully unsubscribed from newsletter']);
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
