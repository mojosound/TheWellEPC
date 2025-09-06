# Product Requirements Document (PRD) for The Well EPC Website

## Document Information
- **Project Name:** The Well EPC Website
- **Date:** September 6, 2025
- **Version:** 1.6
- **Prepared by:** GitHub Copilot

## Executive Summary
This PRD outlines the requirements for developing a modern, engaging website for The Well EPC (Evangelical Presbyterian Church). The website aims to serve as a central hub for congregation engagement, providing up-to-date information and fostering community involvement through services and ministries.

## Project Overview
The Well EPC is located at 8 Canal St, Big Flats, NY, with services held at 9:30 AM on Sundays followed by small groups. The church is led by Pastor Adam Hungerford. The website will be designed to engage both the church congregation and the wider community, promoting spiritual growth and community service.

## Goals and Objectives
### Primary Goals
1. **Congregation Engagement:** Provide current information to keep members informed and connected
2. **Community Outreach:** Highlight services and ministries to attract and involve the wider community
3. **Modern User Experience:** Create an intuitive, responsive website that reflects the church's contemporary approach

### Specific Objectives
- Increase online visibility and accessibility of church information
- Facilitate easy discovery of upcoming events and services
- Promote volunteer opportunities and ministry involvement
- Provide resources for spiritual growth and community support
- Establish a professional online presence that aligns with the church's values

## Target Audience
1. **Church Members:** Regular attendees seeking service times, announcements, and community updates
2. **Prospective Members:** Individuals exploring the church and its ministries
3. **Community Members:** Local residents interested in church-sponsored events and services
4. **Volunteers:** People looking to get involved in ministries and community outreach
5. **Families:** Parents seeking information about children's programs and family-oriented activities

## Functional Requirements

### Core Features
1. **Homepage**
   - Hero section with welcome message and key announcements
   - Quick links to services, ministries, and contact information
   - Featured upcoming events
   - Call-to-action buttons for engagement

2. **About Us**
   - Church history and mission statement
   - Pastor Adam Hungerford's bio and contact information
   - Staff and leadership team profiles
   - Church values and beliefs

3. **Services & Worship**
   - Service schedule (9:30 AM Sundays)
   - Information about small groups following services
   - Online giving options
   - Sermon archives or links to recent messages

