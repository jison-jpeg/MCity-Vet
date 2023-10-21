import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'technician', 'secretary', 'customer'],
        default: 'customer'
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
