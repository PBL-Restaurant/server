# PBL-Restaurant Server

## Setup

 - Require to install [Node.js](https://nodejs.org/en/)
 - Recommend to install [Postman](https://www.postman.com/downloads/)

### Dependencies

 - bcryptjs
 - dotenv
 - express
 - jsonwebtoken
 - mongoose

#### How to install:
```
npm install <dep-name>
```

### Dev-dependencies

- nodemon

#### How to install:
```
npm install --save-dev <dev-dep-name>
```

## Usage

### Start server
```
npm start
```

### Available routes for authorization

- **POST METHODS**
   - /register 
   ```json
   {
      "name": "name",
      "email": "email@dev.com",
      "password": "password"
   }
   ```
  
   - /login
   ```json
   {  
      "email": "email@dev.com",
      "password": "password"
   }
   ```
- **GET METHODS**
   - / - works only with header:
  ```
  KEY = auth-token
  VALUE = JsonWebToken from login
  **JWT for testing:**
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjkwNWNiNjhjNzM0YjQwZDAyNTM4YzciLCJpYXQiOjE2MDMyOTg3NzJ9.bEEduOYAVJNIZm99Fm_HLpzhjQlh9yTjRUqtOqtjKnk
  ```


