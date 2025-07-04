# 🛒 MaheerLinks – Online Shopping Platform (Nigeria)

A full-stack online shopping app inspired by platforms like **Pinduoduo**, designed for the Nigerian market. It supports:

- ✅ User login / signup
- 🛍️ Product uploads by admins
- 👥 **Group Buying** with real-time countdown
- 💳 **Flutterwave** split-pay integration
- 📦 Merchant sub-accounts for vendors
- ☁️ React (Vite) + Express (Node.js) + MongoDB (Atlas)

---

## 📦 Features

| Feature           | Details                                             |
|------------------|-----------------------------------------------------|
| Group Buying      | Users form timed groups to unlock discounts        |
| Flutterwave Pay   | Secure payment with auto-split (85% vendor / 15%)  |
| Admin Portal      | Add/remove/edit products                           |
| Merchant Panel    | Create Flutterwave sub-account inside the app      |
| Real-Time Socket  | Countdown + group status via Socket.IO             |

---

## 🚀 Tech Stack

- **Frontend**: React + Tailwind + Vite
- **Backend**: Node.js + Express + MongoDB
- **Payments**: [Flutterwave](https://flutterwave.com/)
- **Deployment**: Render (backend) + Vercel (frontend)

---

## 🔧 Local Setup (Dev)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/online-shop-full.git
cd online-shop-full
