CREATE DATABASE stock_system;

USE stock_system;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(255),
  role ENUM('admin','employee','accountant')
);

CREATE TABLE departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  item_name VARCHAR(100),
  quantity INT,
  description TEXT,
  priority VARCHAR(20),
  department_id INT,
  status VARCHAR(50) DEFAULT 'Pending',
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  request_id INT,
  receipt VARCHAR(255),
  payment_date DATE,
  FOREIGN KEY (request_id) REFERENCES requests(id) ON DELETE CASCADE
);