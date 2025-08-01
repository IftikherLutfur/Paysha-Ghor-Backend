# 📱 Paysha Ghor Backend Management
Paysha Ghor is a mobile banking system that supports three types of users:
User
Agent
Admin
Each type of user has different roles and permissions in the system.

## 🌐 API Endpoints
👤 User
Create a new user:
POST http://localhost:5000/api/user/
GET http://localhost:5000/api/user/ (ADMIN)

## 🔐 Auth
Login:
POST http://localhost:5000/api/auth/login
Logout:
POST http://localhost:5000/api/auth/logout

## 💳 Wallet
Deposit (Add money by user):
POST http://localhost:5000/api/wallet/deposit
Send money (User to User):
POST http://localhost:5000/api/wallet/sendMoney
Withdraw money by user:
POST http://localhost:5000/api/wallet/withdraw
Cash in (by Agent):
POST http://localhost:5000/api/wallet/cash-in
Cash out (by Agent):
POST http://localhost:5000/api/wallet/cash-out
Get all transactions (Admin):
GET http://localhost:5000/api/wallet/transaction
Get single wallet (User/Agent):
GET http://localhost:5000/api/wallet/:id
Get transaction history (User/Agent):
GET http://localhost:5000/api/wallet/transaction/:id
