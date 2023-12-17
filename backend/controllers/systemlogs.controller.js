import SystemLogs from '../models/systemlogs.model.js';

export const test = (req, res) => {
    res.json({
        message: "API is working!",
    });
}

// Get All System Logs
export const getAllSystemLogs = async (req, res) => {
    try {
        const systemLogs = await SystemLogs.find();

        if (systemLogs.length === 0) {
            res.status(404).json({ message: "No System Logs" });
        } else {
            res.json(systemLogs);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get System Logs by User ID
export const getSystemLogsByUserId = async (req, res) => {
    try {
        const systemLogs = await SystemLogs.find({ addedBy: req.params.id });

        if (systemLogs.length === 0) {
            res.status(404).json({ message: "No System Logs" });
        } else {
            res.json(systemLogs);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add System Logs
export const addSystemLog = async (req, res) => {
    // Extract data from the request body
    const { accountId, name, role, dateTime, activity } = req.body;

    try {
        // Create a new system log instance using the SystemLogs model
        const newSystemLog = new SystemLogs({
            accountId,
            name,
            role,
            dateTime,
            activity,
        });

        // Save the new system log to the database
        const savedSystemLog = await newSystemLog.save();

        // Respond with the saved system log
        res.status(201).json(savedSystemLog);
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: error.message });
    }
};