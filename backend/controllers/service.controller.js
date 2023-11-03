import Service from "../models/service.model.js";

export const test = (req, res) => {
    res.json({
        message: "API is working!",
    });
    };

// Get All Services
export const getAllServices = async (req, res, next) => {
    try {
        const services = await Service.find({}, 'serviceType');
        res.status(200).json(services);
    } catch (error) {
        next(error);
    }
};

// Get Service by ID
export const getServiceById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const service = await Service.findById(id);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.status(200).json(service);
    } catch (error) {
        next(error);
    }
};

// Add Service
export const createService = async (req, res, next) => {
    const { serviceType, } = req.body;

    try {
        const newService = new Service({
            serviceType,
        });

        await newService.save();
        res.status(201).json({ message: "Service created successfully" });
    } catch (error) {
        next(error);
    }
};

// Update Service
export const updateService = async (req, res, next) => {
    const { id } = req.params;
    const { serviceType, } = req.body;

    try {
        const service = await Service.findById(id);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        service.serviceType = serviceType;

        await service.save();
        res.status(200).json({ message: "Service updated successfully" });
    } catch (error) {
        next(error);
    }
};

// Delete Service
export const deleteService = async (req, res, next) => {
    const { id } = req.params;

    try {
        const service = await Service.findById(id);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        await service.delete();
        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        next(error);
    }
};

