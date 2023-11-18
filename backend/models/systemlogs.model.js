import mongoose from "mongoose";

const systemlogsSchema = new mongoose.Schema({

    accountId: {
        type: String,
        // required: true,
    },
    name: {
        type: String,
        // required: true,
    },
    role: {
        type: String,
        // required: true,
    },
    dateTime: {
        type: Date,
        // required: true,
    },
    activity: {
        type: String,
        // required: true,
    },
});

const Systemlogs = mongoose.model('Systemlogs', systemlogsSchema);

export default Systemlogs;