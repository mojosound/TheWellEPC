# Admin Section Documentation

## Overview
The admin section provides a comprehensive content management system for The Well EPC website. It allows authorized users to manage dynamic content including events, sermons, announcements, ministries, prayer requests, and more.

## Access
- **URL:** `/admin/login`
- **Demo Credentials:** `admin` / `admin123`
- ⚠️ **Important:** Change these credentials in production!

## Features

### 1. Dashboard
- **Overview:** Main admin interface with quick stats and navigation
- **Features:**
  - Content statistics (events, sermons, announcements, etc.)
  - Quick access to all management sections
  - Recent activity feed
  - Direct links to view the public website

### 2. Events Management
- **Location:** `/admin/events`
- **Features:**
  - View all church events in a sortable table
  - Add new events with detailed information
  - Edit existing events
  - Delete events (with confirmation)
  - Search and filter events
  - Track event attendance

### 3. Content Management Sections
The following sections are available (currently using placeholder navigation):

- **Sermons** - Manage sermon archives and media
- **Announcements** - Create and manage church announcements
- **Ministries** - Manage church ministries and volunteer assignments
- **Prayer Requests** - Review and manage prayer request submissions
- **Contact Messages** - View and respond to contact form submissions
- **Newsletter** - Manage email subscriptions
- **Users** - Manage user accounts and permissions

## Technical Implementation

### Components
- **AdminLogin:** Authentication page
- **AdminDashboard:** Main dashboard with stats and navigation
- **AdminNav:** Consistent navigation across all admin pages
- **AdminDataTable:** Reusable table component for data management
- **AdminFormModal:** Modal form for adding/editing content

### API Integration
- **File:** `src/admin/utils/api.js`
- **Features:** Mock API calls (replace with real backend endpoints)
- **Authentication:** Local storage-based session management
- **Data Operations:** CRUD operations for all content types

### Database Schema
See `Database-Setup-Guide.md` for complete database schema and setup instructions.

## Usage Guide

### Adding New Content
1. Navigate to the appropriate section (e.g., Events)
2. Click "Add New" button
3. Fill out the form with required information
4. Click "Save" to create the content

### Editing Content
1. Find the item in the data table
2. Click "Edit" in the Actions column
3. Modify the information in the modal form
4. Click "Save" to update

### Deleting Content
1. Find the item in the data table
2. Click "Delete" in the Actions column
3. Confirm the deletion in the popup dialog

### Searching and Filtering
- Use the search box to find specific content
- Click column headers to sort data
- All tables support real-time search

## Security Features

### Authentication
- Session-based authentication using localStorage
- Automatic redirect to login for unauthenticated users
- Secure logout functionality

### Data Protection
- Form validation on all inputs
- Confirmation dialogs for destructive actions
- Input sanitization (implement on backend)

## Production Deployment

### Backend Requirements
1. **PHP Backend:** Create API endpoints for database operations
2. **Database Connection:** Update connection credentials
3. **Authentication:** Implement proper user authentication
4. **File Uploads:** Add support for image/document uploads

### Security Enhancements
1. **HTTPS:** Ensure all admin access uses SSL
2. **Password Hashing:** Implement secure password storage
3. **CSRF Protection:** Add CSRF tokens to forms
4. **Rate Limiting:** Implement request rate limiting
5. **Audit Logging:** Log all admin actions

### File Structure
```
src/admin/
├── components/
│   ├── AdminDataTable.js    # Reusable data table
│   ├── AdminFormModal.js    # Modal forms
│   └── AdminNav.js         # Navigation component
├── pages/
│   ├── AdminLogin.js       # Login page
│   ├── AdminDashboard.js   # Main dashboard
│   └── AdminEvents.js      # Events management
└── utils/
    └── api.js             # API utilities
```

## Customization

### Adding New Content Types
1. Create a new page component in `src/admin/pages/`
2. Add the route to `src/App.js`
3. Update the navigation in `src/admin/components/AdminNav.js`
4. Add API methods to `src/admin/utils/api.js`

### Styling
- Uses Tailwind CSS for consistent styling
- Responsive design for mobile and desktop
- Consistent color scheme matching the main website

## Troubleshooting

### Common Issues
- **Login not working:** Check browser localStorage settings
- **Data not loading:** Verify API endpoints are accessible
- **Styling issues:** Ensure Tailwind CSS is properly configured
- **Build errors:** Check for missing dependencies

### Debug Mode
- Open browser developer tools
- Check Console tab for JavaScript errors
- Check Network tab for failed API calls
- Verify localStorage contains authentication data

## Future Enhancements

### Planned Features
- **Bulk Operations:** Select multiple items for batch actions
- **Export Functionality:** Export data to CSV/PDF
- **Advanced Search:** Filter by date ranges, categories, etc.
- **User Roles:** Different permission levels for staff
- **Audit Trail:** Track all content changes
- **Email Notifications:** Automated alerts for new submissions

### Integration Opportunities
- **Calendar Integration:** Sync with Google Calendar
- **Email Service:** Connect with Mailchimp for newsletters
- **File Storage:** Cloud storage for media files
- **Analytics:** Track admin usage and content performance

---

**Version:** 1.0
**Last Updated:** September 6, 2025
**Status:** Ready for development and testing
