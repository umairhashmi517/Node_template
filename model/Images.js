const mongoose = require('mongoose');
// Create Product Schema
const imageSchema = new mongoose.Schema(
  {
    name: [ String ],
    productId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'product'
    }  
  },
  { timestamps: true }
);
module.exports = mongoose.model('product', imageSchema);