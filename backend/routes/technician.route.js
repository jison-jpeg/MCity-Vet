import express from 'express';

import {
  test,
  getTechnicians,
  getTechnicianById,
  getAppointmentStatsForTechnician,
  getAppointmentsForTechnician,
  getRoleStatistics,
  
} from '../controllers/technician.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', test);
router.get('/all', getTechnicians);
router.get('/:id/appointments', getAppointmentsForTechnician);
router.get('/:id/stats', getAppointmentStatsForTechnician);
router.get('/:id', getTechnicianById);
router.get('/role-stats', getRoleStatistics);


export default router;