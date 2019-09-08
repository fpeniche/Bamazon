// dependencies for inquirer and mysql npm packages
var inquirer = require("inquirer");
function Product(prodId, stock) {
    this.prodId = prodId;
    this.stock = stock;
    // creates the printInfo method and applies it to all Product objects
    this.printInfo = function() {
      console.log("Product ID: " + this.prodId + "\nStock: " + this.stock);
    };
  }
var mysql = require("mysql");
var connection=mysql.createConnection({
    host:"localhost",
    port:"8889",
    user:"root",
    password:"root",
    database:"BAMAZON"
});

function buyProduct()
    {
           inquirer.prompt([
                    {
                    name: "productId",
                    message: "What is the product ID you want to buy?"
                    }, {
                    name: "units",
                    message: "How many units of the product you want to buy?"
                    }
                ]).then(function(answers) {
                    var newProductId = new Product(answers.productId);
                    var newUnits = new Product(answers.units);
                  //  var productId = (answers.productId);
                  //  var units = (answers.units);
                    newProductId.printInfo();
                    newUnits.printInfo();

                    }); 
                    
                connection.query("SELECT ITEM_ID, STOCK_QTY FROM PRODUCTS", function(error,res){
                if(error)
                {
                    console.log(error);
                }
                else
                {
                    var dbItemId = res[i].ITEM_ID;
                    var dbStockQty = res[i].STOCK_QTY;

                    if(dbItemId==productId)
                    {
                        if(dbStockQty - units>=0)
                        {
                            console.log("Your order has been placed!");
                            updateStock(dbItemId,dbStockQty);
                        }
                        else
                        {
                            console.log("Not enough stock on hand, your item will be backordered");
                        }
                    }
                }
            }) 
           
          }

function updateStock(dbItemId,dbStockQty)
          {
            var stkOnHand = dbStockQty - units;
              //here is where we can write our query to connec to DB
              //the placeholder(?) is used to avoid SQL injection and take the name value in the user input as value
              connection.query("UPDATE PRODUCTS SET STOCK_QTY=? WHERE ITEM_ID=?",[stkOnHand,dbItemId], function(error,res){
                  if(error)
                  {
                        console.log(error);
                  }
                  else
                  {
                        console.log("Item " +dbItemId+ "stock on hand is now = " +stkOnHand);
                  }
              })
          }

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


connection.connect(function(error){
    if(error)
    {
        console.log(error);
    }
    else
    {
        //here is where we can write our query to connec to DB
      //  readBamazon(); 
        buyProduct();

    }
})



