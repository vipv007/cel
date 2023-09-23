const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let commoditys = new Schema({

  open: {
    type: Number
  },
  high: {
    type: Number
  },
  low: {
    type: Number
  },
 
  close: {
    type: Number
  },
  symbol: {
    type: String
  },
  ask:
  {
    type:Number
  } , 
  bid:
  {
    type:Number
  },
  change:
  {type:Number},

 changepercentage:
{type:Number}},
 {
  collection: 'commoditys'
})

module.exports = mongoose.model('commoditys', commoditys)
