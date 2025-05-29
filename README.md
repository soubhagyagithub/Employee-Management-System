# 🧑‍💼 Employee Management Tool

A complete Employee Management System built using the MERN stack with features like login (admin only), full CRUD operations, employee detail viewing, and filtering based on name, department, and date of birth.

---

## 🔥 Features

- 🔐 **Admin Login Only**
- ➕ **Add New Employees**
- 📋 **View Employee List**
- 🔍 **View Single Employee Details**
- ✏️ **Update Employee Information**
- ❌ **Delete Employees**
- 🧠 **Filtering Employees**
  - By **Name**
  - By **Department**
  - By **Date of Birth**
- 📁 Upload ID Proof (PDF)
- 🎯 Responsive UI using **React-Bootstrap**

---

## 🛠️ Tech Stack

**Frontend:**

- React.js
- React Router DOM
- React-Bootstrap
- Axios

**Backend:**

- Node.js
- Express.js
- MongoDB
- Mongoose

**Other Tools:**

- Bootstrap 5
- dotenv
- concurrently (for dev scripts)

---

## 🖥️ Screenshots

> You can find all screenshots in the `screenshots/` folder.

| Login Page
|------------|----------------|----------------|
| ![Login](./screenshots/screenshot1.png) |Employee Addition Form ![List](./screenshots/screenshot2.png) |Employee List ![View](./screenshots/screenshot3.png) | View Employee ![View](./screenshots/screenshot4.png) |

---

## 🚀 Getting Started

### Clone the repo

git clone https://github.com/soubhagyagithub/Employee-Management-System.git
cd employee-management-tool

---

## 🔥 Install Dependancies

- **For Backend**
- cd server
- npm install
- **For frontend**
- cd frontend
- npm install

---

Create a .env file inside backend/ with the following:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=****\*\*\*****
ADMIN_USERNAME=****\*\*\*\*****
ADMIN_PASSWORD=****\*\*\*\*****

npm run dev
Frontend runs on http://localhost:3000
node server.js
Backend runs on http://localhost:5000

---

. Run the Seeder Once :
You can hit this endpoint after starting the server:
Then Username and password will be created and you can use that to Login.

---

👤 Admin Access
Only the admin is allowed to log in and access the employee management dashboard.
you can login using username: ****\*\*\*****
password: ****\*\*\*****
