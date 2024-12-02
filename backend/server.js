const express = require('express')
const usersRoutes = require('./routes/users')
const employeesRoutes = require('./routes/employees')
const mongoose = require("mongoose")
const app = express()

const SERVER_PORT = 3000
const DB_CONNECTION_STRING = "mongodb+srv://nicholas:admin@free-cluster.okjmx.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority&appName=Free-Cluster"
mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log("Error: ", err)
})

app.use(express.json())
app.use(express.urlencoded())

app.use("/api/v1/emp", employeesRoutes)
app.use("/api/v1/user", usersRoutes)

app.get('/', (req, res) => {
    res.send("<h1>Assignment 1</h1>")
}) 


app.listen(SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${SERVER_PORT}`)
})