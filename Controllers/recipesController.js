const express = require("express");
const recipe = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

recipe.get("/", async (req, res) => {
    const allRecipes = await prisma.recipes.findMany();
    if (allRecipes) {
        res.status(200).json(allRecipes);
    } else {
        res.status(500).json({ error : "Empty Recipe "})
    }
})

recipe.get("/:id", async (req, res) => {
    const { id } = req.params;
    const recipe = await prisma.recipes.findFirst({
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

recipe.post("/", async (req, res) => {
    try {
        const newRecipe = await prisma.recipes.create({
            data : {
                recipeName: req.body.item,
                recipeSteps: req.body.item,
                userId: req.body.userId,
            }
        })
        res.status(200).json(newRecipe);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}) 

recipe.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const isRecipe = await prisma.recipes.findUnique({
            where: { id: parseInt(id) },
        })
        if (!isRecipe) {
            console.log("Recipe Not Found!");
            return;
        }
        const updateRecipe = await prisma.recipes.update({
            where: { id: parseInt(id) },
            data: {
                recipeName: req.body.item,
                recipeSteps: req.body.item,
            }
        })
        res.status(200).json(updateRecipe);
    } catch (error) {
        res.status(400).json({ error: error });
    }
})

recipe.delete("/id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRecipe = await prisma.recipes.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json(deletedRecipe);
    } catch (error) {
        res.status(400).json({ error: error });
    }
})

module.exports = recipe;