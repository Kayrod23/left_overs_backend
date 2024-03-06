const express = require("express");
const cors = require("cors");
const app = express();
const users = require("./Controllers/usersController.js");
const inventory = require("./Controllers/inventoryController.js");
const recipes = require("./Controllers/recipesController.js");

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to left Overs Backend');
})

app.use("/users", users);
app.use("/inventory", inventory);
app.use("/recipes", recipes);

app.get("*", (req, res) => {
    res.status(404).json({error: "Not Found!"});
});

var pg = require('pg');

var connection = pg.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});

connection.end();

module.exports = app;
