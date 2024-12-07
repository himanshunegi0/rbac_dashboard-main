# RBAC Dashboard

A simple Role-Based Access Control (RBAC) dashboard built with React and Vite. This application allows users to manage roles and users with associated permissions.

## Features

- **User Management**: Add, edit, and delete users.
- **Role Management**: Add, edit, and delete roles with specific permissions.
- **Dashboard Overview**: View the total number of users and roles at a glance.
- **Responsive Design**: The application is mobile-friendly and adapts to different screen sizes.

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: JSON Server (for mock API)
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

### Installation
1. Clone the repository:
git clone https://github.com/himanshunegi0/rbac_dashboard-main

2. Navigate to the project directory:
cd rbac_dashboard-main

3. Install the dependencies:
npm install

4. Start the mock API server:
npx json-server --watch db.json --port 5000

5. Start the development server:
open the new terminal and run npm run dev

### Usage
Dashboard: Upon loading, you'll see an overview of the total number of users and roles.
User Management: Click on "User Management" in the sidebar to add, edit, or delete users.
Role Management: Click on "Role Management" in the sidebar to manage roles and their permissions.
