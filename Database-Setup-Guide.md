# MySQL Database Setup Guide for GoDaddy cPanel

## Overview
This guide provides step-by-step instructions for setting up the MySQL database for The Well EPC website on GoDaddy hosting using cPanel. This process creates the database structure needed to support dynamic content, user management, and administrative features.

## Prerequisites
- Active GoDaddy hosting account
- cPanel access credentials
- Database schema from PRD (version 1.6 or later)
- Basic familiarity with web hosting interfaces

## Step 1: Access cPanel

1. Log into your GoDaddy account at [godaddy.com](https://godaddy.com)
2. Navigate to your hosting account
3. Click **"Manage"** next to your hosting plan
4. Click **"cPanel Admin"** or **"Access cPanel"**
5. Enter your cPanel credentials when prompted

## Step 2: Create the Database

1. In cPanel, scroll down to the **"Databases"** section
2. Click on **"MySQL Databases"**

### Create New Database
1. Under **"Create New Database"**:
   - **Database Name:** Enter `thewell_epc` (or your preferred name)
   - Click **"Create Database"**
2. You should see a success message: "Database created successfully"

**Note:** GoDaddy may automatically prefix your database name with your cPanel username (e.g., `cpaneluser_thewell_epc`)

## Step 3: Create Database User

1. In the same **"MySQL Databases"** page, scroll to **"MySQL Users"**
2. Under **"Add New User"**:
   - **Username:** Enter `thewell_user` (or your preferred username)
   - **Password:** Create a strong password (12+ characters, mix of letters, numbers, symbols)
   - **Re-type Password:** Confirm the password
3. Click **"Create User"**
4. You should see: "User created successfully"

**Security Best Practices:**
- Use a strong, unique password
- Avoid using "admin" or "root" as username
- Store credentials securely (not in code)

## Step 4: Assign User Privileges

1. Scroll to **"Add User To Database"** section
2. Select your database from the **"Database"** dropdown
3. Select your user from the **"User"** dropdown
4. Click **"Add"**
5. On the **"Manage User Privileges"** page:
   - Check **"ALL PRIVILEGES"** (recommended for full access)
   - Or select specific privileges:
     - ✅ SELECT, INSERT, UPDATE, DELETE
     - ✅ CREATE, ALTER, DROP (for table management)
     - ✅ INDEX, CREATE TEMPORARY TABLES
     - ✅ LOCK TABLES
6. Click **"Make Changes"**
7. You should see: "User added to database successfully"

## Step 5: Access phpMyAdmin

1. Return to cPanel main page
2. In the **"Databases"** section, click **"phpMyAdmin"**
3. phpMyAdmin will open in a new tab/window
4. Select your database from the left sidebar (e.g., `cpaneluser_thewell_epc`)

## Step 6: Create Database Tables

### Option A: Manual Table Creation
Execute these SQL commands in phpMyAdmin's **"SQL"** tab:

```sql
-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'staff', 'member', 'visitor') DEFAULT 'visitor',
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL
);

-- Events table
CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME,
    location VARCHAR(200),
    category ENUM('worship', 'fellowship', 'outreach', 'ministry', 'community', 'other') DEFAULT 'other',
    max_attendees INT,
    current_attendees INT DEFAULT 0,
    contact_person VARCHAR(100),
    contact_email VARCHAR(100),
    contact_phone VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Ministries table
CREATE TABLE ministries (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    leader_name VARCHAR(100),
    leader_email VARCHAR(100),
    leader_phone VARCHAR(20),
    meeting_schedule VARCHAR(200),
    meeting_location VARCHAR(200),
    volunteer_needs TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Sermons table
CREATE TABLE sermons (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    speaker VARCHAR(100) NOT NULL,
    sermon_date DATE NOT NULL,
    scripture_reference VARCHAR(100),
    description TEXT,
    audio_url VARCHAR(500),
    video_url VARCHAR(500),
    transcript TEXT,
    series_name VARCHAR(100),
    tags VARCHAR(500),
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Announcements table
CREATE TABLE announcements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    announcement_type ENUM('general', 'urgent', 'event', 'ministry') DEFAULT 'general',
    start_date DATE NOT NULL,
    end_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Event registrations table
CREATE TABLE event_registrations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT NOT NULL,
    user_id INT,
    guest_name VARCHAR(100),
    guest_email VARCHAR(100),
    guest_phone VARCHAR(20),
    number_of_guests INT DEFAULT 1,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    attendance_confirmed BOOLEAN DEFAULT FALSE,
    notes TEXT,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Ministry volunteers table
CREATE TABLE ministry_volunteers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ministry_id INT NOT NULL,
    user_id INT,
    volunteer_name VARCHAR(100),
    volunteer_email VARCHAR(100),
    volunteer_phone VARCHAR(20),
    role VARCHAR(100),
    joined_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    notes TEXT,
    FOREIGN KEY (ministry_id) REFERENCES ministries(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Prayer requests table
CREATE TABLE prayer_requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    requester_name VARCHAR(100),
    requester_email VARCHAR(100),
    request_type ENUM('personal', 'family', 'community', 'other') DEFAULT 'personal',
    request_text TEXT NOT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    is_urgent BOOLEAN DEFAULT FALSE,
    status ENUM('active', 'answered', 'closed') DEFAULT 'active',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Newsletter subscriptions table
CREATE TABLE newsletter_subscriptions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    subscription_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    unsubscribed_at TIMESTAMP NULL,
    preferences JSON
);

-- Contact messages table
CREATE TABLE contact_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    message_type ENUM('general', 'prayer', 'volunteer', 'event', 'other') DEFAULT 'general',
    is_read BOOLEAN DEFAULT FALSE,
    responded_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Option B: Import SQL File
1. Save the above SQL commands as `database_schema.sql`
2. In phpMyAdmin, click **"Import"** tab
3. Click **"Choose File"** and select your SQL file
4. Click **"Go"** to execute the import

## Step 7: Create Indexes for Performance

Execute these SQL commands to add performance indexes:

```sql
-- Performance indexes
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_sermons_date ON sermons(sermon_date);
CREATE INDEX idx_sermons_speaker ON sermons(speaker);
CREATE INDEX idx_announcements_dates ON announcements(start_date, end_date);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_newsletter_email ON newsletter_subscriptions(email);
```

## Step 8: Test Database Connection

### Create a Test Connection File
1. In cPanel, go to **"File Manager"**
2. Navigate to `public_html` directory
3. Create a new file called `db_test.php`
4. Add this content:

```php
<?php
// Database connection test
$servername = "localhost";
$username = "your_cpanel_username_thewell_user";
$password = "your_password_here";
$dbname = "your_cpanel_username_thewell_epc";

try {
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    echo "Database connection successful!";
} catch(Exception $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
```

5. Visit `yourdomain.com/db_test.php` in a browser
6. You should see "Database connection successful!"
7. Delete the test file after verification

## Step 9: Configure Backup Settings

1. In cPanel, go to **"Backup"** section
2. Click **"Backup Wizard"**
3. Choose **"MySQL Databases"**
4. Select your database and download a backup
5. Set up automated backups if available

## Database Credentials Summary

Keep these credentials secure and never commit them to version control:

```
Database Host: localhost
Database Name: [cpanel_username]_thewell_epc
Database User: [cpanel_username]_thewell_user
Database Password: [your_secure_password]
```

## Troubleshooting

### Common Issues:

**"Access Denied" Error:**
- Verify username and password
- Check user privileges in cPanel
- Ensure database name includes cPanel prefix

**"Table Doesn't Exist" Error:**
- Verify table creation was successful in phpMyAdmin
- Check for typos in table names
- Ensure you're using the correct database

**"Connection Timeout":**
- Check if MySQL service is running
- Verify server load in cPanel
- Contact GoDaddy support if persistent

**phpMyAdmin Not Loading:**
- Clear browser cache
- Try a different browser
- Check cPanel resource usage

## Security Best Practices

1. **Use Strong Passwords:** Minimum 12 characters with mixed case, numbers, and symbols
2. **Limit User Privileges:** Only grant necessary permissions
3. **Regular Backups:** Set up automated daily backups
4. **Monitor Access:** Check cPanel access logs regularly
5. **Update Regularly:** Keep MySQL and PHP versions updated
6. **SSL Encryption:** Use HTTPS for all database connections

## Next Steps

After database setup:
1. Update your website configuration files with database credentials
2. Test all database operations (CRUD operations)
3. Set up user roles and initial admin account
4. Configure backup automation
5. Document credentials securely (password manager recommended)

## Support Resources

- **GoDaddy Help:** Search for "MySQL" in GoDaddy help center
- **cPanel Documentation:** Visit cpanel.net for detailed guides
- **phpMyAdmin Documentation:** phpmyadmin.net for advanced features
- **MySQL Documentation:** dev.mysql.com for SQL reference

---

**Document Version:** 1.0
**Last Updated:** September 6, 2025
**Prepared for:** The Well EPC Website Project
