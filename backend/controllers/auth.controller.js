import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 12);
    const newUser = new User({ firstName, lastName, email, role: 'customer', password: hashedPassword });
    try {
        await newUser.save()
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, "User does not exist!"));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Invalid email or password!"));
        
        const token = jwt.sign({ id: validUser._id, role: validUser.role }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = validUser._doc;
        const expiryDate = new Date(Date.now() + 3600000);

        res
            .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
}

export const google = async (req, res, next) => {
    try {
        console.log(req)
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: hashedPassword, ...rest } = user._doc;
            const expiryDate = new Date(Date.now() + 3600000); // 1 hour
            res
                .cookie('access_token', token, {
                    httpOnly: true,
                    expires: expiryDate,
                })
                .status(200)
                .json(rest);
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
                const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
                const displayName = req.body.name.split(' '); // Split the name by space
                const firstName = displayName[0];
                const lastName = displayName[1] || '';
                const newUser = new User({
             
                // displayName: req.body.name,
                firstName, // Assign the first name
                lastName, // Assign the last name
                email: req.body.email,
                password: hashedPassword,
                profilePicture: req.body.photo,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: hashedPassword2, ...rest } = newUser._doc;
            const expiryDate = new Date(Date.now() + 3600000); // 1 hour
            res
                .cookie('access_token', token, {
                    httpOnly: true,
                    expires: expiryDate,
                })
                .status(200)
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};

export const refreshAccessToken = async (req, res, next) => {
    const refreshToken = req.body.refreshToken;

    try {
        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        // Check if the user associated with the refresh token exists
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        // Generate a new access token
        const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the new access token to the client
        res.status(200).json({ accessToken });
    } catch (error) {
        // Token verification failed or other errors
        return res.status(401).json({ message: 'Invalid refresh token' });
    }
};

export const signout = (req, res) => {
    const token = req.cookies.access_token;

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            // Token is invalid or expired
            res.status(401).json('Token is expired or invalid');
        } else {
            // Token is valid; clear the cookie
            res.clearCookie('access_token').status(200).json('Signout success!');
        }
    });
};