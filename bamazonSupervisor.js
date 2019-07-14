var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",

    password: "********",
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
            name: "action",
            message: "What would you like to do?",
            choices: ["View Product Sales by Department", "Create New Department"]
        }
    ]).then(function(answer) {
        if(answer.action === "Create New Department") {
            createDep();
        } else {
            showSales();
        }
    });
};

function createDep() {
    inquirer.prompt([
        {
            type: "input",
            name: "dept",
            message: "What department would you like to add?"
        },
        {
            type: "input",
            name: "overhead",
            message: "What is this departments overhead?",
            validate: function(val) {
                if(isNaN(val) === false) {
                    return true;
                }
                console.log("Please enter a valid number.")
            }
        }
    ]).then(function(answer) {
        connection.query(
            "INSERT INTO departments SET ?",
            {
                department_name: answer.dept,
                over_head_costs: answer.overhead
            },
            function(err) {
                if(err) throw err;
                console.log("Department has been created.");

                goOn();
            }
        )
    });
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
            showMenu();
        } else {
            connection.end();
        }
    })
};

function showSales() {
    connection.query(
        "SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) - departments.over_head_costs AS total_profit FROM departments INNER JOIN products ON departments.department_name=products.department_name GROUP BY department_name",

            function(err, res) {
                if(err) throw err;
                console.table(res);
                goOn();
            }   
    )
}


