DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	item_id INTEGER(10) auto_increment NOT NULL,
    product_name VARCHAR(15),
    department_name VARCHAR(15),
    price INTEGER(10),
    stock_quantity INTEGER(10),
    primary key(item_id)
    );

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Nalgene Bottle", "Sports", 14.99, 50),
("MacBook", "Electronics", 1299.99, 8),
("Keurig", "Kitchen", 150.00, 25),
("Coffee Mug", "Kitchen", 2.99, 100),
("'The Beatles' LP", "Music", 49.99, 15),
("Lagunitas IPA (6-pack)", "Drinks", 10.99, 150),
("Camping Tent", "Outdoors", 39.99, 20),
("Shirt", "Clothes", 19.99, 40);


SELECT * FROM products;