# College Placement Management System

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [User Roles](#user-roles)
- [Installation](#installation)
- [Contributors](#contributors)

## Introduction
The **College Placement Management System** is a web application designed to streamline the placement process in educational institutions. This system provides distinct roles for students, TPO (Training and Placement Officer) admin, and management admin, ensuring a smooth and efficient workflow.

## Features
- **Student Portal**: Students can view available job opportunities, apply for placements, and track their application status.
- **TPO Admin Portal**: TPO admins can manage job postings, schedule interviews, and track student progress.
- **Management Admin Portal**: Management can oversee the entire placement process, view reports, and analyze data.

## Tech Stack
- **Frontend**: Vite + React.js, Tailwind CSS, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: Tailwind CSS, Bootstrap

## Project Structure
```plaintext
├── frontend
│   ├── public
│   ├── src
|   |   ├── api
|   |   ├── assets
│   │   ├── components
|   |   |   ├──LandingPages
|   |   |   └──students
│   │   ├── context
│   │   ├── hooks
│   │   ├── pages
│   │   ├── styles
│   │   ├── utils
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .gitignore
│   ├── .eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── public
│   │   └──  profileImgs
│   │         └── default
│   ├── routes
│   ├── .env(NOTE: YOU NEED TO CREATE THIS FILE)
│   ├── .gitignore
│   ├── index.js
│   ├── package.json
│   └── package-lock.js
└── README.md
```

## User Roles
- **Students**: Can view and apply for job opportunities, update profiles, and track their application status.
- **TPO Admin**: Manages job postings, student applications, and interviews.
- **Management Admin**: Oversees the placement process, views reports, and analyzes placement data.

## Installation

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running

### Clone the Repository
```bash
git clone https://github.com/moinmn/college-placement-management-system.git
cd college-placement-management-system
```

### Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install the necessary packages:
   ```bash
   npm install
   ```
3. Create a `.env` file for environment variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the necessary packages:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Contributors
- **Member 1**: [Moin MN](https://www.linkedin.com/in/moinnaik/)
- **Member 2**: Rafat Muskan Shaikh
- **Member 3**: Saquib Patel
- **Member 4**: Neeraj Kumar
