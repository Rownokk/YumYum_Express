import express from "express";
import { loginUser, registerUser, googleCallback } from "../controllers/userController.js";
import passport from "passport";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

//FOR Google Auth Routes
userRouter.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

userRouter.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    googleCallback
);

export default userRouter;
