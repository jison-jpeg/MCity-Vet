// service.model.js
import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    serviceType: {
        type: String,
    },
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
