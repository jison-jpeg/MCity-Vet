import express from 'express';
import {
  test,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
  getRoleStatistics,
  getAppointmentsByUser,
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/all', verifyToken, getAllUsers);
router.get('/role-stats', verifyToken, getRoleStatistics);
router.get('/:id/appointments', verifyToken, getAppointmentsByUser);
router.get('/:id', verifyToken, getUserById);

router.get('/', test);
router.post('/create', verifyToken, createUser);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);

export default router;
