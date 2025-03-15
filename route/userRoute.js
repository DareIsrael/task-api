const express = require("express");
const { register, login, getUsers } = require("../controller/userController");
const { authMiddleware } = require("../middleware/authMiddleware")

const userRouter = express.Router();


userRouter.post("/register", register);


userRouter.post("/login", login);
userRouter.get("/getUsers", getUsers);

// authMiddleware, 
module.exports = userRouter;