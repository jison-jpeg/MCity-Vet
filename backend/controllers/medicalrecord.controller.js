import MedicalRecord from "../models/medicalrecord.model.js";
import Notification from "../models/notification.model.js";
import Appointment from "../models/appointment.model.js";
import User from "../models/user.model.js";

export const test = (req, res) => {
  res.json({
    message: "API is working!",
  });
};

// Get All Medical Records
export const getAllMedicalRecords = async (req, res, next) => {
  try {
    // Fetch all medical records and populate the related appointment details
    const medicalRecords = await MedicalRecord.find().populate({
      path: 'appointmentId',
      populate: {
        path: 'createdBy',
        select: 'firstName lastName',
      },
    });

    res.status(200).json(medicalRecords);
  } catch (error) {
    next(error);
  }
};


// Get Medical Record by ID
export const getMedicalRecordById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const medicalRecord = await MedicalRecord.findById(id);

    if (!medicalRecord) {
      return res.status(404).json({ message: "Medical Record not found" });
    }

    res.status(200).json(medicalRecord);
  } catch (error) {
    next(error);
  }
}

// Get Medical Records by User
export const getMedicalRecordsByUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Find all medical records with the specified user in the related appointment
    const medicalRecords = await MedicalRecord.find({}).populate({
      path: 'appointmentId',
      match: { createdBy: id }, // Filter appointments by user ID
      populate: {
        path: 'createdBy', // Populate the user details in the appointment
        select: 'firstName lastName',
      },
    });

    // Filter out the records where appointmentId is null (no match found)
    const filteredRecords = medicalRecords.filter(record => record.appointmentId);

    if (filteredRecords.length === 0) {
      return res.status(200).json({ message: "No medical records found for this user." });
    }

    res.status(200).json(filteredRecords);
  } catch (error) {
    next(error);
  }
};


// Create Medical Record
export const createMedicalRecord = async (req, res, next) => {
  const { appointmentId, patient, diagnosis, treatment, prescription, createdBy } = req.body;

  try {
    const medicalRecord = await MedicalRecord.create({
      appointmentId,
      diagnosis,
      treatment,
      prescription,
      createdAt: new Date().toLocaleDateString(),
    });


    res.status(201).json(medicalRecord);
  } catch (error) {
    next(error);
  }
}

// Request to create a Medical Record and Send Notification
export const requestCreateMedicalRecord = async (req, res, next) => {
  const { id } = req.params;  // Assuming id corresponds to the appointmentId

  try {
    // Fetch the related appointment to get the technicianName
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const technicianUserId = appointment.technicianName;
    const adminUsers = await User.find({ role: 'admin' });
    const secretaryUsers = await User.find({ role: 'secretary' });

    // Create a notification for the technician
    await Notification.create({
      userId: technicianUserId,
      message: `A Customer requested a Medical Record for appointment ID: ${id}`,  // Using id from params
      type: 'info',
      appointmentId: id,  // Using id from params
    });
    
    // Create notifications for admin users
    for (const adminUser of adminUsers) {
      await Notification.create({
        userId: adminUser._id,
        message: `A Customer requested a Medical Record for appointment ID: ${id}`,
        type: 'info',
        appointmentId: id,
      });
    }

    // Create notifications for secretary users
    for (const secretaryUser of secretaryUsers) {
      await Notification.create({
        userId: secretaryUser._id,
        message: `A Customer requested a Medical Record for appointment ID: ${id}`,
        type: 'info',
        appointmentId: id,
      });
    }

    res.status(201).json({ message: 'Medical record request sent successfully!' });
  } catch (error) {
    console.error('Error notifying technician for medical record request:', error);
    next(error);
  }
};



// Update Medical Record
export const updateMedicalRecord = async (req, res, next) => {
  const { id } = req.params;
  const { appointmentId, diagnosis, treatment, prescription, createdBy } = req.body;

  try {
    const medicalRecord = await MedicalRecord.findById(id);

    if (!medicalRecord) {
      return res.status(404).json({ message: "Medical Record not found" });
    }

    medicalRecord.appointmentId = appointmentId;
    medicalRecord.diagnosis = diagnosis;
    medicalRecord.treatment = treatment;
    medicalRecord.prescription = prescription;
    // medicalRecord.createdBy = createdBy;

    await medicalRecord.save();

    res.status(200).json(medicalRecord);
  } catch (error) {
    next(error);
  }
}

// Archive Medical Record
export const archiveMedicalRecord = async (req, res, next) => {
  const { id } = req.params;

  try {
    const medicalRecord = await MedicalRecord.findById(id);
    if (!medicalRecord) {
      return res.status(404).json({ message: 'Medical Record not found' });
    }

    const updatedMedicalRecord = await MedicalRecord.findByIdAndUpdate(
      id,
      {
        $set: {
          archive: !medicalRecord.archive, // Toggle the archive status
        },
      },
      { new: true }
    );

    res.status(200).json(updatedMedicalRecord);
  } catch (error) {
    next(error);
  }
};

// Delete Medical Record
export const deleteMedicalRecord = async (req, res, next) => {
  const { id } = req.params;

  try {
    const medicalRecord = await MedicalRecord.findByIdAndDelete(id);
    if (!medicalRecord) {
      return res.status(404).json({ message: 'Medical Record not found' });
    }

    res.status(200).json(medicalRecord);
  } catch (error) {
    next(error);
  }
};