4. **Ministries**
   - List of active ministries (e.g., youth, children's, outreach, missions)
   - Descriptions of each ministry's purpose and activities
   - Volunteer sign-up forms
   - Contact information for ministry leaders

5. **Events Calendar**
   - Interactive calendar showing upcoming events
   - Event details including date, time, location, and description
   - RSVP functionality for select events
   - Filter options by category (worship, fellowship, outreach, etc.)

6. **Community & Outreach**
   - Information about community service projects
   - Partnership opportunities with local organizations
   - Volunteer coordination tools
   - Impact stories and testimonials

7. **Resources**
   - Bible study materials
   - Prayer requests (optional submission form)
   - Links to online devotionals or study guides
   - Family resources and parenting guides

8. **Contact & Location**
   - Church address: 8 Canal St, Big Flats, NY
   - Contact form for general inquiries
   - Staff directory with email and phone numbers
   - Embedded map showing location and directions

### Additional Features
- **Search Functionality:** Site-wide search for easy navigation
- **Newsletter Signup:** Email subscription for updates and announcements
- **Social Media Integration:** Links to church social media accounts
- **Mobile Responsiveness:** Optimized for all device sizes
- **Accessibility:** WCAG 2.1 AA compliance for inclusive design

## Non-Functional Requirements

### Performance
- Page load times under 3 seconds
- 99.9% uptime
- Optimized for mobile devices

### Security
- SSL encryption for all pages
- Secure contact forms to prevent spam
- Regular security updates and monitoring

### Scalability
- Ability to handle increased traffic during peak times (e.g., holidays)
- Easy content management for non-technical staff

### Usability
- Intuitive navigation with clear information hierarchy
- Consistent design language throughout the site
- Easy-to-read fonts and color schemes

## Technical Requirements

### Platform
- **Frontend:** React.js or Next.js for modern, interactive user experience
- **Backend:** Apache webserver (no ability to install Node.js)
- **Database:** MySQL for content management
- **Hosting:** GoDaddy with access to CPanel, FTP, and MySQL for scalability and management

### Content Management
- User-friendly CMS for staff to update content without technical knowledge
- Version control for content changes
- Image optimization and management

### Integrations
- Email service provider (e.g., Mailchimp) for newsletters
- Calendar integration (Google Calendar or similar)
- Social media APIs for automatic updates
- Payment gateway for online giving

## Database Design and Schema

### Database Overview
The website will use MySQL as the primary database for storing dynamic content, user interactions, and administrative data. The database will be hosted on GoDaddy's MySQL servers and accessed through phpMyAdmin for management.

### Database Schema

#### Core Tables

**1. users**
```sql
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
```

**2. events**
```sql
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);
```

**3. ministries**
```sql
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
```

**4. sermons**
```sql
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
```

**5. announcements**
```sql
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);
```

#### Relationship and Junction Tables

**6. event_registrations**
```sql
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
```

**7. ministry_volunteers**
```sql
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
```

**8. prayer_requests**
```sql
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
```

**9. newsletter_subscriptions**
```sql
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
```

**10. contact_messages**
```sql
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

### Database Relationships
- **users** ↔ **events**: Users can create and register for events
- **users** ↔ **announcements**: Users can create announcements
- **events** ↔ **event_registrations**: Events have multiple registrations
- **ministries** ↔ **ministry_volunteers**: Ministries have multiple volunteers
- **users** ↔ **ministry_volunteers**: Users can volunteer for ministries

### Indexes and Performance
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

### Data Validation Rules
- Email addresses must be valid format
- Event dates cannot be in the past (for new events)
- Phone numbers should follow standard formats
- Required fields cannot be null
- Foreign key constraints maintain data integrity

### Backup and Maintenance
- Daily automated backups through GoDaddy
- Weekly manual verification of backup integrity
- Monthly cleanup of old log entries and inactive records
- Regular optimization of database tables

### Security Considerations
- All database connections use SSL encryption
- Prepared statements to prevent SQL injection
- Role-based access control for data operations
- Regular security updates for MySQL server
- Encrypted storage for sensitive user data

## User Stories

### As a church member, I want to:
- Quickly find service times and locations
- Access recent sermon notes or recordings
- Sign up for small groups and ministries
- Stay informed about church announcements

### As a prospective visitor, I want to:
- Learn about the church's mission and values
- Find information about Pastor Adam Hungerford
- See what ministries and programs are available
- Get directions to the church location

### As a community member, I want to:
- Discover volunteer opportunities
- Learn about community outreach programs
- Find information about family-friendly events
- Contact the church for support or inquiries

### As a ministry leader, I want to:
- Update ministry information easily
- Manage volunteer sign-ups
- Share event details and updates
- Communicate with team members

## Design Considerations

### Visual Design
- Clean, modern aesthetic reflecting spiritual peace and community
- Color palette: Warm, inviting colors (e.g., blues, greens, neutrals)
- Typography: Readable fonts with good contrast
- Imagery: High-quality photos of church activities, people, and facilities

### User Experience
- Intuitive navigation with clear menu structure
- Progressive disclosure of information
- Consistent call-to-action placements
- Feedback mechanisms (e.g., form submissions, event RSVPs)

### Branding
- Use logo-color-final-001-transparent.png as the primary church logo
- Incorporate church logo and branding elements
- Consistent messaging aligned with church values
- Professional yet approachable tone

### Wireframes

#### Home Page Wireframe

Below is a text-based wireframe representation of the home page layout. This shows the basic structure and content placement for desktop view. The layout should be responsive and adapt to mobile devices.

```
+-------------------------------------------------------------+
|                        HEADER                               |
+-------------------------------------------------------------+
| [LOGO]                    [NAV: Home About Services etc.]   |
+-------------------------------------------------------------+
|                                                             |
|                 HERO SECTION                                |
|                                                             |
|    [Large Welcome Image or Background]                      |
|                                                             |
|    WELCOME TO THE WELL EPC                                  |
|    Join us for worship and community                        |
|                                                             |
|    [Call to Action Button: Plan Your Visit]                 |
|                                                             |
+-------------------------------------------------------------+
|                                                             |
|                 SERVICE TIMES                               |
|                                                             |
|    Sunday Worship: 9:30 AM                                  |
|    Followed by Small Groups                                 |
|                                                             |
|    [Button: View Full Schedule]                             |
|                                                             |
+-------------------------------------------------------------+
|                                                             |
|                 FEATURED ANNOUNCEMENTS                      |
|                                                             |
|    +-------------------+  +-------------------+             |
|    | Upcoming Event 1  |  | Upcoming Event 2  |             |
|    | Date & Time       |  | Date & Time       |             |
|    | Brief Description |  | Brief Description |             |
|    | [Learn More]      |  | [Learn More]      |             |
|    +-------------------+  +-------------------+             |
|                                                             |
+-------------------------------------------------------------+
|                                                             |
|                 QUICK LINKS                                 |
|                                                             |
|    [About Us]  [Ministries]  [Community]  [Contact]         |
|                                                             |
+-------------------------------------------------------------+
|                                                             |
|                 LATEST SERMON/RESOURCE                      |
|                                                             |
|    [Image/Icon]                                             |
|    Latest Sermon Title                                      |
|    Pastor Adam Hungerford                                   |
|    [Listen Now]  [View All Sermons]                         |
|                                                             |
+-------------------------------------------------------------+
|                        FOOTER                               |
+-------------------------------------------------------------+
| Contact Info: 8 Canal St, Big Flats, NY                     |
| Pastor: Adam Hungerford                                     |
| Social Media Links | Newsletter Signup | Copyright 2025    |
+-------------------------------------------------------------+
```

**Wireframe Legend:**
- `[LOGO]`: The Well EPC logo (logo-color-final-001-transparent.png)
- `[NAV]`: Main navigation menu
- `[Button]`: Call-to-action buttons
- `+---+`: Content blocks or cards
- Text in ALL CAPS: Section headers
- Regular text: Content descriptions

**Responsive Considerations:**
- On mobile devices, the navigation should collapse into a hamburger menu
- Hero section should stack vertically
- Featured announcements should stack in a single column
- Quick links should remain accessible but may wrap to multiple rows

**Key Elements to Include:**
1. **Header**: Logo on left, navigation on right
2. **Hero Section**: Large, welcoming area with main message and CTA
3. **Service Times**: Prominent display of worship schedule
4. **Featured Content**: 2-3 upcoming events or announcements
5. **Quick Links**: Easy access to main site sections
6. **Latest Content**: Recent sermon or resource to engage visitors
7. **Footer**: Contact information and additional navigation

This wireframe provides a clean, modern layout that prioritizes important information while maintaining an inviting, spiritual aesthetic.

### Phase 1: Planning and Design (Weeks 1-4)
- Finalize requirements and user stories
- Create wireframes and mockups
- Select technology stack
- Set up development environment

### Phase 2: Development (Weeks 5-12)
- Build core pages and functionality
- Implement responsive design
- Integrate CMS and third-party services
- Conduct internal testing

### Phase 3: Testing and Launch (Weeks 13-16)
- User acceptance testing
- Performance optimization
- Security audit
- Go-live and post-launch monitoring

### Phase 4: Maintenance and Enhancement (Ongoing)
- Regular content updates
- Feature enhancements based on user feedback
- Security updates and maintenance

## Stakeholders
- **Pastor Adam Hungerford:** Project sponsor and key decision-maker
- **Church Leadership Team:** Provide input on content and priorities
- **Ministry Leaders:** Contribute ministry-specific information
- **Technical Team:** Handle development and maintenance
- **Congregation Representatives:** Provide user feedback and testing

## Success Metrics
- Increased website traffic and engagement
- Higher conversion rates for event sign-ups and volunteer applications
- Positive user feedback on ease of use and information accessibility
- Improved online presence and community awareness

## Risks and Mitigations
- **Content Management:** Ensure staff training for CMS usage
- **Technical Complexity:** Start with MVP and iterate based on feedback
- **Budget Constraints:** Prioritize core features and phase implementation
- **Timeline Delays:** Regular check-ins and agile development approach

## Conclusion
This PRD provides a comprehensive roadmap for developing The Well EPC's modern website. By focusing on congregation engagement and community outreach, the site will serve as a vital tool for spiritual growth and community connection. Regular review and updates will ensure the website continues to meet the evolving needs of the church and its community.

## Development and Deployment Plan

This section provides a detailed, step-by-step guide for developing and deploying The Well EPC website. It's written for junior developers, explaining concepts simply and breaking down complex tasks into manageable steps. We'll use React.js for the frontend (built as static files since we can't install Node.js on the server), MySQL for the database, and deploy to GoDaddy hosting.

### Prerequisites (What You Need Before Starting)
Before you begin, make sure you have these tools installed on your local computer:

1. **Node.js and npm** (for local development only - we'll build static files)
   - Download from nodejs.org
   - This lets us write and test our React code locally

2. **Git** (for version control)
   - Download from git-scm.com
   - This helps track changes to your code

3. **A code editor** (like Visual Studio Code)
   - Download from code.visualstudio.com
   - This is where you'll write your code

4. **FTP client** (like FileZilla)
   - Download from filezilla-project.org
   - This will help upload files to GoDaddy

5. **MySQL client** (like phpMyAdmin or MySQL Workbench)
   - phpMyAdmin comes with GoDaddy CPanel
   - This helps manage your database

### Phase 1: Setting Up Your Development Environment

#### Step 1: Create a New Project Folder
1. Open your computer's file explorer
2. Create a new folder called "the-well-epc-website" on your desktop
3. Open this folder in Visual Studio Code

#### Step 2: Set Up React Project
1. Open the terminal in Visual Studio Code (View > Terminal)
2. Type this command and press Enter:
   ```
   npx create-react-app .
   ```
   - This creates a new React project in your current folder
   - The dot (.) means "use this folder"

3. Wait for it to finish installing (this might take a few minutes)

#### Step 3: Install Additional Tools
1. In the terminal, type:
   ```
   npm install react-router-dom axios
   ```
   - react-router-dom: for navigating between pages
   - axios: for making requests to your database (if needed)

#### Step 4: Start the Development Server
1. Type in terminal:
   ```
   npm start
   ```
2. Open your web browser and go to http://localhost:3000
3. You should see a "Welcome to React" page

### Phase 2: Building the Website Structure

#### Step 5: Plan Your Pages
Based on the PRD, create these main pages:
- Home (/)
- About (/about)
- Services (/services)
- Ministries (/ministries)
- Events (/events)
- Community (/community)
- Resources (/resources)
- Contact (/contact)

#### Step 6: Create Basic Page Components
1. In your project folder, create a "components" folder
2. Create a "pages" folder
3. For each page, create a simple component file

Example for Home page:
```javascript
// src/pages/Home.js
import React from 'react';

function Home() {
  return (
    <div>
      <h1>Welcome to The Well EPC</h1>
      <p>Join us for services at 9:30 AM every Sunday!</p>
    </div>
  );
}

export default Home;
```

#### Step 7: Set Up Routing
1. Open src/App.js
2. Replace the content with:
```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
// Import other pages here

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          {/* Add routes for other pages */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
```

### Phase 3: Adding Content and Styling

#### Step 8: Add the Logo
1. Copy logo-color-final-001-transparent.png to src/images/
2. In your components, add:
```javascript
<img src="/images/logo-color-final-001-transparent.png" alt="The Well EPC Logo" />
```

#### Step 9: Style Your Website
1. Open src/App.css
2. Add basic styles:
```css
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.App {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
```

#### Step 10: Add Real Content
1. Replace placeholder text with actual church information
2. Add service times: "9:30 AM Sundays followed by small groups"
3. Add pastor info: "Pastor Adam Hungerford"
4. Add address: "8 Canal St, Big Flats, NY"

### Phase 4: Database Setup (If Needed)

#### Step 11: Set Up MySQL Database on GoDaddy
1. Log into your GoDaddy account
2. Go to CPanel
3. Find "MySQL Databases"
4. Create a new database called "thewell_epc"
5. Create a user and give them access to this database
6. Use phpMyAdmin to create tables (if needed for dynamic content)

#### Step 12: Connect to Database (Optional)
If you need dynamic content, you might need a simple PHP backend:
1. Create a "api" folder in your project
2. Add PHP files for database connections
3. Use fetch() in React to get data from PHP files

### Phase 5: Testing and Building

#### Step 13: Test Locally
1. Make sure all pages load correctly
2. Test on different screen sizes (resize your browser)
3. Check that links work properly

#### Step 14: Build for Production
1. In terminal, type:
   ```
   npm run build
   ```
2. This creates a "build" folder with optimized files
3. These are static files that can run on any web server

### Phase 6: Deployment to GoDaddy

#### Step 15: Upload Files via FTP
1. Open FileZilla
2. Connect to your GoDaddy server using FTP credentials from CPanel
3. Upload the contents of the "build" folder to the "public_html" directory
4. If you have PHP files, upload them too

#### Step 16: Set Up Domain
1. In GoDaddy, point your domain to the public_html folder
2. Make sure index.html is in the root

#### Step 17: Test Live Website
1. Visit your domain in a web browser
2. Check all pages and functionality
3. Test contact forms and any interactive features

### Phase 7: Maintenance and Updates

#### Step 18: Making Changes
1. Edit files in your local project
2. Test changes locally with `npm start`
3. When ready, run `npm run build` again
4. Upload updated build folder via FTP

#### Step 19: Database Updates
1. Use phpMyAdmin in CPanel to update database content
2. If you add new features that need database changes, update accordingly

### Common Issues and Solutions

#### Problem: "npm start" doesn't work
- Make sure Node.js is installed correctly
- Try deleting node_modules folder and running `npm install`

#### Problem: Website looks different on mobile
- Add responsive CSS with media queries
- Test on different devices

#### Problem: Can't connect to database
- Double-check database credentials
- Make sure PHP files have correct permissions

#### Problem: Files don't upload via FTP
- Check FTP credentials in CPanel
- Make sure you're uploading to the correct directory

### Learning Resources for Junior Developers
- React documentation: reactjs.org
- MDN Web Docs for HTML/CSS/JavaScript: developer.mozilla.org
- FreeCodeCamp for tutorials: freecodecamp.org
- W3Schools for quick references: w3schools.com

Remember: Start small, test often, and don't be afraid to ask for help. Web development is about learning through trial and error!
