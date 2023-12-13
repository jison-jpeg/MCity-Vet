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
    type: String,
  },
  dateUpdated: {
    type: String,
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

// Pre-save middleware to format createdAt before saving the document
inventorySchema.pre('save', function (next) {
  // Format the date as needed, for example: MM-DD-YYYY
  const currentDate = new Date().toLocaleDateString();
  this.dateAdded = currentDate;
  this.dateUpdated = currentDate;
  next();
});


const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;
