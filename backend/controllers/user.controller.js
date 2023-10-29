import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
    res.json({
        message: 'API is working!',
    });
}

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
