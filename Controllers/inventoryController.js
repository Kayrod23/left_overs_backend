const express = require("express");
const inventory = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

inventory.get("/", async (req, res) => {
    const fullInventory = await prisma.inventory.findMany();
    if (fullInventory[0]) {
        res.status(200).json(fullInventory);
    } else {
        res.status(500).json({ error: "Empty Inventory"})
    }
})

inventory.get("/", async (req, res) => {
    const { id } = req.params;
    const item = await prisma.inventory.findFirst({
        where: {
            id: parseInt(id),
        }
    });
    if (item) {
        res.status(200).status(item);
    } else {
        res.status(500).json({ error: "User Not Found!"})
    }
})

inventory.post("/", async (req, res) => {
    try {
        const newItem = await prisma.inventory.create({
            data: {
                item: req.body.item,
                userId: req.body.userId,
            }
        });
        res.status(200).json(newItem);
    } catch (error) {
        res.status(400).json({ error: error});
    }
})

module.exports = inventory;