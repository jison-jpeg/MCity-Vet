import Appointment from "../models/appointment.model.js";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";

export const test = (req, res) => {
  res.json({
    message: "API is working!",
  });
};

// Get All Appointments
export const getAllAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find();

    if (appointments.length === 0) {
      return res.status(200).json({ message: "No appointments found." });
    }

    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};


// Get Appointment by ID
export const getAppointmentById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json(appointment);
  } catch (error) {
    next(error);
  }
};

// Get All Appointments Stats
export const getAppointmentStats = async (req, res, next) => {
  try {
      const totalAppointments = await Appointment.countDocuments();
      const rescheduledAppointments = await Appointment.countDocuments({ status: 'Rescheduled' });
      const approvedAppointments = await Appointment.countDocuments({ status: 'Approved' });

      // Calculate total pending appointments including rescheduled and approved
      const pendingAppointments = totalAppointments - rescheduledAppointments - approvedAppointments;

      const completeAppointments = await Appointment.countDocuments({ status: 'Completed' });

      res.status(200).json({
          totalAppointments,
          pendingAppointments,
          completeAppointments,
      });
  } catch (error) {
      next(error);
  }
};


// Get Appointments by User
export const getAppointmentsByUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Find all appointments created by the specified user
    const appointments = await Appointment.find({ createdBy: id });

    if (appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found for this user." });
    }

    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

// Get Appointments by Technician
export const getAppointmentsByTechnician = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Find all appointments assigned to the specified technician
    const appointments = await Appointment.find({ technicianName: id });

    if (appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found for this technician." });
    }

    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};


// Create Appointment
export const createAppointment = async (req, res, next) => {
  try {
    const { schedule, technicianName, firstName, lastName, phone, email, services, address, landmark, patient, } = req.body;

    const createdByUserId = req.user.id;

    // Check if the technician is available
    const technician = await User.findById(technicianName);
    if (!technician) {
      return res.status(404).json({ message: 'Technician not found.' });
    }

    if (!technician.availability) {
      return res.status(400).json({ message: 'Technician is not available for appointments.' });
    }

    // Check if the schedule is available for scheduling
    const existingAppointment = await Appointment.findOne({ technicianName, schedule });
    if (existingAppointment) {
      return res.status(400).json({ message: 'Appointment slot is already booked.' });
    }

    // Create a new appointment instance, including the patient object
    const newAppointment = await Appointment.create({
      technicianName,
      schedule,
      firstName,
      lastName,
      phone,
      email,
      address,
      landmark,
      services,
      patient,
      createdBy: createdByUserId,
    });

    const appointmentId = newAppointment._id;

    res.status(201).json({
      ...newAppointment.toObject(),
      appointmentId, // Include the appointmentId in the response
  });

  // Create notification for the user who initiated the action (patient)
  await Notification.create({
      userId: createdByUserId,
      message: 'Appointment created successfully!',
      type: 'success',
      appointmentId,
  });

  // If targetUserId is provided, create notification for the target user (e.g., technician)
  await Notification.create({
      userId: technician._id,
      message: `New appointment scheduled by ${firstName} ${lastName}`,
      type: 'info',
      appointmentId,
  });
  
} catch (error) {
  next(error);
}
};


// Update Appointment
export const updateAppointment = async (req, res, next) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const { status } = req.body;

    // Check if the appointment status is changing to 'Cancelled'
    if (status === 'Cancelled' && appointment.status !== 'Cancelled') {
      // Notify the customer that their appointment is cancelled
      await Notification.create({
        userId: appointment.createdBy,
        message: 'Your appointment has been cancelled.',
        type: 'error', // You can use 'error' or 'info' based on your preference
        appointmentId: id,
      });

      // Notify the technician about the cancellation
      await Notification.create({
        userId: appointment.technicianName,
        message: `Your Appointment from ${appointment.firstName} ${appointment.lastName} has been cancelled.`,
        type: 'warning', // You can use 'error' or 'info' based on your preference
        appointmentId: id,
      });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      {
        $set: {
          ...req.body,
          patient: req.body.patients,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedAppointment);
  } catch (error) {
    next(error);
  }
};



// Archive Appointment
export const archiveAppointment = async (req, res, next) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      {
        $set: {
          archive: !appointment.archive, // Toggle the archive status
        },
      },
      { new: true }
    );

    res.status(200).json(updatedAppointment);
  } catch (error) {
    next(error);
  }
};

// Delete Appointment
export const deleteAppointment = async (req, res, next) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json(appointment);
  } catch (error) {
    next(error);
  }
};

// Check if the technician is available for the specified schedule
export const checkAvailability = async (req, res, next) => {
  const { technicianName, schedule } = req.body;

  try {
    if (!technicianName || !schedule) {
      return res.status(400).json({ message: 'TechnicianName and schedule are required query parameters.' });
    }

    // Check if the technician is available
    const technician = await User.findOne({ _id: technicianName, availability: true });
    if (!technician) {
      return res.status(400).json({ message: 'Technician is not available for appointments.' });
    }

    // Check if the schedule is available for scheduling
    const existingAppointment = await Appointment.findOne({ technicianName, schedule });
    if (existingAppointment) {
      return res.status(400).json({ message: 'Appointment slot is already booked.' });
    }

    res.status(200).json({ message: 'Technician is available for the specified schedule.' });
  } catch (error) {
    next(error);
  }
};
