var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  displayStock();
});

function displayStock() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.table(res);
    idPrompt(res);
  });
}

function idPrompt(stock) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "itemID",
        message: "Enter the ID of any item you wish to buy: ",
        validate: function(val) {
            return !isNaN(val);
        }
      }
    ])
    .then(function(val) {
      var choiceId = parseInt(val.itemID);
      var product = checkInventory(choiceId, stock);

      if (product) {
        quantityPrompt(product);
      }
      else {
        console.log("\nThat item is not in the inventory.");
        displayStock();
      }
    });
}

function quantityPrompt(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like?",
        validate: function(val) {
          return val > 0;
        }
      }
    ])
    .then(function(val) {
      var quantity = parseInt(val.quantity);

      if (quantity > product.stock_quantity) {
        console.log("\nInsufficient quantity!");
        displayStock();
      }
      else {
        purchaseItem(product, quantity);
      }
    });
}

function purchaseItem(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],

    function(err, res) {
      console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
      displayStock();
    }
  );
}

function checkInventory(itemID, stock) {
  for (var i = 0; i < stock.length; i++) {
    if (stock[i].item_id === itemID) {
      return stock[i];
    }
  }
  return null;
}

