const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db.js");
const userRouter = require("./route/userRoute.js")

require('dotenv').config();


const app = express()
const port = 5000


// middleware

app.use(cors());
app.use(express.json());
// app.use(cors({ origin: process.env.FRONTEND_URL_HOST, credentials: true }));


app.use(express.urlencoded({ extended: true }));



// db connection 
connectDB();

// api endpoints

app.use("/users", userRouter)



app.get("/", (req, res)=> {
    res.send(" API Working ")
})



app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})

