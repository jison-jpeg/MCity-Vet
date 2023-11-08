import Appointment from "../models/appointment.model.js";
import User from "../models/user.model.js";

export const test = (req, res) => {
  res.json({
    message: "API is working!",
  });
};

// Get All Technicians
export const getTechnicians = async (req, res, next) => {
    try {
        const technicians = await User.find({ role: 'technician' });
        res.status(200).json(technicians);
    } catch (error) {
        next(error);
    }
};

// Get Appointments by Technician
export const getAppointmentsForTechnician = async (req, res, next) => {
  const technicianId = req.user.id; // Assuming you have the technician's ID in the request

  try {
    // Find all appointments assigned to the specified technician
    const appointments = await Appointment.find({ technicianName: technicianId });

    if (appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found for this technician." });
    }

    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};


// Get User Role Statistics
export const getRoleStatistics = async (req, res, next) => {
    try {
        const roleStatistics = await User.aggregate([
            { $group: { _id: '$role', count: { $sum: 1 } } },
        ]);

        const stats = {};
        roleStatistics.forEach((entry) => {
            stats[entry._id] = entry.count;
        });

        res.json(stats);
    } catch (error) {
        next(error);
    }
};

