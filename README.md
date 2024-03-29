## User Authentication and Authorization using npm bcryptjs, JWT, and MongoDB Atlas

### Prerequisites

- Basic knowledge of Node, JavaScript and MongoDB.
- Node and NPM installed.
- MongoDB Atlas account

### How to Start

- Clone the repo.
- Install dependencies in root directory using `npm i`
- Run `npm start`
- Server will be running at `locahost:5000`
- Declare your own MongoDB Atlas Connect URL in config folder

### How to test the API

Make sure you have a Postman account or Postman Agent downloaded.

- Create Collection
- Add POST request with URL `http://localhost:5000/api/users` for User Registration. In the Headers tab add key-value pair as Content-Type: application/json and in the body tab write the JSON object for user registration. For example:

```
{
    "email":"username@gmail.com",
    "password":"user1234"
}
```

This will return a JSON web token

- Add POST request with URL `http://localhost:5000/api/auth` for user login. Follow the same procedure as registration as in real-time we fetch data submitted by the form. Here also we will get a token in return.

- Add GET request with URL `http://localhost:5000/api/auth` to get the logged-in user. In this case, we have to pass the token in the Headers tab with key-value pair 'auth-token': _Token_String_.

> Read my blog related to this [User Auth](https://prachi824.hashnode.dev/user-authentication-and-authorization-using-npm-bcryptjs-jwt-and-mongodb-atlas)
