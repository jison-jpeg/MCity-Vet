import Inventory from "../models/inventory.model.js";
import User from "../models/user.model.js";

export const test = (req, res) => {
    res.json({
      message: "API is working!",
    });
  };


export const getAllInventories = async (req, res, next) => {
    try {
        const inventories = await Inventory.find();
        res.status(200),json(inventories);
    } catch (error) {
        next(error);
    }
}

export const getInventoryById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const inventory = await Inventory.findById(id);
        if (!inventory) {
            return res.status(404).json({message: "Inventory not found"});
        }

        res.status(200).json(inventory);
    } catch (error) {
        next(error);
    }
};

export const getInventoriesByUser = async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const inventories = await Inventory.find({addedBy: id});

        if(inventories.length === 0) {
            return res.status(404).json({ message: "No inventories found for this user."})
        }
        res.status(200).json(inventories);
    } catch (error) {
        next(error);
    }
};

export const getInventoriesByTechnician = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      // Find all inventory assigned to the specified technician
      const inventories = await Inventory.find({ addedBy: id });
  
      if (inventories.length === 0) {
        return res.status(404).json({ message: "No inventories found for this technician." });
      }
  
      res.status(200).json(inventories);
    } catch (error) {
      next(error);
    }
  };

 
export const createInventory = async (req, res, next) => {
  try {
    const { itemName, category, quantity } = req.body;

    const addedByUserId = req.user.id; // Assuming you have user authentication

    // Create a new inventory instance
    const newInventory = new Inventory({
      itemName,
      category,
      quantity,
      addedBy: addedByUserId,
    });

    // Save the new inventory item to the database
    await newInventory.save();

    res.status(201).json(newInventory);
  } catch (error) {
    next(error);
  }
};

export const updateInventory = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const inventory = await Inventory.findById(id);
      if (!inventory) {
        return res.status(404).json({ message: "Inventory item not found" });
      }
  
      // Extract updated fields from the request body
      const { itemName, category, quantity } = req.body;
  
      // Update the inventory item
      inventory.itemName = itemName || inventory.itemName;
      inventory.category = category || inventory.category;
      inventory.quantity = quantity || inventory.quantity;
      inventory.updatedBy = req.user.id; // Assuming you have user authentication
  
      // Save the updated inventory item to the database
      const updatedInventory = await inventory.save();
  
      res.status(200).json(updatedInventory);
    } catch (error) {
      next(error);
    }
  };

export const deleteInventory = async (req, res, next) => {
  const { id } = req.params;

  try {
    const inventory = await Inventory.findByIdAndDelete(id);
    if (!inventory) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    res.status(200).json(inventory);
  } catch (error) {
    next(error);
  }
};
