// Inventory Routes

import express from 'express';
import {
    test,
    getAllInventory,
    getInventoryById,
    addInventory,
    updateInventory,
    deleteInventory,
} from '../controllers/inventory.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', test);
router.get('/all', verifyToken, getAllInventory);
router.get('/:id', verifyToken, getInventoryById);
router.post('/add', verifyToken, addInventory);
router.put('/update/:id', verifyToken, updateInventory);
router.delete('/delete/:id', verifyToken, deleteInventory);

export default router;