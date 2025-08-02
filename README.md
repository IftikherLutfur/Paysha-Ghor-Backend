# 💸 Paysha Ghor - Digital Wallet API (Backend)

A role-based digital wallet backend built with **Node.js**, **Express.js**, and **MongoDB**. This API supports `User`, `Agent`, and `Admin` roles with secure JWT authentication, transaction management, and modular structure.

---

## 🚀 Features

- ✅ Role-based JWT Authentication  
- ✅ Secure Password Hashing with **bcrypt**  
- ✅ Auto Wallet Creation with ৳50 Initial Balance  
- ✅ Deposit, Send, Withdraw, Cash-in, and Cash-out Features  
- ✅ Admin Panel for User & Wallet Management  
- ✅ Modular MVC Project Structure

---

## 👥 User Roles and Permissions

| Role     | Permissions                                                                 |
|----------|------------------------------------------------------------------------------|
| 👤 **User**   | Deposit, Send money, Withdraw, View own wallet & transactions             |
| 🧑‍💼 **Agent**  | Cash-in to user, Cash-out from user, View own wallet                     |
| 🛡️ **Admin**   | View all users/agents/wallets/transactions, Approve/Suspend/Block users  |

---

## 🔐 Authentication & Authorization

All routes are protected with JWT and role-based middleware.

### 🔑 Auth Routes

- `POST /api/auth/login` — Login  
 
  {
    "email": "iftikher@gmail.com",
    "password": "1234Abdullah$$%%"
  }
POST /api/auth/logout — Logout

📦 API Endpoints
🟢 Base URL: http://localhost:5000/

👤 User Routes
POST /api/user — Register a new user

{
  "name": "Shakib",
  
  "email": "shakib@gmail.com",
  
  "password": "Abcd@1234",
  
  "role": "USER" | "AGENT"
}

GET /api/user — Get all users (Admin only)

PATCH /api/user/agent-approve/:userId — Approve/Suspend an agent

{
  "userStatus": "PENDING" | "APPROVED" | "SUSPEND"
}

💳 Wallet Routes
GET /api/wallet/:walletId — Get wallet by wallet ID

GET /api/wallet/user/:userId — Get wallet by user ID

POST /api/wallet/deposit — Deposit money (by user)

{
  "from": "userId",
  
  "amount": 20
}

POST /api/wallet/sendMoney — Send money (user to user)

{
  "to": "receiverUserId",
  
  "amount": 150
}
POST /api/wallet/withdraw — Withdraw money (user)

{
  "amount": 1000
}
POST /api/wallet/cash-in — Agent adds money to user

{
  "to": "userId",
  
  "amount": 15
}
POST /api/wallet/cash-out — Agent withdraws from user

{
  "from": "userId",
  "amount": 200
}
📄 Transaction Routes
GET /api/wallet/transaction — Get all transactions (Admin only)

GET /api/wallet/transaction/:userId — Get transactions for specific user

⚙️ Technologies Used
🟨 Node.js

⚙️ Express.js

🍃 MongoDB + Mongoose

🔒 bcrypt for hashing passwords

🛡️ JWT for authentication

🧠 Role-based middleware

🛠️ Project Setup
bash
Copy
Edit
# Clone the repo
git clone https://github.com/your-username/paysha-ghor-backend.git
cd paysha-ghor-backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Set your MongoDB URI, JWT_SECRET, etc.

# Run the server
npm run dev
🧪 Sample Environment Variables

PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/payshaghor
JWT_SECRET=yourSecretKey
JWT_EXPIRES_IN=7d
🧠 Author
Iftikher Lutfur Abdullah
🧑‍💻 Junior Full Stack Developer
🌐 LinkedIn • 📧 iftikherabdullah@gmail.com
