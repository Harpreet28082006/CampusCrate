# CampusCrate – Lost & Found Management System

CampusCrate is a full-stack MERN application designed to help students and staff report, search, and recover lost or found items within a college campus. It provides a secure claim verification workflow that ensures lost items are returned to their rightful owners.

---

## 📌 Features

### User Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes

### Lost & Found Management
- Report Lost Items
- Report Found Items
- Upload Item Images (Cloudinary)
- Edit/Delete Own Posts
- Dashboard for Managing Items

### Search & Filtering
- Search Items
- Filter by Category
- Filter by Item Type
- Sort by Date

### Claim Management
- Submit Ownership Claims
- Prevent Duplicate Claims
- Prevent Users from Claiming Their Own Items
- View Claims (Owner Only)
- Approve or Reject Claims
- Automatically Mark Items as Returned
- Hide Claim Option for Returned Items

### User Experience
- Responsive Design
- Toast Notifications
- Image Preview Before Upload
- Loading States
- Form Validation

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- Cloudinary

---

## 📂 Project Structure

```
CampusCrate/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── config/
│   └── package.json
│
└── README.md
```

---

## ⚙ Installation

### Clone Repository

```bash
git clone https://github.com/Harpreet28082006/CampusCrate.git
```

Move into project directory

```bash
cd CampusCrate
```

---

### Install Frontend

```bash
cd client
npm install
```

---

### Install Backend

```bash
cd ../server
npm install
```

---

## Environment Variables

Create a `.env` file inside the `server` folder.

Example:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

## Running the Project

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm run dev
```

---

## API Modules

### Authentication
- Register User
- Login User
- Get User Profile

### Items
- Create Item
- Get All Items
- Get Single Item
- Update Item
- Delete Item
- Get User Items

### Claims
- Create Claim
- View Claims
- Approve Claim
- Reject Claim

---

## Database Collections

- Users
- Items
- Claims

---

## Screenshots

Add screenshots here before final submission.

Example:

- Home Page
- Dashboard
- Report Lost Item
- Report Found Item
- Claim Management
- Item Details

---

## Future Enhancements

- Admin Panel
- Email Notifications
- Chat Between Owner & Claimant
- QR Code Based Item Tracking
- AI Image Recognition
- Mobile Application

---

## Contributors

- **Harpreet Kaur** – Backend Development, Authentication, Claim Authorization
- **Vanshika Sharma** – Frontend Development, Dashboard UI, Validation, User Experience

---

## License

This project was developed for educational purposes as part of a MERN Stack development project.