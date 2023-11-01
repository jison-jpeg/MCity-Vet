const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  category: String,
  quantity: {
    type: Number,
    default: 0,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
