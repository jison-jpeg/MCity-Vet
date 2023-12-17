import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema({
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
    },
    diagnosis: {
        type: String,
    },
    treatment: {
        type: String,
    },
    prescription: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: String,
    },
    updatedAt: {
        type: String,
    },
    archive: {
        type: Boolean,
        default: false, // By default, a medical record is not archived
    },
});

// Pre-save middleware to format createdAt before saving the document
medicalRecordSchema.pre('save', function (next) {
    // Format the date as needed, for example: MM-DD-YYYY
    const currentDate = new Date().toLocaleDateString();
    this.createdAt = currentDate;
    this.updatedAt = currentDate;
    next();
});

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);

export default MedicalRecord;
