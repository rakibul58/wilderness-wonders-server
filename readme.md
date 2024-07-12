# Wilderness Wonders

[Live URL](https://wilderness-wonders-server.vercel.app/)

## Introduction

Welcome to Wilderness Wonders – Your ultimate backend solution for a seamless camping gear shopping experience.

## Project Description

Wilderness Wonders is a comprehensive backend project designed to manage the operations of a camping gear shop. The primary purpose of this project is to provide robust, scalable, and efficient backend support for managing product listings, order placement, and inventory. Our goal is to ensure smooth and enjoyable shopping experience, while the shop management is equipped with the necessary tools to keep operations running efficiently.

## Features

- Product Management: Add, update, delete, and view products.
- Inventory Management: Track stock levels and manage inventory.
- Order Management: Process customer orders and handle order status updates.
- Search and Filter: Advanced search and filter options for products.

## Technology Stack

- Node.js: JavaScript runtime for building the server.
- Express.js: Web framework for Node.js to create API endpoints.
- MongoDB: NoSQL database for storing product, order, and customer data.
- Mongoose: ODM for MongoDB to manage data models.
- dotenv: Module for loading environment variables.
- typescript: For Development

## Installation Guideline

Instructions on how to install, configure, and get the project running locally.

### Prerequisites

- Node.js and npm (Node Package Manager) installed.
- Git installed for cloning the repository.

### Installation Steps

1. Clone the repo.

   ```bash
   https://github.com/rakibul58/wilderness-wonders-server-batch-3-assignment-04.git
   ```

2. Install node_module.

   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the root directory of the project.

2. Add necessary configuration variables in the `.env` file.

   Example:
   ```bash
   NODE_ENV=development
   PORT=5000
   DATABASE_URL=
   ```

### Usage
1. Start the Server.

   ```bash
   npm start
   ```

2. API Endpoints:

- Product Endpoints:
  - GET /products: Retrieve all products.
  - POST /products: Add a new product.
  - GET /products/:id: Retrieve a specific product.
  - PUT /products/:id: Update a product.
  - DELETE /products/:id: Delete a product.
  - POST /products/checkout: Checkout a from cart.

3. Example Request:

   To add a new product, send a POST request to /products with the following JSON body:
   ```
   {
    "name": "Osprey Atmos AG 65",
    "description": "Anti-Gravity suspension system, adjustable harness and hipbelt, multiple pockets and compartments, hydration reservoir sleeve, removable top lid.",
    "price": 14.99,
    "stock": 180,
    "category": "Backpack",
    "thumbnail": ""
   }
   ```

## Author

Muhammed Rakibul Hasan
