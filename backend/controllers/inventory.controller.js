import Inventory from "../models/inventory.model.js";

// Test
export const test = (req, res) => {
    res.json({
        message: "API is working!",
    });
};

// Get All Inventory
export const getAllInventory = async (req, res) => {
    try {
        const inventory = await Inventory.find();
        
        if (inventory.length === 0) {
            res.status(404).json({ message: "No Inventory" });
        } else {
            res.json(inventory);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Get Inventory by ID
export const getInventoryById = async (req, res) => {
    try {
        const inventoryItem = await Inventory.findById(req.params.id);
        if (inventoryItem) {
            res.json(inventoryItem);
        } else {
            res.status(404).json({ message: "Inventory item not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Add Inventory
export const addInventory = async (req, res) => {
    const { itemName, description, category, quantity } = req.body;
    const addedBy = req.user.id;

    try {
        // Check if the item with the same itemName already exists
        const existingItem = await Inventory.findOne({ itemName });

        if (existingItem) {
            return res.status(400).json({ message: "Item with the same name already exists" });
        }

        const newInventoryItem = new Inventory({
            itemName,
            description,
            category,
            quantity,
            addedBy,
        });

        const savedInventoryItem = await newInventoryItem.save();
        res.status(201).json(savedInventoryItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update Inventory
export const updateInventory = async (req, res) => {
    const { itemName, description, category, quantity } = req.body;
    const updatedBy = req.user.id;

    try {
        // Check if the item with the same itemName already exists
        const existingItem = await Inventory.findOne({ itemName, _id: { $ne: req.params.id } });

        if (existingItem) {
            return res.status(400).json({ message: "Item with the same name already exists" });
        }

        const updatedInventoryItem = await Inventory.findByIdAndUpdate(
            req.params.id,
            {
                itemName,
                description,
                category,
                quantity,
                updatedBy,
                dateUpdated: Date.now(),
            },
            { new: true }
        );

        if (updatedInventoryItem) {
            res.json(updatedInventoryItem);
        } else {
            res.status(404).json({ message: "Inventory item not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



// Delete Inventory
export const deleteInventory = async (req, res) => {
    try {
        const deletedInventoryItem = await Inventory.findByIdAndDelete(req.params.id);
        if (deletedInventoryItem) {
            res.json({ message: "Inventory item deleted" });
        } else {
            res.status(404).json({ message: "Inventory item not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};