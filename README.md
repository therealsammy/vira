# Vira - Premier Video Game Renting Service API

![Repo size](https://img.shields.io/github/repo-size/therealsammy/vira)
![ESLint style](https://img.shields.io/badge/ESLint-style%20guide-yellow?style=round-square)
![Latest commit](https://img.shields.io/github/last-commit/therealsammy/vira/main?style=round-square)

Vira is a robust backend solution constructed with Node.js and Express, designed specifically for video game rental services. Our API provides a seamless interface to manage users, games, rentals, and various other functionalities, streamlining the experience for both service providers and consumers.

## 📘 Table of Contents

-   [Introduction](#introduction)
-   [Features](#features)
-   [Authors](#authors)
-   [License](#license)
-   [Configuration Setup](#🛠-configuration-setup)
-   [Dependencies](#dependencies)
-   [Development Dependencies](#development-dependencies)
-   [Getting Started](#getting-started)
    -   [Installation](#installation)
    -   [Configuration](#configuration)
    -   [Running Tests](#running-tests)
-   [Models Documentation](#📚-documentation-for-models)

## 🌟 Introduction

Vira aims to offer a refined and efficient backend service catering specifically to the needs of video game renting platforms. It comes packed with features and utilities that simplify user and inventory management, ensuring a smooth and secure rental process from start to finish.

## 🚀 Features

-   User Management: Create, update, and manage user profiles effortlessly.
-   Game Inventory: Efficiently manage game availability and details.
-   Rental Management: Track and handle game rentals with ease.
-   Secure Authentication: Employing JWT and bcrypt for secure user authentication.

## 👥 Authors

-   **Nwangwu Chidera**
    -   📧 Email: nwangwupamela@gmail.com
-   **Samuel Ohiri**
    -   📧 Email: therealsammy18x@gmail.com

## 📄 License

Vira is open-sourced under the [MIT License](LICENSE), promoting the availability and dissemination of this valuable resource.

---

## 🛠 Configuration Setup

To ensure the secure and proper functioning of the Vira API, developers need to set up essential configuration settings, particularly private keys used in the system. Follow the instructions below to configure the required environment variables before running the application:

### Step 1: Review Configuration Variables

Refer to the `default.json` file located in the `config` folder to identify the environment variables needed for the application.

### Step 2: Set Up Environment Variables

You have two options to set up environment variables:

#### Option 1: Command Line Interface (CLI)

Use the appropriate command based on your operating system to set the environment variables. This approach is more secure as it does not involve writing the sensitive information to a file.

-   **For Windows:**

    ```sh
    set jwtPrivateKey=Your_jwtPrivateKey
    ```

-   **For Linux/Mac:**
    ```sh
    export jwtPrivateKey=Your_jwtPrivateKey
    ```

#### Option 2: Configuration File

Create or modify the `custom-environment-variables.json` in your `config` folder and securely set up your environment variables:

```json
{
    "jwtPrivateKey": "<Your_jwtPrivateKey>",
    "db": "<Your_MongoDB_Connection_String>"
}
```

### 📢 Important Note:

Whether you choose the CLI or the Configuration File approach, remember, leaving private keys exposed or unset could lead to severe security vulnerabilities. Always set your private keys securely and ensure they are not exposed or accessible to unauthorized individuals.

Ensure the `custom-environment-variables.json` file, if used, is added to your `.gitignore` to avoid committing sensitive information:

```gitignore
config/custom-environment-variables.json
```

### Further Steps:

After setting up the environment variables, continue with any additional setup or installation instructions as appropriate for your project.

By providing clear and secure setup instructions, developers can swiftly configure the required environment variables and get started with using or contributing to the API.

### 📢 Important Note:

Remember, leaving private keys exposed or unset could lead to severe security vulnerabilities. Always set your private keys securely and ensure they are not exposed or accessible to unauthorized individuals.

## 🛠 Dependencies

### Core Libraries

-   **bcrypt**: Secure password hashing.
-   **config**: Streamlined configuration management.
-   **express**: High-performance web application framework.
-   **express-async-errors**: Asynchronous error handling for Express.
-   **joi & related plugins**: Comprehensive input and password validation.
-   **jsonwebtoken**: Robust JWT generation and verification.
-   **lodash**: Extensive utility functions.
-   **mongoose**: Elegant MongoDB object modeling.
-   **winston & winston-mongodb**: Advanced logging with MongoDB transport.

### Installation

To install these dependencies, run:

```sh
npm install
```

## 🏗 Development Dependencies

-   **jest**: Modern testing framework.
-   **jshint**: Efficient code linting.
-   **supertest**: Making HTTP assertions easy during testing.

### Installation

To install development dependencies, run:

```sh
npm install --only=dev
```

## 🚀 Getting Started

### Installation

1. Clone this repository to your local machine.
    ```sh
    git clone https://github.com/therealsammy/vira.git
    ```
2. Navigate to the project directory and install the dependencies.
    ```sh
    npm install
    ```

### Configuration

-   Set up the required environment variables as per the provided configuration schema.
-   Configure the database connection settings to match your MongoDB setup.

### Running Tests

Execute tests with verbose output using the following command:

```sh
npm test
```

Jest will operate in watch mode, allowing for real-time feedback on test results.

It seems like you've shared quite a bit of code relating to your models. Do you need help documenting them? Here is how you can document the models you have shared, considering they are the core structure of your application.

---

## 📚 Documentation for Models

### 1. **Customer Model** (`customers.js`)

This model manages customer-related data.

-   **Schema:**

    -   `name`: String (min: 5, max: 50), required
    -   `phone`: String (min: 5, max: 50), required
    -   `isGold`: Boolean, default: false

-   **Validation:**
    -   Uses Joi for validating the provided customer data against the schema.

### 2. **Game Model** (`games.js`)

Manages game-related data, including title, genre, stock number, and rental rate.

-   **Schema:**

    -   `title`: String (min: 5, max: 255), required
    -   `genre`: genreSchema, required
    -   `numberInStock`: Number (min: 0, max: 255), required
    -   `dailyRentalRate`: Number (min: 0, max: 255), required

-   **Validation:**
    -   Uses Joi for validating the provided game data against the schema.

### 3. **Genre Model** (`genre.js`)

Responsible for managing game genre data.

-   **Schema:**

    -   `name`: String (min: 5, max: 50), required

-   **Validation:**
    -   Uses Joi for validating the provided genre data against the schema.

### 4. **Rental Model** (`rentals.js`)

Manages rental data, including the customer, game, dates, and rental fee.

-   **Schema:**

    -   `customer`: customerSchema, required
    -   `game`: gameSchema, required
    -   `dateOut`: Date, default: Date.now
    -   `dateReturned`: Date
    -   `rentalFee`: Number (min: 0)

-   **Validation:**
    -   Uses Joi for validating the provided rental data against the schema.

### 5. **User Model** (`user.js`)

This model is responsible for managing user-related data and authentication tokens.

-   **Schema:**

    -   `name`: String (min: 5, max: 50), required
    -   `email`: String (min: 5, max: 255), required, unique
    -   `password`: String (min: 5, max: 1024), required
    -   `isAdmin`: Boolean

-   **Validation:**
    -   Uses Joi and `joi-password-complexity` for validating the provided user data against the schema.
    -   The password must meet certain complexity requirements (at least 4 of the following): a minimum of 8 characters, at least one lowercase letter, one uppercase letter, one numeric character, and one special character.

### **Validation and Authentication**

Each model employs the Joi validation library to ensure data integrity. Specific requirements and constraints are defined within each model to validate incoming data. Additionally, the user model utilizes JSON Web Tokens (JWT) for user authentication, securing user data and sessions.

### **Utility Methods**

-   `userSchema.methods.generateAuthToken`: Generates an authentication token for the user.

---.

## Authentication Route Handler

This JavaScript file defines a route handler for authentication in a video game renting app backend.

### Table of Contents

-   [Introduction](#introduction)
-   [Route Handler](#route-handler)
-   [Validation Function](#validation-function)

### Introduction

This file focuses on the authentication route handler, responsible for handling user login requests and generating authentication tokens.

### Route Handler

The code implements an Express route handler for a POST request to the `/api/auth` URL. It performs the following actions:

-   Validates the request data (email and password) using Joi.
-   Checks if a user with the provided email exists.
-   Compares the provided password with the stored hashed password.
-   Generates and sends an authentication token if the email and password are valid.

#### Validation Function

The `validate` function validates the request object, ensuring it contains an email and password. It utilizes the Joi library to enforce specific validation rules for both email and password.

-   `email`: Validates as a string, min 5 characters, max 255 characters, required, and must be a valid email format.
-   `password`: Validates as a string, min 5 characters, max 255 characters, and required.

The function returns the validation result based on the defined schema.

---

**Note**: Always ensure to securely handle passwords, preferably by using strong encryption techniques.

## Customer Management Route Handler

This JavaScript file defines a route handler for managing customers in a video game renting app backend.

### Table of Contents

-   [Introduction](#introduction)
-   [Route Handler Functions](#route-handler-functions)

### Introduction

This file contains route handlers for basic customer management in the video game rental application. It includes functions to retrieve all customers, retrieve a specific customer, add a new customer, update an existing customer, and delete a customer.

### Route Handler Functions

#### Get All Customers

-   **Method**: GET
-   **Endpoint**: `/api/customers`
-   **Description**: Retrieves all customers sorted by name.

### Get a Customer by ID

-   **Method**: GET
-   **Endpoint**: `/api/customers/:id`
-   **Description**: Retrieves a customer by their unique ID.

### Add a New Customer

-   **Method**: POST
-   **Endpoint**: `/api/customers`
-   **Description**: Adds a new customer to the system.
-   **Request Body**:
    -   `name`: Name of the customer (required).
    -   `phone`: Phone number of the customer.
    -   `isGold`: Indicates if the customer is a Gold member.

### Update a Customer

-   **Method**: PUT
-   **Endpoint**: `/api/customers/:id`
-   **Description**: Updates an existing customer.
-   **Request Body**:
    -   `name`: Updated name of the customer (required).
    -   `phone`: Updated phone number of the customer.
    -   `isGold`: Updated status indicating if the customer is a Gold member.

### Delete a Customer

-   **Method**: DELETE
-   **Endpoint**: `/api/customers/:id`
-   **Description**: Removes a customer from the system.

---

**Note**: Ensure appropriate handling of customer data and error cases for a robust application.

## Game Management Route Handler

This JavaScript file defines a route handler for managing games in a video game renting app backend.

### Table of Contents

-   [Introduction](#introduction)
-   [Route Handler Functions](#route-handler-functions)

### Introduction

This file contains route handlers for basic game management in the video game rental application. It includes functions to retrieve all games, retrieve a specific game, add a new game, update an existing game, and delete a game.

### Route Handler Functions

#### Get All Games

-   **Method**: GET
-   **Endpoint**: `/api/games`
-   **Description**: Retrieves all games sorted by name.

#### Get a Game by ID

-   **Method**: GET
-   **Endpoint**: `/api/games/:id`
-   **Description**: Retrieves a game by its unique ID.

#### Add a New Game

-   **Method**: POST
-   **Endpoint**: `/api/games`
-   **Description**: Adds a new game to the system.
-   **Request Body**:
    -   `title`: Title of the game (required).
    -   `genreId`: ID of the genre associated with the game (required).
    -   `numberInStock`: Number of copies available in stock (required).
    -   `dailyRentalRate`: Daily rental rate of the game.

#### Update a Game

-   **Method**: PUT
-   **Endpoint**: `/api/games/:id`
-   **Description**: Updates an existing game.
-   **Request Body**:
    -   `title`: Updated title of the game (required).
    -   `genreId`: Updated ID of the genre associated with the game (required).
    -   `numberInStock`: Updated number of copies available in stock (required).
    -   `dailyRentalRate`: Updated daily rental rate of the game.

#### Delete a Game

-   **Method**: DELETE
-   **Endpoint**: `/api/games/:id`
-   **Description**: Removes a game from the system.

---

**Note**: Proper management of game information and error handling is crucial for a reliable application.

## Genre Management Route Handler

This JavaScript file defines a route handler for managing genres in a video game renting app backend.

### Table of Contents

-   [Introduction](#introduction)
-   [Route Handler Functions](#route-handler-functions)
-   [Middleware](#middleware)

### Introduction

This file contains route handlers for basic genre management in the video game rental application. It includes functions to retrieve all genres, retrieve a specific genre, add a new genre, update an existing genre, and delete a genre.

### Route Handler Functions

#### Get All Genres

-   **Method**: GET
-   **Endpoint**: `/api/genres`
-   **Description**: Retrieves all genres sorted by name.

### Get a Genre by ID

-   **Method**: GET
-   **Endpoint**: `/api/genres/:id`
-   **Description**: Retrieves a genre by its unique ID.

### Add a New Genre

-   **Method**: POST
-   **Endpoint**: `/api/genres`
-   **Description**: Adds a new genre to the system.
-   **Request Body**:
    -   `name`: Name of the genre (required).

### Update a Genre

-   **Method**: PUT
-   **Endpoint**: `/api/genres/:id`
-   **Description**: Updates an existing genre.
-   **Request Body**:
    -   `name`: Updated name of the genre (required).

### Delete a Genre

-   **Method**: DELETE
-   **Endpoint**: `/api/genres/:id`
-   **Description**: Removes a genre from the system.

## Middleware

### Authentication Middleware

-   **Function**: `auth`
-   **Description**: Ensures authentication before proceeding with specific operations.
-   **Usage**: Used for adding and updating genres.

### Admin Middleware

-   **Function**: `admin`
-   **Description**: Ensures the user has admin privileges before proceeding with specific operations.
-   **Usage**: Used for deleting genres.

---

**Note**: Proper management of genre information and ensuring authentication and authorization are vital for a secure and reliable application.

# Welcome Route Handler

This JavaScript file defines a route handler to welcome users to the video game renting app.

## Table of Contents

-   [Introduction](#introduction)
-   [Route Handler Function](#route-handler-function)

## Introduction

This file contains a simple route handler to welcome users to the video game renting app. It responds with a message to indicate successful API access.

## Route Handler Function

### Get Welcome Message

-   **Method**: GET
-   **Endpoint**: `/`
-   **Description**: Sends a welcome message to users accessing the API.
-   **Response**:
    -   A welcome message: "Welcome to Vira".

---

**Note**: This is a basic route handler to greet users. Additional functionalities and features can be added as needed.

# Rental Management Route Handler

This JavaScript file defines a route handler for managing rentals in a video game renting app backend.

## Table of Contents

-   [Introduction](#introduction)
-   [Route Handler Functions](#route-handler-functions)

## Introduction

This file contains route handlers for basic rental management in the video game rental application. It includes functions to retrieve all rentals, retrieve a specific rental, and add a new rental.

## Route Handler Functions

### Get All Rentals

-   **Method**: GET
-   **Endpoint**: `/api/rentals`
-   **Description**: Retrieves all rentals sorted by the date of rental.

### Get a Rental by ID

-   **Method**: GET
-   **Endpoint**: `/api/rentals/:id`
-   **Description**: Retrieves a rental by its unique ID.

### Add a New Rental

-   **Method**: POST
-   **Endpoint**: `/api/rentals`
-   **Description**: Adds a new rental to the system.
-   **Request Body**:
    -   `customerId`: ID of the customer associated with the rental (required).
    -   `gameId`: ID of the game associated with the rental (required).

---

**Note**: Proper management of rental information, validation, and stock handling is crucial for a reliable application.

# User Management Route Handler

This JavaScript file defines a route handler for managing users in a video game renting app backend.

## Table of Contents

-   [Introduction](#introduction)
-   [Route Handler Functions](#route-handler-functions)
-   [Middleware](#middleware)

## Introduction

This file contains route handlers for user management in the video game rental application. It includes functions to retrieve the current user and add a new user.

## Route Handler Functions

### Get Current User

-   **Method**: GET
-   **Endpoint**: `/api/users/me`
-   **Description**: Retrieves the current authenticated user.

### Add a New User

-   **Method**: POST
-   **Endpoint**: `/api/users`
-   **Description**: Adds a new user to the system.
-   **Request Body**:
    -   `name`: Name of the user (required).
    -   `email`: Email of the user (required).
    -   `password`: Password for the user (required).

## Middleware

### Authentication Middleware

-   **Function**: `auth`
-   **Description**: Ensures authentication before proceeding with specific operations.
-   **Usage**: Used for getting the current user.

---

**Note**: Proper management of user information, authentication, and error handling is crucial for a secure and reliable application.

# Admin Check Middleware

This JavaScript function serves as middleware to check if a user has admin privileges.

## Introduction

This function is used as middleware in the video game rental application to ensure that a user has the necessary administrative permissions before allowing access to certain functionalities.

## Usage

-   **Function**: `admin`
-   **Description**: Checks if the user has admin privileges.
-   **Return Value**: If the user is an admin, the middleware calls `next()` to proceed. If not, it sends a "403 Forbidden" response with an "Access Denied" message.

### Example Usage

````javascript
const admin = require('../middleware/admin');

router.delete('/:id', [auth, admin], async (req, res) => {
    // ...
});

# Asynchronous Middleware Wrapper

This JavaScript function serves as a wrapper to handle asynchronous middleware functions.

## Introduction

This function acts as a middleware wrapper in the video game rental application to handle asynchronous middleware functions gracefully.

## Usage

- **Function**: `asyncMiddleware`
- **Description**: Wraps an asynchronous middleware function and handles any errors that may occur during its execution.
- **Return Value**: An asynchronous middleware function that can be used in route handlers.

### Example Usage

```javascript
const asyncMiddleware = require('../middleware/asyncMiddleware');

router.get('/', asyncMiddleware(async (req, res) => {
    // ...
}));```
# Authentication Middleware (JWT)

This JavaScript function serves as middleware to authenticate users using JSON Web Tokens (JWT).

## Introduction

This function is used as middleware in the video game rental application to authenticate and authorize users. It verifies the provided JWT to grant access to protected routes.

## Usage

- **Function**: `auth`
- **Description**: Verifies the JWT in the request header and extracts the user information.
- **Return Value**: If the token is valid, it sets `req.user` with decoded user information and calls `next()` to proceed. If not, it sends a "400 Bad Request" response with an "Invalid token" message.

### Example Usage

```javascript
const auth = require('../middleware/auth');

router.get('/protected', auth, (req, res) => {
    // ...
});```

### Error Handling Middleware

This JavaScript function serves as middleware to handle and log errors using Winston.

### Introduction

This function is used as middleware in the video game rental application to handle errors gracefully and log them for further analysis and debugging.

#### Usage

- **Function**: `error`
- **Description**: Logs the error using Winston and sends a "500 Internal Server Error" response to the client.
- **Parameters**:
  - `err`: The error object.
  - `req`: The request object.
  - `res`: The response object.
  - `next`: The next middleware function in the request-response cycle.

### Example Usage

```javascript
const errorMiddleware = require('../middleware/error');

app.use(errorMiddleware);```


## MongoDB ObjectID Validation Middleware

This JavaScript function serves as middleware to validate MongoDB ObjectIDs.

### Introduction

This function is used as middleware in the video game rental application to ensure that the provided ID is a valid MongoDB ObjectID.

### Usage

- **Function**: `validateObjectId`
- **Description**: Validates if the provided ID is a valid MongoDB ObjectID.
- **Parameters**:
  - `req`: The request object.
  - `res`: The response object.
  - `next`: The next middleware function in the request-response cycle.

#### Example Usage

```javascript
const validateObjectId = require('../middleware/validateObjectId');

router.get('/:id', validateObjectId, (req, res) => {
    // ...
});```



**Thank you so much  for considering Vira! We are excited to see the amazing projects you will build with it.**
````
