# Postaway Backend

Postaway is a backend project built using Node.js and Express.js following REST API architecture & with Database of MongoDB ORM liberary Mongoose. It includes features for managing users, posts, likes, and comments. The APIs are tested using Postman. & Documentation using Swagger

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

## Tech Stack

- Node.js
- Express.js
- Multer (For File Upload)
- JSON Web Token (JWT) for authentication
- Postman for API testing

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
JWT_SECRET=your_jwt_secret
```

4. Start the development server:
```bash
npm run dev
```

## API Testing

All routes are tested using **Postman**. Import the Postman collection or manually test the following endpoints:

### User Routes
- `POST /api/users/register`
- `POST /api/users/login`
- `GET  /api/users/logout`
- `GET /api/users/:id`    
- `GET /api/users/`
- `POST /api/users/details` 

### Post Routes
- `GET /api/posts`
- `POST /api/posts`
- `PUT /api/posts/:id`
- `DELETE /api/posts/:id`

### Comment Routes
- `POST /api/comments/:postId`
- `DELETE /api/comments/:commentId`

### Like Routes
- `POST /api/likes/:postId`
- `DELETE /api/likes/:postId`

---

Feel free to contribute, raise issues, or fork the project!

📬 Contact
If you have any questions, suggestions, or feedback, feel free to reach out:

GitHub: https://github.com/rwtabhii

Email: abhishekrawatdev@gmail.com

