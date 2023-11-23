import express from 'express';

import {
    test,
    getAllMedicalRecords,
    getMedicalRecordById,
    getMedicalRecordsByUser,
    createMedicalRecord,
    updateMedicalRecord,

} from '../controllers/medicalrecord.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', test);
router.get('/all', verifyToken, getAllMedicalRecords);
router.get('/:id', verifyToken, getMedicalRecordById);
router.get('/user/:id', verifyToken, getMedicalRecordsByUser);
router.post('/create', verifyToken, createMedicalRecord);
router.put('/update/:id', verifyToken, updateMedicalRecord);


export default router;