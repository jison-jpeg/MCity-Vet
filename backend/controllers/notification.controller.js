import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";

export const test = (req, res) => {
    res.json({
        message: "API is working!",
    });
    }

// Get All Notifications
export const getAllNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json(notifications);
    } catch (error) {
        next(error);
    }
}

// Get All Notifications by User
export const getNotificationsByUser = async (req, res, next) => {
    const { id } = req.params;

    try {
        const notifications = await Notification.find({ userId: id });

        res.status(200).json(notifications);
    } catch (error) {
        next(error);
    }
}

// Get Notification by ID
export const getNotificationById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const notification = await Notification.findById(id);
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        res.status(200).json(notification);
    } catch (error) {
        next(error);
    }
}

// Create Notification
export const createNotification = async (req, res, next) => {
    const { userId, message, type, targetUserId, appointmentId  } = req.body;

    try {
        // Create notification for the user who initiated the action
        const notification = await Notification.create({
            userId,
            message,
            type,
            appointmentId,
        });

        // If targetUserId is provided, create notification for the target user (e.g., technician)
        if (targetUserId) {
            await Notification.create({
                userId: targetUserId,
                message,
                type,
                appointmentId,
            });
        }

        res.status(201).json(notification);
    } catch (error) {
        next(error);
    }
};

// Update Notification

export const updateNotification = async (req, res, next) => {
    const { id } = req.params;
    const { userId, message, type } = req.body;

    try {
        const notification = await Notification.findByIdAndUpdate(
            id,
            {
                userId,
                message,
                type,
            },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        res.status(200).json(notification);
    } catch (error) {
        next(error);
    }
}

// Delete Notification
export const deleteNotification = async (req, res, next) => {
    const { id } = req.params;

    try {
        const notification = await Notification.findByIdAndDelete(id);

        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
        next(error);
    }
}

// Delete All Notifications

export const deleteAllNotifications = async (req, res, next) => {
    try {
        await Notification.deleteMany();

        res.status(200).json({ message: "Notifications deleted successfully" });
    } catch (error) {
        next(error);
    }
}

// Mark Notification as Read
export const markNotificationAsRead = async (req, res, next) => {
    const { id } = req.params;

    try {
        const notification = await Notification.findByIdAndUpdate(
            id,
            { read: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        res.status(200).json(notification);
    } catch (error) {
        next(error);
    }
};

