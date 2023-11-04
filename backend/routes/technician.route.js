import express from 'express';

import {
  test,
  getTechnicians,
  getRoleStatistics,
  
} from '../controllers/technician.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', test);
router.get('/all', getTechnicians);
router.get('/role-stats', getRoleStatistics);


export default router;