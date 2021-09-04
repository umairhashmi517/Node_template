const mongoose = require('mongoose');
// Create Product Schema
const productSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    description: String,
    category: String,
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    }  
  },
  { timestamps: true }
);
module.exports = mongoose.model('product', productSchema);