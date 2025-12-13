This document summarizes the contributions made by each group member to the CSC317 Budget Planner project. The project involved backend development, database design, frontend templates, styling, and deployment to Render.
# Contributions

## Mario — Backend Lead / Full-Stack Integration

### Database and Initialization
- Designed the PostgreSQL schema for the project, including the categories and transactions tables.
- Integrated the schema into the existing `init-db.js` script so tables are created automatically in both local and production environments.

### Backend Logic and Routes
- Implemented the backend logic for the budget system, including:
    - The `/budget` route for loading the dashboard.
    - The `/transactions` POST route for recording income and expenses.
    - Database model functions for creating, retrieving, and summarizing transactions.
    - Ensured all routes filter results per authenticated user.

### Authentication and Sessions
- Debugged and corrected session handling issues on Render, including:
    - Proper session store configuration using template.
    - Fixing secure cookie behavior behind Render’s proxy.
    - Ensuring that authentication middleware works consistently in production.

### EJS Integration
- Converted the user interface into functional EJS templates.
- Added category dropdowns, transaction lists, and summary values using data passed from the backend.
- Added fallbacks and safety checks in the templates to prevent crashes when data is missing.

### Deployment
- Deployed the application to Render with both a web service and a PostgreSQL database.
- Configured environment variables and ensured the initialization script ran successfully on the server.
- Diagnosed and fixed production-only issues such as login redirects and missing sessions.

---

## Jerome — Frontend Structure and EJS Layouts

### Initial UI Structure
- Created the initial version of the budget planner UI, including the structure of the income, expenses, and summary sections.
- Provided the foundation for the later EJS templates by organizing the HTML elements and layout.

### EJS and UI Integration
- Assisted with shaping how the HTML structure should adapt to dynamic server-side data.
- Worked with backend logic to ensure UI sections could properly display categories and transactions.

### User Experience Flow
- Contributed to planning how the budget dashboard should be organized and how users would interact with the forms and displayed data.

---
## Abraham - Frontend Testing
- Contributed updating the Welcome Page to better reflect the purpose of the application. 
- Changed it to ‘Budget Planner,’ which immediately tells users what the app is about. 
### Frontend Testing
- Checked rendering of the UI across different states and made adjustments to ensure visual consistency.

## Gokul — Styling and UI Refinement

### CSS and Visual Layout
- Wrote and refined CSS for the budget page and related UI elements.
- Improved spacing, readability, visual consistency, and general appearance.
- Helped shape the color palette and styling of the interface.


---

## Summary of Contributions

| Member  | Contributions                                                                                     |
|---------|---------------------------------------------------------------------------------------------------|
| Mario   | Backend logic, database schema, session/authentication debugging, EJS data integration, deployment |
| Jerome  | UI structure, EJS layout foundation, planning of dashboard flow                                   |
| Abraham | Frontend testing                                                                                  |
| Gokul   | CSS styling and UI refinements                                                                    |
