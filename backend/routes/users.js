const express = require("express")
const bcrypt = require("bcrypt")
const UserModel = require("../models/users")
const routes = express.Router()

//Create a new User
// http://localhost:3000/api/v1/user/signup
routes.post('/signup', async (req, res) => {
    const userData = req.body
    console.log(userData)
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        // Create a new user instance
        const user = new UserModel({
            ...userData,
            password: hashedPassword
        })
        // Save the user to MongoDB
        const newUser = await user.save()
        res.status(201).json({ 
            message: "User created successfully.", 
            user_id: newUser._id
        });
    } catch (err) {
        res.status(500).json({message: err.message})
    } 
})

//Log into existing User
// http://localhost:3000/api/v1/user/login
routes.post('/login', async (req, res) => {
    const {username, password} = req.body
    try {
        const user = await UserModel.findOne({ username })
        if(!user) {
            return res.status(404).json({ message: "No user with that username"})
        }

        const matchPassword = await bcrypt.compare(password, user.password)
        if(!matchPassword) {
            return res.status(400).json({ message: "Invalid Password."})
        }

        res.status(200).json({ message: "Login successful." })
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

module.exports = routes