import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    middleName: {
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
    phone: {
        type: String,
    },
    address: {
        type: String,    },
    gender: {
        type: String,
    },
    birthdate: {
        type: String,    },
    profilePicture: {
        type: String,
        default: 'https://cdn.stealthoptional.com/images/ncavvykf/stealth/f60441357c6c210401a1285553f0dcecc4c4489e-564x564.jpg?w=564&h=564&auto=format'
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
