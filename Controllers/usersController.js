const express = require("express");
const users = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

users.get("/", async (req, res) => {
    const allUsers = await prisma.users.findMany();
    // console.log(allUsers);
    if (allUsers[0]) {
        res.status(200).json(allUsers);
    } else {
        res.status(500).json({ error: "Server Error"})
    }
})

users.get("/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const user = await prisma.users.findFirst({
        where: { id: parseInt(id) },
    });
    // console.log(user);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(500).json({ error: "User Not Found!"})
    }
})

users.post("/", async (req, res) => {
    try {
        const newUser = await prisma.users.create({
            data: {
                name: req.body.name,
                email: req.body.email,
            }
        });
        res.status(200).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error });
    }
})

users.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const isUser = await prisma.users.findUnique({
            where: { id: parseInt(id) },
        })
        if (!isUser) {
            console.log("User Not Found!");
            return;
        }
        const updateUser = await prisma.users.update({
            where: { id: parseInt(id) },
            data: {
                name: req.body.name,
                email: req.body.email,
            }
        });
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(400).json({ error: error });
    }
})

users.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await prisma.users.delete({
            where: { id: parseInt(id) }
        })
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(400).json({ error: error })
    }
})

module.exports = users;