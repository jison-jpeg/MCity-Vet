import express from 'express';

import {
    test,
    getAllNotifications,
    getNotificationsByUser,
    getNotificationById,
    createNotification,
    updateNotification,
    deleteNotification,
    deleteAllNotifications,

} from '../controllers/notification.controller.js';

const router = express.Router();

router.get('/', test);
router.get('/all', getAllNotifications);
router.get('/:id', getNotificationById);
router.get('/:id/notifications', getNotificationsByUser);
router.post('/create', createNotification);
router.put('/update/:id', updateNotification);
router.delete('/delete/:id', deleteNotification);
router.delete('/delete/all', deleteAllNotifications);

export default router;
