const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Post
let Photo = new Schema({
 
  name: { 
    type: String 
  },
  picture : { 
    type: String 
  } 

},{
    collection: 'photos'
});

module.exports = mongoose.model('Photo',  Photo  );