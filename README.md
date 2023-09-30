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

## 🛠 Configuration Setup

To ensure the secure and proper functioning of the Vira API, developers need to set up essential configuration settings, particularly private keys used in the system. Follow the instructions below to configure the required environment variables before running the application:

### Step 1: Create Environment File

Create a `.env` file in the root directory of your project to securely store your environment variables.

### Step 2: Set Up Environment Variables

Add the following variables to your `.env` file:

```env
jwtPrivateKey=<Your_jwtPrivateKey>
db=<Your_MongoDB_Connection_String>
```

-   `jwtPrivateKey`: A secure and strong key used for signing and verifying JWT tokens, essential for user authentication and security.
-   `db`: Your MongoDB connection string to establish a connection to your database.

Here is an example of how your `.env` file might look:

```env
jwtPrivateKey=SuperSecureKey123!
db=mongodb://127.0.0.1:27017/vira
```

### Step 3: Secure Your .env File

Add your `.env` file to your `.gitignore` to ensure it is not committed to your repository, protecting sensitive information from exposure:

```gitignore
.env
```

### Step 4: Load Environment Variables

Use a package like `dotenv` to load the environment variables from your `.env` file into your Node application. Install it using npm:

```sh
npm install dotenv
```

In your application, load the environment variables as early as possible (e.g., at the top of your entry file):

```javascript
require("dotenv").config();
```

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

**Thank you for considering Vira! We are excited to see the amazing projects you will build with it.**
