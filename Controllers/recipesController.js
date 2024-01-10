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

recipe.get("/:id", async (req, res) => {
    const { id } = req.params;
    const recipe = await prisma.recipe.findFirst({
        where: {
            id: parseInt(id),
        }
    });
    if (recipe) {
        res.status(200).status(recipe);
    } else {
        res.status(500).json({ error: "Recipe NOt Found!" })
    }
})

