import MedicalRecord from "../models/medicalrecord.model.js";

export const test = (req, res) => {
    res.json({
        message: "API is working!",
    });
};

// Get All Medical Records
export const getAllMedicalRecords = async (req, res, next) => {
    try {
        const medicalRecords = await MedicalRecord.find();
        res.status(200).json(medicalRecords);
    } catch (error) {
        next(error);
    }
}

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
        // Find all medical records created by the specified user
        const medicalRecords = await MedicalRecord.find({ createdBy: id });

        if (medicalRecords.length === 0) {
            return res.status(404).json({ message: "No medical records found for this user." });
        }

        res.status(200).json(medicalRecords);
    } catch (error) {
        next(error);
    }
}

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
        medicalRecord.createdBy = createdBy;

        await medicalRecord.save();

        res.status(200).json(medicalRecord);
    } catch (error) {
        next(error);
    }
}

// Delete Medical Record