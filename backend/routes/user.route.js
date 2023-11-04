import express from 'express';
import {
  test,
  updateUser,
  createUser,
  getAllUsers,
  deleteUser,
  // getRoleStatistics,
  // getTechnicians,
  getAppointmentsByUser,
  
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', test);
router.get('/all', verifyToken, getAllUsers);
// router.get('/role-stats', getRoleStatistics);
router.get('/:id/appointments', verifyToken, getAppointmentsByUser);
router.post('/create', verifyToken, createUser);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);

export default router;