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

// Get Technician by ID
export const getTechnicianById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const technician = await User.findById(id);

        if (!technician) {
            return res.status(404).json({ message: "Technician not found" });
        }

        res.status(200).json(technician);
    } catch (error) {
        next(error);
    }
};

// Get Appointments by Technician
export const getAppointmentsForTechnician = async (req, res, next) => {
    const { id } = req.params;

    try {
        // Find all appointments created by the specified user
        const appointments = await Appointment.find({ technicianName: id });

        if (appointments.length === 0) {
            return res.status(404).json({ message: "No appointments found for this technician." });
        }

        res.status(200).json(appointments);
    } catch (error) {
        next(error);
    }
};

// Get All Appointments Stats by Technician
export const getAppointmentStatsForTechnician = async (req, res, next) => {
    const { id } = req.params;

    try {
        const totalAppointments = await Appointment.countDocuments({ technicianName: id });
        const pendingAppointments = await Appointment.countDocuments({
            technicianName: id,
            status: { $in: ['Pending', 'Rescheduled', 'Approved'] },
        });
        const completeAppointments = await Appointment.countDocuments({ technicianName: id, status: 'Completed' });

        res.status(200).json({
            totalAppointments,
            pendingAppointments,
            completeAppointments,
        });
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

// Check if the technician is available for the specified schedule
export const checkAvailability = async (req, res, next) => {
    const { date } = req.params; // Change here from req.query to req.params
  
    try {
      if (!date) {
        return res.status(400).json({ message: 'Date is a required query parameter.' });
      }
  
      const appointments = await Appointment.find({ schedule: { $regex: date } });
      const bookedTechnicians = new Set();
  
      appointments.forEach((appointment) => {
        const { technicianName, status } = appointment;
        if (status !== 'Cancelled' && status !== 'Completed') {
          bookedTechnicians.add(technicianName.toString());
        }
      });
  
      const allTechnicians = await User.find({ role: 'technician' });
  
      const availableTechnicians = allTechnicians.filter(
        (technician) => !bookedTechnicians.has(technician._id.toString()) && technician.availability
      );
  
      if (availableTechnicians.length > 0) {
        const availableTechnicianList = availableTechnicians.map((technician) => ({
          id: technician._id,
          name: `${technician.firstName} ${technician.lastName}`,
        }));
  
        return res.status(200).json(availableTechnicianList);
      } else {
        return res.status(200).json({ message: 'There is no available technician for this schedule.' });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
  

  
// Get availability by date
// export const getAvailabilityByDate = async (req, res, next) => {
//     const { date } = req.params; // Change here from req.query to req.params

//     try {
//         if (!date) {
//             return res.status(400).json({ message: 'Date is a required query parameter.' });
//         }

//         const appointments = await Appointment.find({ schedule: { $regex: date } });
//         const bookedTechnicians = new Set();

//         appointments.forEach((appointment) => {
//             const { technicianName, status } = appointment;
//             if (status !== 'Cancelled' && status !== 'Completed') {
//                 bookedTechnicians.add(technicianName.toString());
//             }
//         });

//         const allTechnicians = await User.find({ role: 'technician' });

//         const availableTechnicians = allTechnicians.filter(
//             (technician) => !bookedTechnicians.has(technician._id.toString())
//         );

//         if (availableTechnicians.length > 0) {
//             const availableTechnicianList = availableTechnicians.map((technician) => ({
//                 id: technician._id,
//                 name: `${technician.firstName} ${technician.lastName}`,
//             }));

//             return res.status(200).json(availableTechnicianList);
//         } else {
//             return res.status(200).json({ message: 'There is no available technician for this schedule.' });
//         }
//     } catch (error) {
//         console.error(error);
//         next(error);
//     }
// };
