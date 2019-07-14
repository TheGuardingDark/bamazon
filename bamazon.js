var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",

    password: "*******",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if(err) throw err;
    showProducts();
});


function showProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw (err);
        console.table(res);
    
    inquirer
        .prompt([
        {
            name: "choice",
            type: "input",
            message: "What is the item ID number of the product you wish to purchase?",
        },
        {
            name: "amount",
            type: "input",
            message: "How many units would you like to purchase?",
            validate: function(val) {
                if (isNaN(val) === false) {
                    return true;
                }
                return("Please enter a valid number");
            }
        }
        ]).then(function(answer) {
            connection.query(
                "SELECT * FROM products WHERE ?", {item_id: answer.choice}, function(err, res) {
                    if (err) throw err;
                    // console.log(res[0].stock_quantity);
                    if (parseInt(res[0].stock_quantity) >= (answer.amount)) {
                        var total = parseFloat(res[0].price) * (answer.amount);

                        console.log(`Your total is: $${total}`);

                            var amount = parseInt(res[0].stock_quantity) - answer.amount;

                            var sale = total + parseFloat(res[0].product_sales);

                            // console.log(sale);

                            updateStock(amount, answer.choice, sale);


                        } else {
                        console.log("We're sorry, we don't have that many in stock.");
                        goOn();
                    }

                })
            })
        })
    };



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
            showProducts();
        } else {
            connection.end();
        }
    })
};

function updateStock(amount, id, sales) {

    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
               stock_quantity: amount,
               product_sales: sales
            },
            {
                item_id: id
            }
        ],
        function(err) {
            if(err) throw err;

            console.log("Product quantity updated.");
            goOn();
        }
    )}