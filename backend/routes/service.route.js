import express from 'express';

import {
    test,
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
} from '../controllers/service.controller.js';

const router = express.Router();

router.get('/', test);
router.get('/all', getAllServices);
router.get('/:id', getServiceById);
router.post('/create', createService);
router.put('/update/:id', updateService);
router.delete('/delete/:id', deleteService);

export default router;