import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  itemName: {
    type: String,
    unique: true,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  category: {
    type: String
  },
  quantity: {
    type: Number,
    default: 0,
  },
  dateAdded: {
    type: Date,
    default: Date.now(),
  },
  dateUpdated: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
        enum: ['In Stock', 'Out of Stock'],
        default: 'In Stock',
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;
