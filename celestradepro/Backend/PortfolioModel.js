const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let portfolio = new Schema({
 
  ticker_symbols: {
    type: String
  },
  today_price: {
    type: String
  },
  quantity: {
    type: String
  },
  
  total_shares: {
    type: String
  },
  total_amount: {
    type: String
  },
  

  },
 {
  collection: 'portfolio'
})

module.exports = mongoose.model('portfolio', portfolio)
