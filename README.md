# Venue Booking Platform

A full-stack venue booking platform with separate user and admin interfaces.

## 🏗️ Project Structure

\`\`\`
/venue-booking-platform
├── backend          ← Node/Express server
├── user            ← User frontend (Vite + React)
├── admin           ← Admin frontend (Vite + React)
└── README.md
\`\`\`

## 🚀 Quick Start

### 1. Backend Setup (Node/Express)
\`\`\`bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB connection string
npm run dev
\`\`\`

### 2. User Frontend Setup (Vite + React)
\`\`\`bash
cd user
npm install
cp .env.example .env
# Edit .env with your backend URL
npm run dev
\`\`\`

### 3. Admin Frontend Setup (Vite + React)
\`\`\`bash
cd admin
npm install
cp .env.example .env
# Edit .env with your backend URL
npm run dev
\`\`\`

## 📱 Features

### User Features
- Browse and search venues
- View venue details with image galleries
- Book venues with calendar selection
- User dashboard with booking management
- Favorites system
- User authentication

### Admin Features
- Venue management (CRUD)
- Booking management
- User management
- Analytics dashboard
- Image upload system
- Admin authentication

## 🛠️ Tech Stack

- **Backend**: Express.js, MongoDB, Mongoose, JWT, Multer, Cloudinary
- **User Frontend**: Vite, React, TypeScript, Tailwind CSS, Framer Motion
- **Admin Frontend**: Vite, React, TypeScript, Tailwind CSS, Chart.js

## 🔐 Default Admin Credentials

- Email: admin@venuebook.com
- Password: admin123
\`\`\`

Now let's create the backend structure:
