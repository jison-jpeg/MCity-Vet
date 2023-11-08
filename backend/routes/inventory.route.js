import express from 'express';
import{
    test,
    getAllInventories,
    getInventoryById,
    getInventoriesByUser,
    getInventoriesByTechnician,
    createInventory,
    updateInventory,
    deleteInventory,
} from '../controllers/inventory.controller';
import { verifyToken } from '../utils/verifyUser';


const router = express.Router();

router.get('/', test);
router.get('/all', verifyToken, getAllInventories);
router.get('/:id', verifyToken, getInventoryById);
router.get('/technician/:id', verifyToken, getInventoriesByUser);
router.get('/:id/appointments', verifyToken, getInventoriesByTechnician);
router.post('/create', verifyToken, createInventory);
router.put('/update/:id', verifyToken, updateInventory);
router.delete('/delete/:id', verifyToken, deleteInventory);

export default router;