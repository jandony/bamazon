DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  ItemID INT AUTO_INCREMENT NOT NULL,
  ProductName VARCHAR(100) NOT NULL,
  DepartmentName VARCHAR(100) NOT NULL,
  Price DECIMAL(10,2) DEFAULT 0.00 NOT NULL,
  StockQuantity INT DEFAULT 0 NOT NULL,
  PRIMARY KEY (ItemID)
);

INSERT INTO products (ProductName, DepartmentName, Price, StockQuantity)
VALUES ("Shoes", "Clothes", 19.99, 20),
("Apples", "Grocery", 2.99, 100),
("TV", "Electronics", 199.99, 50),
("Protein Bar", "Health", 2.99, 25),
("Kitchen Aid", "Kitchen", 99.99, 10),
("Beer", "Grocery", 9.99, 150),
("Gummy Bears", "Grocery", 1.99, 30),
("Pile of dirt", "Garden", 9.99, 50),
("Paint Brush", "Arts&Crafts", 4.99, 75),
("GoPro", "Electronics", 99.99, 5);

SELECT * FROM products;