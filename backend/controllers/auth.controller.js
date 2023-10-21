import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 12);
    const newUser = new User({ firstName, lastName, email, password: hashedPassword });
    try {
        await newUser.save()
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        next(error);
    }
};