# 💸 Paysha Ghor - Digital Wallet API (Backend)

A role-based digital wallet system built with **Node.js**, **Express.js**, and **MongoDB**, inspired by platforms like **bKash** or **Nagad**. This system supports `user`, `agent`, and `admin` roles with secure authentication and modular financial transaction logic.

---

## 🚀 Features

✅ JWT-based authentication with role-based access  
✅ Secure password hashing with bcrypt  
✅ Automatic wallet creation at registration (initial balance: ৳50)  
✅ Role-based route protection  
✅ Full wallet & transaction logic  
✅ Clean, modular project structure

---

## 👥 User Roles and Permissions

| Role   | Permissions |
|--------|-------------|
| **User**  | Deposit money, send money, withdraw, view own wallet & transactions |
| **Agent** | Cash-in (add money to user), cash-out (withdraw from user), view wallet |
| **Admin** | View all users, agents, wallets, transactions; block/unblock wallets; approve/suspend agents |

---

## 🔐 Authentication & Authorization

- **Login:** `POST /api/auth/login`
- **Logout:** `POST /api/auth/logout`
- All routes are protected via JWT and role-based middleware

---

## 🌐 API Endpoints

> **Base URL:** `http://localhost:5000/`

### 🧑‍💼 User

- `POST /api/user/` — Register a new user

### 🔐 Auth

- `POST /api/auth/login` — User login  
- `POST /api/auth/logout` — User logout  

### 💳 Wallet

- `GET /api/wallet/:id` — Get wallet by ID  
- `POST /api/wallet/deposit` — Add money (by user)  
- `POST /api/wallet/sendMoney` — Send money (user to user)  
- `POST /api/wallet/withdraw` — Withdraw money (by user)  
- `POST /api/wallet/cash-in` — Cash-in (by agent)  
- `POST /api/wallet/cash-out` — Cash-out (by agent)  
- `GET /api/wallet/transaction` — Get all transactions (admin only)  
- `GET /api/wallet/transaction/:id` — Get individual transaction  

---

## 📦 Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- bcrypt for password hashing
- JSON Web Token (JWT) for authentication
- Role-based middleware for authorization

---

## ⚙️ Project Setup

```bash
# Clone the repository
git clone https://github.com/your-username/paysha-ghor-backend.git
cd paysha-ghor-backend

# Install dependencies
npm install

# Environment setup
cp .env.example .env
# Set your MongoDB URI, JWT_SECRET, etc. in the .env file

# Run the development server
npm run dev
