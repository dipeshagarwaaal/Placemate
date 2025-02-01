
# Placemate: A Digital Platform For Campus Recruitment
## Overview
**Placemate** is a web-based platform designed to streamline the placement process in colleges and universities. It simplifies the interaction between students, placement officers (TPO), and management by providing a central portal for all activities related to campus recruitment, job applications, and placement tracking.

## Key Features
- **Student Dashboard**: Allows students to apply for job positions, view application status, and manage their profiles.
- **TPO Admin Dashboard**: Enables TPOs to post job opportunities, schedule interviews, and manage student applications.
- **Management Dashboard**: Offers management an overview of the placement process, report generation, and analytics on placement trends.
- **Super Admin Dashboard**: Provides super admins with control over system-wide settings and user roles, including creating and managing TPO and management users.

## Technologies Used
- **Frontend**: React.js, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **CSS Frameworks**: Tailwind CSS, Bootstrap for UI styling

## Project Structure
```plaintext
├── frontend
│   ├── public
│   ├── src
│   │   ├── api
│   │   ├── assets
│   │   ├── components
│   │   │   ├── LandingPages
│   │   │   └── students
│   │   ├── config
│   │   ├── context
│   │   ├── hooks
│   │   ├── pages
│   │   ├── styles
│   │   ├── utility
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
│   │   ├── offerLetter
│   │   ├── resumes
│   │   └── profileImgs
│   ├── routes
│   ├── .env (Create this file)
│   ├── .gitignore
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
└── README.md
```

## User Roles
- **Students**: View and apply for job positions, track application status, and manage their profiles.
- **TPO Admins**: Post new job openings, schedule interviews, and manage student applications.
- **Management Admins**: Monitor the entire placement process, generate reports, and analyze data.
- **Super Admins**: Have full control over the system, including user management and access control for TPO and management users.

## Setup Instructions

### Prerequisites
Before setting up, make sure you have the following installed on your machine:
- Node.js (v14 or higher)
- MongoDB (either locally or use a cloud service like MongoDB Atlas)
- Git

### Clone the Repository
Start by cloning the repository to your local machine:
```bash
git clone https://github.com/dipeshagarwaaal/Placemate.git
cd Placemate
```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the required backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your MongoDB connection URI and JWT secret key:
   ```env
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Run the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the necessary frontend dependencies:
   ```bash
   npm install
   ```
3. Run the frontend server:
   ```bash
   npm run dev
   ```

Once both frontend and backend servers are up and running, open your browser and visit `http://localhost:3000` to interact with the system.

## Contributing
Contributions are always welcome! If you'd like to enhance this project, feel free to fork the repository, make changes, and submit a pull request. For larger changes or new features, please open an issue first so we can discuss it.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This version reflects a slightly different structure and wording while still capturing all the necessary details for setting up the **Placemate** project. Let me know if you'd like to adjust any part further!
