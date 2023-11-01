import Patient from '../models/patient.model.js';

export const test = (req, res) => {
    res.json({
        message: 'API is working!',
    });
}

// Get All Patients

export const getAllPatients = async (req, res, next) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        next(error);
    }
};

// Add Patient

export const createPatient = async (req, res, next) => {
    const { type, headCount, age, services, address, landmark } = req.body;

    try {
        const patient = await Patient.create({
            type,
            headCount,
            age,
            services,
            address,
            landmark,
        });

        res.status(201).json(patient);
    } catch (error) {
        next(error);
    }
};

// Delete Patient

export const deletePatient = async (req, res, next) => {
    const { id } = req.params;

    try {
        const patient = await Patient.findByIdAndDelete(id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.status(200).json(patient);
    } catch (error) {
        next(error);
    }
};
