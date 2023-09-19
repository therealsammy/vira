# Vira - Video Game Renting Service

Vira is a video game renting service backend built using Node.js and Express.

## Table of Contents

- [Introduction](#introduction)
- [Authors](#authors)
- [License](#license)
- [Dependencies](#dependencies)
- [Development Dependencies](#development-dependencies)
- [Installation](#installation)
- [Running Tests](#running-tests)

## Introduction

Vira is a backend service designed to facilitate video game rentals. It provides functionalities to manage users, games, rentals, and more.

## Authors

- Nwangwu Chidera
  - Email: nwangwupamela@gmail.com
- Samuel Ohiri
  - Email: therealsammy18x@gmail.com

## License

Vira is released under the [MIT License](LICENSE).

## Dependencies

Vira relies on the following external libraries:

- **bcrypt**: Password hashing library.
- **config**: Configuration management.
- **express**: Web application framework.
- **express-async-errors**: Handling asynchronous errors in Express.
- **joi**: Input validation.
- **joi-objectid**: Custom Joi object ID validation.
- **joi-password-complexity**: Password complexity validation.
- **jsonwebtoken**: JSON Web Token generation and verification.
- **lodash**: Utility functions.
- **mongoose**: MongoDB object modeling.
- **winston**: Logging library.
- **winston-mongodb**: MongoDB transport for Winston.

To install these dependencies, run:
npm install

## Development Dependencies

- **jest**: Testing framework.
- **jshint**: Code linting.
- **supertest**: HTTP assertions for testing.

To install development dependencies, run:
npm install --only=dev


## Installation

1. Clone this repository.
2. Install dependencies using npm:


## Running Tests

To run tests, use the following command:
npm test

This command will run Jest in watch mode with verbose output.



