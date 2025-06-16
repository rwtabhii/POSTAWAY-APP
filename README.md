# Postaway Backend

Postaway is a backend project built using Node.js and Express.js following REST API architecture & with Database of MongoDB ORM liberary Mongoose. It includes features for managing users, posts, likes, friend Request , OTP based pass Reset  and comments. The APIs are tested using Postman. & Documentation using Swagger

## Features

- **User Credentials**
  - Register
  - Login
  - Authentication (JWT based)
  - Get User Data
  - Get All User Data
  - Update the User Data 

- **Posts**
  - Create, Read, Update, Delete (CRUD operations)

- **Comments**
  - Add and delete comments on posts

- **Likes**
  - Like and unlike posts

- **Friend Request**
  - Send, Accept ,Reject and Check Pending Req

- ** ResetPassword using OTP (nodemailer)
- sending otp, verify otp & resetpass    
## Tech Stack

- Node.js
- Express.js
- Multer (For File Upload)
- Bcrypt liberary for hashed password 
- JSON Web Token (JWT) for authentication
- OTP based password reset -- Using NODEMAILER
- Postman for API testing
- Swagger based API Docs 

## Folder Structure
```
postaway-backend/
├── src/feature/
│             ├──user/               
│                   ├── controllers/ 
│                   ├── models/
│                   ├── routes/
│                   ├──repository/
│                   ├──schemas            
│        
│  
├──utils/
├── middlewares/
├── assests/            
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/postaway-backend.git
cd postaway-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file and add the required variables:
```
PORT=3000
JWT_TOKEN=your_jwt_secret
MONGODB_URL=yourmongourl
EMAIL_USER=youremailfor nodemailer
EMAIL_PASS=yourpassword  generated in gmail for application
```

4. Start the development server:
```bash
npm run dev
```

## API Testing

All routes are tested using **Postman**. 
Import the [Postman collection] (POSTAWAY_APPP\src\docs\postaway Api testing.postman_collection.json)

---

Feel free to contribute, raise issues, or fork the project!

📬 Contact
If you have any questions, suggestions, or feedback, feel free to reach out:

GitHub: https://github.com/rwtabhii

Email: abhishekrawatdev@gmail.com

