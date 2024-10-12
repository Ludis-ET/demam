
# Bella Cosmotics Shop Website

This project is a full-stack application for a gift shop that offers products like skincare, hair products, makeup, and more. The website allows clients to browse products and place orders, while the shop owner (admin) can manage products and view orders through an admin dashboard.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Design](#system-design)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Future Enhancements](#future-enhancements)

## Features

### Client (User)
- Browse and view products.
- Place orders for selected products.
- View their order history.

### Admin (Shop Owner)
- Add, update, and remove products.
- View orders placed by users.
- Manage product inventory.

## Tech Stack

- **Frontend**: React, TailwindCSS, Shadecn (for styling)
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Version Control**: Git, GitHub

## System Design

The project is structured to have separate sections for clients and the admin. 

- **User Flow**: Users can browse products, add them to their cart, and place an order after logging in.
- **Admin Flow**: Admin can log into a dashboard where they can manage products and view user orders.

### Backend
- **Models**: User, Product, Order
- **Routes**: Authentication, Product Management, Order Management
- **Controllers**: Handles the logic for each route, interacting with MongoDB through Mongoose.

### Frontend
- **Components**: Separate components for listing products, order forms, admin dashboard, etc.
- **State Management**: Redux is used for managing the state of products, orders, and user authentication.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/firaolteshale21/Bella-Cosmo
   cd Bella-Cosmo

Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the `backend` folder and add the following:

```
PORT=5000
MONGO_URI=<Your MongoDB URI>
JWT_SECRET=<Your JWT Secret>
```

Run the Backend:

```bash
npm start
```

## Frontend Setup

Navigate to the frontend directory:

```bash
cd ../frontend
```

Install dependencies:

```bash
npm install
```

Run the Frontend:

```bash
npm start
```
## API Endpoints

### User Routes

- **POST** `/api/users/register` - Register a new user
- **POST** `/api/users/login` - Login and get a JWT token

### Product Routes

- **GET** `/api/products` - Get all products
- **GET** `/api/products/:id` - Get a single product by ID
- **POST** `/api/products` - Create a new product (requires authentication)
- **PUT** `/api/products/:id` - Update an existing product (requires authentication)
- **DELETE** `/api/products/:id` - Delete a product (requires authentication)

### Cart Routes

- **POST** `/api/cart` - Add a product to the cart (requires authentication)
- **GET** `/api/cart` - Get the current user's cart (requires authentication)
- **DELETE** `/api/cart/:id` - Remove a product from the cart (requires authentication)

### Order Routes

- **POST** `/api/orders` - Place an order (requires authentication)
- **GET** `/api/orders` - Get all orders (requires authentication)
- **GET** `/api/orders/:id` - Get a single order by ID (requires authentication)

## Future Enhancements

- Add payment gateway integration.
- Implement search and filter options for products.
- Add product reviews and ratings.
- Implement email notifications for order confirmations.

## License

This project is open-source and available under the MIT License.
