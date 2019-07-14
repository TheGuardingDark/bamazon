# BAMAZON
## homework node app using mysql databases
### node/mysql/inquirer

Notes For Running the App
==============================
*BAMAZON can currently only be run locally*

BAMAZON can be run in three different ways: Customer, Manager, and Supervisor.
All three can be run from node after installing inquirer, but require a connection to the mysql database.


APP FUNCTIONALITY
=====================

### Customer
--Running BAMAZON as a customer will print a table of all available products along with their price and quantity in stock. Inquirer will prompt the user to select which product they would like to purchase by ID number and the quantity they would like. If there are enough units of the product in stock, the order will go through, the database will be updated to show the new product quantity and product sales while the user will be shown their purchase total. If there are not enough units in stock, the customer will be informed and asked to modify their order.
![]()

### Manager
--Running BAMAZON as a manager will give you a list of options:
  --View Products: A table of all available products will appear with quantity, price, and product sales columns.
  --View Low Product Inventory: A table of any products whose inventory is under 5 units will be shown.
  --Add to Inventory: The user will be prompted to choose which product they would like to add and the quantity of the product.   The database will be updated to show the new product quantity
  --Add new product: The user will be prompted to input the name of the new product, the price, how many units, and which department it will be listed under from a menu of depaartments populated from the database. The new product will be added to the database and show up next time the product table is shown.
![]()

### Supervisor
--Running BAMAZON as a supervisor will give you two options:
  --View Product Sales by Department: A departments table will appear with columns for department overhead and total profit for each department pulled from the products database product sales.
  --Create new Department: User will be prompted to enter the new department name and overhead costs. The new department will be added to the database and available for the manager to add product to.
![]()

