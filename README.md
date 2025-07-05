# 🏡 UrbanNest - Real Estate MERN App

**UrbanNest** is a full-stack real estate web application that offers users a seamless experience to **buy, sell, or rent properties**. Built using the **MERN stack**, it incorporates modern UI design, secure authentication using **Google Sign-In** and **JWT**, and full CRUD functionalities for listings.

---

## 🚀 Live Demo

🌐 [Live Site](https://urban-nest-client.vercel.app/)  
📦 [Frontend Repo](https://github.com/Sadaf2005/UrbanNest)  
🔗 *Backend is integrated within the same repository.*

---

## ✨ Features

- 🔐 **Authentication & Authorization**
  - Google Sign-In (Firebase)
  - JWT-based token auth for secure access
- 🏘️ **Listing Management**
  - Create, Read, Update, Delete (CRUD) properties
  - Upload images and details of real estate listings
- 🔍 **Search & Filter**
  - Search properties by type (Rent/Sale), name, and location
- 🖼️ **Image Upload**
  - Upload and preview images with each listing
- 🧑‍💼 **User Dashboard**
  - View your own listings
  - Edit or delete your property posts
- ⚡ **Responsive UI**
  - Fully responsive design for mobile, tablet, and desktop
- 📄 **Protected Routes**
  - Route protection using JWT
  - Role-based access for users and admins

---

## 🛠️ Tech Stack

| Technology     | Description                        |
|----------------|------------------------------------|
| **MongoDB**    | NoSQL database for storing listings & users |
| **Express.js** | Node.js web framework              |
| **React.js**   | Frontend library with hooks        |
| **Node.js**    | Backend runtime                    |
| **Firebase**   | Google authentication integration  |
| **JWT**        | Token-based user authentication    |
| **TailwindCSS**| Utility-first CSS for UI design    |
| **Vercel**     | Frontend hosting                   |
| **Render**     | Backend deployment                 |

---

## 📁 Project Structure

UrbanNest/
├── client/ # React frontend
│ ├── pages/ # Routing pages (Home, SignIn, Listing, etc.)
│ └── components/ # Reusable UI components
├── server/ # Express backend API
│ ├── routes/ # All route handlers
│ ├── controllers/ # Business logic
│ ├── models/ # Mongoose schemas
│ └── middleware/ # JWT and error handling

yaml
Copy
Edit

---

## 🔧 Installation (Local Setup)

### Prerequisites
- Node.js
- MongoDB (local or Atlas)
- Firebase Project (for Google Auth)

### 1. Clone the Repository
```bash
git clone https://github.com/Sadaf2005/UrbanNest.git
cd UrbanNest
2. Install Dependencies
Backend:
bash
Copy
Edit
cd server
npm install
Frontend:
bash
Copy
Edit
cd ../client
npm install
3. Setup Environment Variables
Backend (server/.env)
ini
Copy
Edit
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
Frontend (client/.env)
ini
Copy
Edit
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
4. Run the App
Backend:
bash
Copy
Edit
cd server
npm start
Frontend:
bash
Copy
Edit
cd ../client
npm run dev
📸 Screenshots
Homepage	Listing Details	Dashboard

🛡️ Authentication Flow
Google Sign-In via Firebase

JWT issued by backend after initial login

All protected routes verify JWT token

Tokens stored securely in localStorage

📌 Future Enhancements
Payment gateway integration for property booking

Admin dashboard for analytics and user control

Add wishlist/favorite functionality

Chat between buyer and seller
