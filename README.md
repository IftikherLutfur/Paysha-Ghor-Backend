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

📦 API Endpoints
🟢 Base URL: https://poysha-ghor.vercel.app

**Admin Loginn**
`{ "email":"admin@gmail.com",
    "password": "Abcd@1234"  }`
    
**Agent Login**
`{
   "email":"abdullah@gmail.com",
    "password": "1234Abdullah$$%%"  
}`

## 👤 User Routes

**POST /api/user — Register a new user**

`{
  "email": "test@gmail.com",
  "password": "Abcd@1234",
  "role": "USER" | "AGENT"}`

**GET /api/user — Get all users (Admin only)**

**PATCH /api/user/agent-approve/:userId — Approve/Suspend an agent**

`{ "userStatus": "PENDING"(By default) | "APPROVED" | "SUSPEND"}`

### 🔑 Auth Routes

**POST /api/auth/login` — Login**  
 
 `{"email": "iftikher@gmail.com",
    "password": "1234Abdullah$$%%"}`
**POST /api/auth/logout — Logout**

## 💳 Wallet Routes

**GET /api/wallet/:userId — Get individually wallet by user ID**

**GET /api/wallet — Get all wallet only for admin**

**POST /api/wallet/deposite — Deposit money (by user)**

`{"from": "userId","amount": 20}`

**POST /api/wallet/sendMoney — Send money (user to user)**

`{"to": "receiverUserId","amount": 150}`

**POST /api/wallet/withdraw — Withdraw money (user)**

`{"amount": 1000}`

**POST /api/wallet/cash-in — Agent adds money to user**

`{"to": "userId", "amount": 150}`

**POST /api/wallet/cash-out — Agent withdraws from user**

`{"from": "userId","amount": 200}`

**PATCH /api/wallet/:walletId**
`{
    "walletStatus": "BLOCK"
}`

📄 Transaction Routes

-**GET /api/wallet/transaction — Get all transactions (Admin only)**

-**GET /api/wallet/transaction/:userId — Get transactions for specific user**



⚙️ Technologies Used
🟨 Node.js

⚙️ Express.js

🍃 MongoDB + Mongoose

🔒 bcrypt for hashing passwords

🛡️ JWT for authentication

🧠 Role-based middleware

🛠️ Project Setup


🧠 Author
**Iftikher Lutfur Abdullah**

-**🧑‍💻 Junior Full Stack Developer**

**📧 iftikherlutfur@gmail.com**
