const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Stock = new Schema({

  Open: {
    type: Number
  },
  High: {
    type: Number
  },
  Low: {
    type: Number
  },
 
  Close: {
    type: Number
  },
  Volume: {
    type: Number
  },
  name:{
    type:String
  } 

},
 {
  collection: 'Stock'
})

module.exports = mongoose.model('Stock', Stock)
