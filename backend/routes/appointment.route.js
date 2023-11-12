import express from 'express';

import {
    test,
    getAllAppointments,
    getAppointmentStats,
    createAppointment,
    deleteAppointment,
    getAppointmentById,
    getAppointmentsByTechnician,
    getAppointmentsByUser ,
    updateAppointment,

} from '../controllers/appointment.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', test);
router.get('/all', verifyToken, getAllAppointments);
router.get('/stats', verifyToken, getAppointmentStats);
router.get('/:id', verifyToken, getAppointmentById);
router.get('/technician/:id', verifyToken, getAppointmentsByTechnician);
router.get('/:id/appointments', verifyToken, getAppointmentsByUser);
router.post('/create', verifyToken, createAppointment);
router.put('/update/:id', verifyToken, updateAppointment);
router.delete('/delete/:id', verifyToken, deleteAppointment);

export default router;