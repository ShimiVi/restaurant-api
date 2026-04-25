# RESTAURANT API 

REST API for a takeaway restaurant ordering system

## Tech Stack 

- Node.js
- Express
- PostgreSQL

## About

This project was built as a learning exercise to develop backend skills.
It demonstrates a real-world REST API with proper architecture,
database relationships, business logic, and error handling.

## Installation

1. Clone the repository
```bash
git clone https://github.com/ShimiVi/restaurant-api.git
cd restaurant-api
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=restaurant_db
DB_USER=your_username
DB_PASSWORD=your_password
```

4. Run database migrations
```bash
psql -U your_username -d restaurant_db -f database/migrations/001_initial_schema.sql
```

5. Start the server
```bash
node server.js
```

## Endpoints

### Categories
GET    /categories
GET    /categories/:id
POST   /categories
PUT    /categories/:id
DELETE /categories/:id

### Menu Items
GET    /menu-items
GET    /menu-items/:id
POST   /menu-items
PUT    /menu-items/:id
DELETE /menu-items/:id

### Customers
GET    /customers
GET    /customers/:id
POST   /customers
PUT    /customers/:id

### Orders
GET    /orders
GET    /orders/:id
POST   /orders
PUT    /orders/:id