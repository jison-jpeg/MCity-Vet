import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
    res.json({
        message: 'API is working!',
    });
}

// Get All Users
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};


// Get User Role Statistics
export const getRoleStatistics = async (req, res, next) => {
    try {
        const roleStatistics = await User.aggregate([
            { $group: { _id: '$role', count: { $sum: 1 } } },
        ]);

        const stats = {};
        roleStatistics.forEach((entry) => {
            stats[entry._id] = entry.count;
        });

        res.json(stats);
    } catch (error) {
        next(error);
    }
};

// Get All Technicians
export const getTechnicians = async (req, res, next) => {
    try {
        const technicians = await User.find({ role: 'technician' });
        res.status(200).json(technicians);
    } catch (error) {
        next(error);
    }
};

// Add User
export const createUser = async (req, res, next) => {
    const { firstName, lastName, email, password, middleName, role, address, gender, birthdate, phone } = req.body;

    try {
        // Check if the user with the provided email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcryptjs.hashSync(password, 12);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            middleName,
            role,
            address,
            gender,
            birthdate,
            phone,
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        next(error);
    }
};


// Update User
export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can update only your account!'));
    }
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 12);
        }
        const capitalizeAndTrim = (value) => {
            if (typeof value === 'string') {
                return value.trim().charAt(0).toUpperCase() + value.trim().slice(1);
            }
            return value;
        };

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    firstName: capitalizeAndTrim(req.body.firstName),
                    lastName: capitalizeAndTrim(req.body.lastName),
                    middleName: capitalizeAndTrim(req.body.middleName),
                    birthdate: req.body.birthdate,
                    address: req.body.address,
                    phone: req.body.phone,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                },
            },
            { new: true }
        );
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};
