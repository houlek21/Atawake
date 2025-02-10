-- Create the database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS mydatabase;
USE mydatabase;

-- Create the user (if it doesn't exist)
CREATE USER IF NOT EXISTS 'test'@'%' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON mydatabase.* TO 'test'@'%';
FLUSH PRIVILEGES;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample users
INSERT INTO users (first_name, last_name, email, phone, address) VALUES
('Alice', 'Johnson', 'alice@example.com', '123-456-7890', '123 Main St, Springfield'),
('Bob', 'Smith', 'bob@example.com', '987-654-3210', '456 Elm St, Metropolis'),
('Charlie', 'Brown', 'charlie@example.com', '555-123-4567', '789 Oak St, Gotham'),
('David', 'White', 'david@example.com', '111-222-3333', '321 Maple St, Star City'),
('Eve', 'Black', 'eve@example.com', '999-888-7777', '654 Birch St, Central City');
