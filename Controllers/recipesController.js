const express = require("express");
const recipe = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

recipe.get("/", async (req, res) => {
    const allRecipes = await prisma.recipe.findMany();
    if (allRecipes) {
        res.status(200).json(allRecipes);
    } else {
        res.status(500).json({ error : "Empty Recipe "})
    }
})

