💸 Paysha Ghor - Digital Wallet API (Backend)
A role-based digital wallet system built with Node.js, Express.js, and MongoDB. It supports user, agent, and admin roles with secure authentication, transaction logic, and modular architecture.

🚀 Features
✅ JWT-based authentication with role-based access

✅ Secure password hashing using bcrypt

✅ Automatic wallet creation on registration (initial balance: ৳50)

✅ Role-based access control for all routes

✅ Full wallet and transaction functionality

✅ Clean, modular and scalable code structure

👥 User Roles and Permissions
Role	Permissions
User	Deposit, send money, withdraw, view own wallet & transactions
Agent	Cash-in (add money to users), cash-out (withdraw from users), view own wallet
Admin	Manage users & agents, block/unblock wallets, approve/suspend agents, view all wallets & transactions

🔐 Authentication & Authorization
All routes are protected using JWT tokens and verified via role-based middleware.

POST /api/auth/login — User login

POST /api/auth/logout — User logout

🌐 API Endpoints
Base URL: http://localhost:5000/

🧑‍💼 User Routes
POST /api/user — Register a new user
Body:

json
Copy
Edit
{
  "name": "Shakib",
  "email": "shakib@gmail.com",
  "password": "Abcd@1234",
  "role": "USER" || "AGENT"
}
GET /api/user — Get all users (Admin only)

PATCH /api/user/agent-approve/:userId — Update agent approval status
Body:

json
Copy
Edit
{
  "userStatus": "SUSPEND" || "APPROVED" || "PENDING"
}
🔐 Auth Routes
POST /api/auth/login — User login
Body:

json
Copy
Edit
{
  "email": "iftikher@gmail.com",
  "password": "1234Abdullah$$%%"
}
POST /api/auth/logout — User logout

💳 Wallet Routes
GET /api/wallet/:id — Get wallet by wallet ID

GET /api/wallet/user/:userId — Get wallet by user ID

POST /api/wallet/deposit — Deposit money (user only)
Body:

json
Copy
Edit
{
  "from": "userObjectId",
  "amount": 20
}
POST /api/wallet/sendMoney — Send money (user to user)
Body:

json
Copy
Edit
{
  "to": "recipientUserId",
  "amount": 150
}
POST /api/wallet/withdraw — Withdraw money (user only)
Body:

json
Copy
Edit
{
  "amount": 1000
}
POST /api/wallet/cash-in — Cash-in money to user (agent only)
Body:

json
Copy
Edit
{
  "to": "userId",
  "amount": 15
}
POST /api/wallet/cash-out — Cash-out from user (agent only)
Body:

json
Copy
Edit
{
  "from": "userId",
  "amount": 200
}
📄 Transaction Routes
GET /api/wallet/transaction — Get all transactions (Admin only)

GET /api/wallet/transaction/:userId — Get transactions for a specific user

📦 Technologies Used
Node.js

Express.js

MongoDB with Mongoose

bcrypt for password hashing

JWT for authentication

Custom middleware for role-based access control

⚙️ Project Setup
bash
Copy
Edit
# Clone the repository
git clone https://github.com/your-username/paysha-ghor-backend.git
cd paysha-ghor-backend

# Install dependencies
npm install

# Copy environment config
cp .env.example .env

# Set your MongoDB URI, JWT_SECRET, and other environment variables in the .env file

# Start development server
npm run dev
