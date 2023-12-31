const express = require("express");
const cors = require("cors");
const app = express();
const users = require("./Controllers/usersController.js");
const inventory = require("./Controllers/inventoryController.js")

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to left Overs');
})

app.use("/users", users);
app.use("/inventory", inventory);

app.get("*", (req, res) => {
    res.status(404).json({error: "Not Found!"});
});

module.exports = app;
