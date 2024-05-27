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
- These records will be stored into a local database.

# Introduce docker
- create a Dockerfile
- build the docker image using the command - docker build -t bookstore-api-image .
- Dockerize Your PostgreSQL Database by creating a docker-compose.yml, where app and postgres will be under same network.
- please note the details in docker-compose.yml
  - services/app/environment/PGHOST:db
  - services/app/depends_on:db
  - db
- In bookModal.js
  - change the pool.host from 'localhost' to 'db'
- run the command - docker-compose build
- run the command - docker-compose up
- check docker desktop images for bookstore-api-app
- check docker desktop repository for bookstore-api-app and bookstore-api-db
- if you don't have a database or table, enter the container shell using the commands
  - docker ps (eg: container id of bookstore-api-db: aa1853ec70f1)
  - docker exec -it aa1853ec70f1 bash
  - psql -U postgres -d bookstore
  - CREATE TABLE books (id SERIAL PRIMARY KEY,title VARCHAR(255) NOT NULL,author VARCHAR(255) NOT NULL,description TEXT);
- Rebuild and start using docker-compose build and docker-compose up
- access [localhost:3000](http://localhost:3000/books)
- to run in background run - docker-compose up -d
- Create a record using postman as mentioned below
- This record will be stored in docker postgres database.

