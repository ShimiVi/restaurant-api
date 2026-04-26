CREATE TYPE order_status as ENUM(
    'pending',
    'confirmed',
    'preparing',
    'ready',
    'completed',
    'cancelled'
); 

CREATE TABLE categories(
    id SERIAL PRIMARY KEY, 
    name varchar(100) NOT NULL, 
    description text
);

CREATE TABLE menu_items(
    id SERIAL PRIMARY KEY, 
    name varchar(100) NOT NULL, 
    price DECIMAL(10,2), 
    category_id INT REFERENCES categories(id),  
    is_available BOOLEAN DEFAULT true 
);

CREATE TABLE customers(
    id SERIAL PRIMARY KEY, 
    name varchar(100) NOT NULL,
    phone varchar(20) NOT NULL, 
    email varchar(255) UNIQUE
);

CREATE TABLE orders(
    id SERIAL PRIMARY KEY, 
    customer_id INT REFERENCES customers(id),
    status order_status NOT NULL DEFAULT 'pending', 
    created_at TIMESTAMP DEFAULT NOW()

);

CREATE TABLE order_items(
    id SERIAL PRIMARY KEY, 
    order_id INT REFERENCES orders(id), 
    menu_item_id INT REFERENCES menu_items(id), 
    quantity INT NOT NULL, 
    price DECIMAL (10,2) NOT NULL
);

CREATE TYPE user_role AS ENUM ('owner', 'manager', 'customer'); 

CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    name varchar(100) NOT NULL, 
    email varchar(255) UNIQUE NOT NULL, 
    password varchar(255) NOT NULL, 
    role user_role DEFAULT 'customer', 
    created_at TIMESTAMP DEFAULT NOW()
); 