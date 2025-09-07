<?php
// Database configuration for The Well EPC website
// Development version using SQLite for local development
// Production version will use MySQL on GoDaddy

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Database configuration - Development with SQLite
define('DB_TYPE', 'sqlite'); // Change to 'mysql' for production
define('DB_FILE', __DIR__ . '/../../database/thewell_epc.db'); // SQLite database file

// Production MySQL configuration (commented out for development)
// define('DB_TYPE', 'mysql');
// define('DB_HOST', 'localhost');
// define('DB_USER', 'your_cpanel_username_thewell_user');
// define('DB_PASS', 'your_database_password');
// define('DB_NAME', 'your_cpanel_username_thewell_epc');

// Create database connection
function getDBConnection() {
    if (DB_TYPE === 'sqlite') {
        try {
            // Ensure database directory exists
            $dbDir = dirname(DB_FILE);
            if (!is_dir($dbDir)) {
                mkdir($dbDir, 0755, true);
            }

            $conn = new PDO('sqlite:' . DB_FILE);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

            // Create tables if they don't exist
            createTablesIfNotExist($conn);

            return $conn;
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database connection failed', 'message' => $e->getMessage()]);
            exit();
        }
    } else {
        // MySQL connection for production
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
}

// Create tables if they don't exist (SQLite development)
function createTablesIfNotExist($conn) {
    $tables = [
        "CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT DEFAULT 'visitor',
            first_name TEXT,
            last_name TEXT,
            phone TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            is_active INTEGER DEFAULT 1,
            last_login DATETIME
        )",

        "CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            event_date DATE NOT NULL,
            start_time TIME NOT NULL,
            end_time TIME,
            location TEXT,
            category TEXT DEFAULT 'other',
            max_attendees INTEGER,
            current_attendees INTEGER DEFAULT 0,
            contact_person TEXT,
            contact_email TEXT,
            contact_phone TEXT,
            is_active INTEGER DEFAULT 1,
            created_by INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )",

        "CREATE TABLE IF NOT EXISTS ministries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            leader_name TEXT,
            leader_email TEXT,
            leader_phone TEXT,
            meeting_schedule TEXT,
            meeting_location TEXT,
            volunteer_needs TEXT,
            is_active INTEGER DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )",

        "CREATE TABLE IF NOT EXISTS prayer_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            phone TEXT,
            request TEXT NOT NULL,
            is_public INTEGER DEFAULT 0,
            is_urgent INTEGER DEFAULT 0,
            category TEXT DEFAULT 'general',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )",

        "CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            name TEXT,
            preferences TEXT,
            is_active INTEGER DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )",

        "CREATE TABLE IF NOT EXISTS contact_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            subject TEXT NOT NULL,
            message TEXT NOT NULL,
            message_type TEXT DEFAULT 'general',
            is_read INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )",

        "CREATE TABLE IF NOT EXISTS event_registrations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            event_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            guests INTEGER DEFAULT 0,
            special_requests TEXT,
            registration_status TEXT DEFAULT 'confirmed',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (event_id) REFERENCES events(id)
        )"
    ];

    foreach ($tables as $sql) {
        $conn->exec($sql);
    }

    // Insert sample data if tables are empty
    insertSampleData($conn);
}

// Insert sample data for development
function insertSampleData($conn) {
    // Check if events table is empty
    $stmt = $conn->query("SELECT COUNT(*) as count FROM events");
    $result = $stmt->fetch();
    if ($result['count'] == 0) {
        $sampleEvents = [
            [
                'title' => 'Sunday Worship Service',
                'description' => 'Join us for our weekly worship service featuring inspiring music, meaningful fellowship, and a message from Pastor Adam Hungerford.',
                'event_date' => '2025-09-08',
                'start_time' => '09:30:00',
                'end_time' => '11:00:00',
                'location' => 'The Well EPC Sanctuary',
                'category' => 'worship',
                'max_attendees' => null,
                'contact_person' => 'Pastor Adam Hungerford',
                'contact_email' => 'pastor@thewellepc.org',
                'is_active' => 1
            ],
            [
                'title' => 'Community Potluck Dinner',
                'description' => 'A wonderful opportunity to connect with fellow church members over delicious food and fellowship.',
                'event_date' => '2025-09-14',
                'start_time' => '17:00:00',
                'end_time' => '19:00:00',
                'location' => 'Church Fellowship Hall',
                'category' => 'fellowship',
                'max_attendees' => 80,
                'contact_person' => 'Jennifer Davis',
                'contact_email' => 'events@thewellepc.org',
                'is_active' => 1
            ],
            [
                'title' => 'Youth Group Meeting',
                'description' => 'Fun activities, games, and Bible study for teenagers ages 13-18.',
                'event_date' => '2025-09-18',
                'start_time' => '18:30:00',
                'end_time' => '20:30:00',
                'location' => 'Youth Room',
                'category' => 'ministry',
                'max_attendees' => 25,
                'contact_person' => 'Youth Pastor',
                'contact_email' => 'youth@thewellepc.org',
                'is_active' => 1
            ]
        ];

        $stmt = $conn->prepare("INSERT INTO events (title, description, event_date, start_time, end_time, location, category, max_attendees, contact_person, contact_email, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        foreach ($sampleEvents as $event) {
            $stmt->execute([
                $event['title'], $event['description'], $event['event_date'], $event['start_time'],
                $event['end_time'], $event['location'], $event['category'], $event['max_attendees'],
                $event['contact_person'], $event['contact_email'], $event['is_active']
            ]);
        }
    }

    // Check if ministries table is empty
    $stmt = $conn->query("SELECT COUNT(*) as count FROM ministries");
    $result = $stmt->fetch();
    if ($result['count'] == 0) {
        $sampleMinistries = [
            [
                'name' => 'Children\'s Ministry',
                'description' => 'Nurturing faith in our youngest members through age-appropriate Bible teaching, crafts, and fun activities.',
                'leader_name' => 'Sarah Johnson',
                'leader_email' => 'children@thewellepc.org',
                'meeting_schedule' => 'Sundays 9:30 AM - 11:00 AM',
                'meeting_location' => 'Children\'s Wing',
                'is_active' => 1
            ],
            [
                'name' => 'Youth Ministry',
                'description' => 'Building faith and friendships for teenagers through Bible study, service projects, and social activities.',
                'leader_name' => 'Mike Thompson',
                'leader_email' => 'youth@thewellepc.org',
                'meeting_schedule' => 'Wednesdays 7:00 PM - 9:00 PM',
                'meeting_location' => 'Youth Center',
                'is_active' => 1
            ],
            [
                'name' => 'Adult Bible Study',
                'description' => 'Deepening our understanding of Scripture through weekly Bible study and discussion.',
                'leader_name' => 'Dr. Robert Williams',
                'leader_email' => 'bible.study@thewellepc.org',
                'meeting_schedule' => 'Thursdays 7:00 PM - 8:30 PM',
                'meeting_location' => 'Library',
                'is_active' => 1
            ]
        ];

        $stmt = $conn->prepare("INSERT INTO ministries (name, description, leader_name, leader_email, meeting_schedule, meeting_location, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)");
        foreach ($sampleMinistries as $ministry) {
            $stmt->execute([
                $ministry['name'], $ministry['description'], $ministry['leader_name'],
                $ministry['leader_email'], $ministry['meeting_schedule'], $ministry['meeting_location'],
                $ministry['is_active']
            ]);
        }
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
