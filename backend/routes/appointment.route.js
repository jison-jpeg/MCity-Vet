import express from 'express';

import {
    test,
    getAllAppointments,
    createAppointment,
    deleteAppointment,
    getAppointmentById,
    getAppointmentsByTechnician,
    getAppointmentsByUser ,

} from '../controllers/appointment.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', test);
router.get('/all', verifyToken, getAllAppointments);
router.get('/:id', verifyToken, getAppointmentById);
router.get('/technician/:id', verifyToken, getAppointmentsByTechnician);
router.get('/:id/appointments', verifyToken, getAppointmentsByUser);
router.post('/create', verifyToken, createAppointment);
router.delete('/delete/:id', verifyToken, deleteAppointment);

export default router;