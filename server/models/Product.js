const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Post
let Product = new Schema({
  label: { 
    type: String 
  }, 
  img: {
      type: String
  }
},{
    collection: 'products'
});

module.exports = mongoose.model('Product', Product);