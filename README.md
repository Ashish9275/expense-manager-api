# expense-manager-api
Expense Manager API built with Node.js, Express, and MongoDB. Provides secure authentication using JWT, password hashing with bcrypt, and full CRUD operations for managing expenses. Designed for personal finance tracking, includes endpoints for user registration, login, adding, listing, and deleting expenses.
# Expense Manager API 🚀

A full-featured **Expense Manager API** built with **Node.js, Express, and MongoDB**.  
It includes secure authentication and expense tracking features for personal finance management.  

---

## Features ✨
- 🔐 User registration & login (with JWT authentication)
- 🔑 Password hashing with bcrypt
- 💰 CRUD operations for expenses (add, view, delete)
- 📊 Organized by category with timestamps
- 🌍 CORS enabled for frontend integration
- ⚡ Ready for deployment on Render/Heroku

---

## Tech Stack 🛠
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose ODM)
- **Auth:** JWT & bcrypt
- **Other:** dotenv, cors

---

## API Endpoints 📡

### Auth Routes (`/api/auth`)
- `POST /register` → Register a new user  
- `POST /login` → Login and get a token  

### Expense Routes (`/api/expenses`)
- `GET /` → Get all expenses (protected)  
- `POST /` → Add new expense (protected)  
- `DELETE /:id` → Delete expense by ID (protected)  

---

## Setup ⚙️

1. Clone this repo  
   ```bash
   git clone https://github.com/<your-username>/expense-manager-api.git
   cd expense-manager-api
Install dependencies

bash
Copy code
npm install
Create a .env file in the root:

ini
Copy code
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
Start the server

bash
Copy code
npm start
