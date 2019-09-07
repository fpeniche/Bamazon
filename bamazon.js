// dependencies for inquirer and mysql npm packages
var inquirer = require("inquirer");
var mysql = require("mysql");
var connection=mysql.createConnection({
    host:"localhost",
    port:"8889",
    user:"root",
    password:"root",
    database:"BAMAZON"
});

connection.connect(function(error){
    if(error)
    {
        console.log(error);
    }
    else
    {
        //here is where we can write our query to connec to DB
        readBamazon(); 
    }
})

function readBamazon()
        {
        //"query" is a method that takes as first argument the DB query and 2nd argument a callback function that takes an error and a result as arguments
        connection.query("SELECT * FROM PRODUCTS", function(error,res){
            if(error)
            {
                console.log(error);
            }
            else
            {
                for (var i=0;i<res.length;i++)
                {
                    console.log("Item ID: ",res[i].ITEM_ID);
                    console.log("Product Name: ",res[i].PRODUCT_NAME);
                    console.log("Deparment Name: ",res[i].DEPARTMENT_NAME);
                    console.log("Price: ",res[i].PRICE);
                    console.log("Stock Quantity: ",res[i].STOCK_QTY);
                    console.log("---------");
                }
            }
        }) 
        }