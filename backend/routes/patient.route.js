import express from 'express';
import {
    test,
    getAllPatients,
    createPatient,
    deletePatient,
    
} from '../controllers/patient.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', test);
router.get('/all', verifyToken, getAllPatients);
router.post('/create', verifyToken, createPatient);
router.delete('/delete/:id', verifyToken, deletePatient);

export default router;