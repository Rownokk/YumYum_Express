import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// Configure Passport
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/user/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const existingUser = await userModel.findOne({ email: profile.emails[0].value });
                if (existingUser) {
                    return done(null, existingUser);
                }

                const newUser = new userModel({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: bcrypt.hashSync(profile.id, 10),
                });

                await newUser.save();
                return done(null, newUser);
            } catch (error) {
                console.log(error);
                return done(error, false);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findById(id);
        done(null, user);
    } catch (error) {
        done(error, false);
    }
});

// Google Callback
const googleCallback = (req, res) => {
    const token = createToken(req.user._id);
    res.redirect(`http://localhost:5173/?token=${token}`);
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User Doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register User
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // Checking if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User Already Exists" });
        }

        // Validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email",
            });
        }

        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Please enter a strong password",
            });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { loginUser, registerUser, googleCallback };
