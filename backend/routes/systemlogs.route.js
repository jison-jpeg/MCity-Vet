import express from 'express';

import {
    test,
    getAllSystemLogs,
    addSystemLog,
} from '../controllers/systemlogs.controller.js';

const router = express.Router();

router.get('/', test);
router.get('/all', getAllSystemLogs);
router.post('/add', addSystemLog);

export default router;
