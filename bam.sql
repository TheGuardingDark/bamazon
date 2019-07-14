DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
    item_id INT NOT NULL AUTO INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,4) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("wartenberg wheel", "velvet underground", 3.50, 50 ),
("violet wand", "velvet underground", 75.25, 5),
("duct tape", "velvet underground", 2.75, 25),
("ruler", "velvet underground", 3.25, 65),
("blindfold", "velvet underground", 4.50, 100),
("catcher in the rye", "books", 12.25, 6),
("lord of the flies", "books", 11.50, 20),
("pet sematary", "books", 5.25, 65),
("night watch", "books", 12.25, 40),
("the relic", "books", 4.25, 36);


USE bamazon_db;

CREATE TABLE departments (
    department_id INT NOT NULL AUTO INCREMENT,
    department_name VARCHAR(100) NULL,
    over_head_costs INT NUll,
);

ALTER TABLE products
ADD product_sales INT (10);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("velvet underground", 1000),
("books", 550);

-- show product_sales and match by department_name

SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales
FROM departments
INNER JOIN products ON departments.department_name=products.department_name;
