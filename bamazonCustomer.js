require("dotenv").config();
var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 8889,
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}\n-------`);
    displayTable();
})

function displayTable() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log("------------");

        askQuestion();
    })
}

function updateProduct(data, remainingStock) {
    if (remainingStock > 0) {
        var query = connection.query(
            "UPDATE products SET ? WHERE ?",
            [{
                    StockQuantity: remainingStock
                },
                {
                    ItemID: data[0].ItemID
                }
            ],
            function (err, res) {
                if (err) throw err;
                console.log(data[0].ProductName + " products have been updated!\n");
            }
        );

    } else {
        var query = connection.query(
            "UPDATE products SET ? WHERE ?",
            [{
                    StockQuantity: remainingStock
                },
                {
                    ItemID: data[0].ItemID
                }
            ],
            function (err, res) {
                if (err) throw err;
                console.log("No more products in stock! Come back later!\n");
            }
        );
    }
}

function askQuestion() {
    inquirer.prompt({
        name: "ItemID",
        type: "input",
        message: "Which product ID item would you like to buy?",
        validate: function (value) {
            if (value > 0 && value <= 11) {
                return true;
            }
            return "Please select an ItemID between 1-10!";
        }
    }).then(function (result) {
        connection.query("SELECT ItemID, ProductName, DepartmentName, Price FROM products WHERE ?", {
            ItemID: result.ItemID
        }, function (err, res) {
            if (err) throw err;

            console.log("You've selected... || Product Name: " + res[0].ProductName + "\n");

            inquirer.prompt({
                name: "productID",
                type: "input",
                message: "How many product items would you like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return "Please input a number!";
                }
            }).then(function (result2) {
                
                connection.query("SELECT * from products WHERE ?", [
                    {
                        ItemID: result.ItemID
                    }
                ], function(err, data) {
                    if (err) throw err;

                    var itemPrice = data[0].Price;
                    var totalCost = parseInt(result2.productID) * itemPrice;

                    var remainingStock = parseInt(data[0].StockQuantity) - parseInt(result2.productID);

                    console.log("------------");
                    updateProduct(data, remainingStock);

                    console.log("Order Summary:\n\n" + "Total Cost: $" + totalCost.toFixed(2) + "\nRemaining Stock: " + remainingStock);
                    
                    displayTable();
                
                })
            
            });
        })
    });
}