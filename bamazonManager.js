var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",

    password: "Houdini1!",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if(err) throw err;
    showMenu();
});

function showMenu() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add New Product"],
        }
    ]).then(function(answer) {
        switch (answer.choice) {
            case "View Products":
                showProduct();
                break;
            case "View Low Inventory":
                lowProduct();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addProduct();
                break;
        }
    })
};


function showProduct() {
    connection.query("SELECT * FROM products ORDER BY department_name", function(err, res) {
        if(err) throw (err);
        console.table(res);
        goOn();
    });
};

function lowProduct() {
    connection.query("SELECT * FROM products WHERE stock_quantity <= 4", function(err, res) {
        if(err) throw(err);
        console.table(res);
        goOn();
    });     
};

function addInventory() {
    inquirer.prompt([
        {
            type: "input",
            name: "product",
            message: "What is the id of the product you would like to add to?"
        },
        {
            type: "input",
            name: "qty",
            message: "How many units would you like to add?"
        }
    ]).then(function(answer) {

       connection.query("SELECT * FROM products WHERE ?", {item_id: answer.product}, function(err, res) {
            if (err) throw err;
            var amount = parseInt(res[0].stock_quantity) + parseInt(answer.qty);
            connection.query("UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: amount
                },
                {
                    item_id: answer.product
                }
            ],
            function(err) {
                if(err) throw(err);
                console.log("Product inventory has been updated.");
                goOn();
            }
            ) 
        });
        
    });
};

function addProduct() {
    connection.query("SELECT * FROM departments", function(err, res) {
        if(err) throw err;

    inquirer.prompt([
        {
            name: "product",
            type: "input",
            message: "What product would you like to add to the inventory?"
        },
        {
            name: "department",
            type: "list",
            message: "Which department would you like to add this product to?",
            choices: function() {
                var deptArray = [];
                for(var i = 0; i < res.length; i++) {
                    deptArray.push(res[i].department_name);
                }
                return deptArray;
            }
        },
        {
            name: "qty",
            type: "input",
            message: "How many would you like to add?",
            validate: function(val) {
                if(isNaN(val) === false) {
                    return true;
                }
                console.log("Please enter a valid number.")
            }
        },
        {
            name: "price",
            type: "input",
            message: "How much does this product cost?",
            validate: function(val) {
                if(isNaN(val) === false) {
                    return true;
                }
                console.log("Please enter a valid number.");
            }
        }
    ]).then(function(answer) {
        connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: answer.product,
                department_name: answer.department,
                price: answer.price,
                stock_quantity: answer.qty,
                product_sales: 0
            },
            function(err) {
                if(err) throw(err);
                console.log("Your product has been added to the inventory.")

                goOn();
            }
        );
    });
})};

function goOn() {
    inquirer.prompt([
        {
            name: "continue",
            type: "list",
            message: "Would you like to select something else?",
            choices: ["Yes", "No"],
        }
    ]).then(function(answer) {
        if(answer.continue === "Yes") {
            showMenu();
        } else {
            connection.end();
        }
    })
};