# Budget Planner Web Application

## Overview

A simple and secure web application designed to help users manage their personal finances with ease. This Budget Planner allows users to register, log in, track their income, log expenses by category, and instantly calculate their remaining balance. The goal of this project is to provide practical hands-on experience with authentication, sessions, routing, and dynamic rendering in a full-stack Node.js environment.

## About This Application

This budget planner helps streamline personal finance management by allowing users the ability to:

- Record different types of income
- Add expenses under meaningful categories
- Edit or delete previous entries
- View a real-time summary of balance

This web application is also built with security and usability in mind, integrating protected routes, hashed passwords, and session handling while maintaining an accessible interface suitable for new developers.

## Project Requirements

Your web application must include:

1. **Frontend**
   - Responsive HTML/CSS layout
   - Client-side form validation
   - Interactive UI elements using JavaScript
   - Consistent design system and typography

2. **Backend (Express.js)**
   - RESTful API endpoints
   - PostgreSQL database for data persistence
   - Error handling
   - User authentication (provided in template)

3. **Full-Stack Features**
   - CRUD operations
   - Input validation (both client and server side)
   - At least one complex feature unique to your project

4. **Deployment**
   - Application deployed on Render.com
   - PostgreSQL database hosted on Render.com

## Key Features
- Budget tracking tools for income, expenses and balance
- User registration and login

## Technology Stack

Backend
- Node.js
- Express.js

Database
- PostgreSQL

Frontend
- HTML
- CSS
- JavaScript

Template Engine
- EJS for rendering dynamic pages

Deployment
- Render.com for hosting the live application

## Directory Structure

The project follows this directory structure:

```
├── /
    ├── app.js
    ├── package.json
    ├── public/
    │   ├── css/
    │   ├── js/
    │   └── images/
    ├── routes/
    │   └── api/
    ├── views/
    ├── middlewares/
    ├── models/
    ├── config/
    ├── scripts/
    └── README.md
```