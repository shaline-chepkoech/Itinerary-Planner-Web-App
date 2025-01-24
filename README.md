# Itinerary-Planner-Web-App
### Travel Itinerary Planner Web App Documentation
## Overview
The Travel Itinerary Planner Web App is a platform that enables users to search for destinations, create and organize travel itineraries, plan budgets, collaborate with others, and receive notifications for their trips. The app uses React for the frontend and Flask for the backend, with integration of third-party APIs for features like maps and travel recommendations.

## Key Features
1. User Management
    • Registration and Login: Users can sign up using email/password or third-party authentication (Google). 
    • Profile Management: Users can view and manage their saved itineraries. 
2. Destination Search
    • Search for destinations using filters like location, type (beaches, mountains, cities), and activities. 
    • Fetch popular destinations and suggestions using third-party APIs (e.g., Google Places). 
3. Itinerary Creation
    • Add destinations, activities, and notes for each day of the trip. 
    • Use drag-and-drop functionality to reorder activities. 
    • Save itineraries for future editing. 
4. Budget Planning
    • Track expenses for transportation, accommodation, meals, and activities. 
    • Visualize spending with charts . 
5. Map Integration
    • Interactive maps to view selected destinations and activities. 
    • Route planning between locations using Google Maps . 
6. Collaboration
    • Share itineraries with friends or family via links or email. 
    • Collaborators can comment or suggest edits. 
7. Notifications and Reminders
    • Alerts for upcoming travel dates or booking deadlines. 
8. Reviews and Recommendations
    • Leave reviews for destinations and activities. 
    • Receive personalized travel recommendations. 
9. Offline Access
    • Save itineraries for offline use.

### Tech Stack
# Frontend
    • Framework: React 
    • Libraries: 
        ◦ React Router for navigation  
        ◦ Chart.js or Recharts for data visualization 
# Backend
    • Framework: Flask 
    • Libraries: 
        ◦ Flask-SQLAlchemy for database management 
        ◦ Flask Flask-OAuth for authentication 
        ◦ Flask-RESTful for API creation 
# Database
        ◦ Relational Database: PostgreSQL  
          
# Third-Party APIs
    • Google Maps API: For maps and route planning 
    • OpenWeatherMap API: For weather forecasts 
# Deployment
    • App Hosting: Netlify
      

## API Endpoints
User Management
Method
Endpoint
Description
POST
/api/register
Register a new user
POST
/api/login
Authenticate user
GET
/api/user
Get user profile
Itinerary Management
Method
Endpoint
Description
POST
/api/itineraries
Create a new itinerary
GET
/api/itineraries
Fetch all itineraries for user
PUT
/api/itineraries/:id
Update an existing itinerary
DELETE
/api/itineraries/:id
Delete an itinerary
Destination Search
Method
Endpoint
Description
GET
/api/destinations
Search for destinations
Collaboration
Method
Endpoint
Description
POST
/api/share/:id
Share an itinerary with others
GET
/api/collaborators
List collaborators for an itinerary
Notifications
Method
Endpoint
Description
POST
/api/notifications
Schedule a notification
GET
/api/notifications
Fetch notifications for user

## Example User Workflow
1. Registration/Login
    1. User visits the app and registers using email/password or logs in via Google OAuth. 
    2. Backend validates credentials 
2. Destination Search
    1. User enters a query in the search bar (e.g., "beaches in Bali"). 
    2. Backend fetches results from Google Places API and applies user-selected filters. 
    3. Results are displayed on the frontend with images and descriptions. 
3. Creating an Itinerary
    1. User clicks "Create New Itinerary." 
    2. Adds destinations and activities with dates and times. 
    3. Rearranges activities using drag-and-drop. 
    4. Saves the itinerary, which is stored in the database. 
4. Budget Planning
    1. User enters expenses for each category . 
    2. App calculates total expenses and displays a chart. 
    3. Budget data is saved to the backend. 
5. Collaboration
    1. User shares the itinerary with a friend via a unique link. 
    2. Friend views the itinerary and adds comments or suggestions. 
    3. Real-time updates are synced . 
6. Notifications
    1. User schedules a reminder for booking a flight. 
    2. Notification is sent via email or push notification on the specified date. 

## Conclusion
The Travel Itinerary Planner Web App is a robust platform for organizing travel plans. With a modular architecture and integration of modern technologies, it provides a seamless experience for users to plan and manage their trips efficiently. By adhering to best practices in security and scalability, the app ensures reliability and user trust.
