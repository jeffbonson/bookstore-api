# bookstore-api


# Create API only app using node, express, local postgres
- mkdir bookstore-api
- cd bookstore-api
- npm init -y
- npm install express body-parser pg
- Create Express app by creating an index.js file in your project directory and set up your Express application.
- Create  routes/bookRoutes.js
- Create controllers/bookController.js and implement the functions
- Create models/bookModel.js and implement the modal functions
- Start your Express server by running node index.js
- Create using CURL
  - Invoke-RestMethod -Method Post -Uri http://localhost:3000/books -ContentType "application/json" -Body '{"title": "Example Title", "author": "Example Author", "description": "Example Description"}'
- Create using Postman
  - POST - http://localhost:3000/books
  - Headers - Content-Type: application/json
  - Body - raw - {"title": "Book1","author": "Author1","description": "Test description1"}
