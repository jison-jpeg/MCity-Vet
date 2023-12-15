import express from 'express';

import {
    test,
    getAllMedicalRecords,
    getMedicalRecordById,
    getMedicalRecordsByUser,
    createMedicalRecord,
    updateMedicalRecord,
    archiveMedicalRecord,
    requestCreateMedicalRecord,

} from '../controllers/medicalrecord.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', test);
router.get('/all', verifyToken, getAllMedicalRecords);
router.get('/:id', verifyToken, getMedicalRecordById);
router.get('/:id/medical-record', verifyToken, getMedicalRecordsByUser);
router.post('/create', verifyToken, createMedicalRecord);
router.put('/update/:id', verifyToken, updateMedicalRecord);
router.put('/archive/:id', verifyToken, archiveMedicalRecord);
router.put('/request/:id', verifyToken, requestCreateMedicalRecord);



export default router;