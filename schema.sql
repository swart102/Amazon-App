DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Red Dead Redemption 2", "Video Games", 59.99, 150),
  ("Soul Caliber VI", "Video Games", 59.99, 200),
  ("Call of Duty: Black Ops 4", "Video Games", 59.99, 250),
  ("Assassin's Creed Odyssey", "Video Games", 59.99, 105),
  ("Xbox One", "Video Game Console", 249.99, 50),
  ("PS4", "Video Game Console", 299.99, 50),
  ("Oculus Rift", "Video Game Console", 499.99, 60),
  ("Nintendo Switch", "Video Game Console", 299.99, 40),
  ("HTC Vive", "Video Game Console", 599.99, 60);
