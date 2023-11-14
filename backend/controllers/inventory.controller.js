// Inventory controller

import Inventory from '../models/inventory.model.js';
import User from '../models/user.model.js';

export const test = (req, res) => {
    res.json({
        message: 'API is working!',
    });
}

// Get All Inventory
export const getAllInventory = async (req, res, next) => {
    try {
        const inventory = await Inventory.find();
        res.status(200).json(inventory);
    } catch (error) {
        next(error);
    }
};
