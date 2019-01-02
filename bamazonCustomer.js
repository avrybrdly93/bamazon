const mysql = require('mysql');
const inquirer = require('inquirer');

let stockQuantityArr = [];
let stockPriceArr = [];
var connection = mysql.createConnection({
    host: "localhost",
    port:3306,
    user:"root",
    password:"root",
    database:"bamazon_db"
});

connection.connect();
 
connection.query('SELECT * FROM products', function (error, results) {
    if (error) throw error;
    for(let i = 0; i < results.length; i++) {
    console.log('The product id  is: ', results[i].item_id);
    console.log("The product name is: ", results[i].product_name);
    console.log('The product price is: ', results[i].price);
    console.log("The quantity left is: ", results[i].stock_quantity);
    console.log("\n-------------------------------------\n");
    stockQuantityArr.push(results[i].stock_quantity);
    stockPriceArr.push(results[i].price);
    }
    purchasePrompt();
});

function purchasePrompt() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the id of the item you would like to purchase?",
            name: "purchaseItem",
        },
        {
            type: "input",
            message: "How many units would you like to purchase?",
            name: "purchaseQuantity"
        }
    ]).then(function(response) {
        compareInventory(response.purchaseQuantity, stockQuantityArr[response.purchaseItem - 1], response.purchaseItem);
    });

}

function compareInventory(purchase, stock, id) {
    if(!stock) {
        console.log("Please select an item that is in stock.");
        setTimeout(() => {
            purchasePrompt();
        }, 1000);
    }
    else {
        if(purchase < 0) {
            console.log("Uh oh! We actually don't accept orders of negative quantities.");
            console.log("Try making another purchase.");
            setTimeout(() => {
                purchasePrompt();
            }, 2000);
        }
        else{
            if(purchase <= stock) {
                console.log("Checking stock...");
                updateInventory(purchase, stock, id);
            }
            else {
                console.log("Insufficient quantity!");
                console.log("Try making another purchase.");
                purchasePrompt();
            }
        }
    }
}

function updateInventory(purchase, stock, id) {
    updatedQuantity = stock - purchase;
    totalCost = stockPriceArr[id - 1] * purchase;
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: updatedQuantity
          },
          {
            item_id: id
          }
        ],
    function(error) {
        if (error) throw error;
        setTimeout(() => {
            console.log(`Your total is $${totalCost}. Thank you for shopping with bamazon!`);
        }, 2000);
    })
    connection.end();
}