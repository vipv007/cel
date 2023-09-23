// Node.js controller code
const stock = require('./stockModel');

exports.getAllStocks = (req, res) => {
  stock.find({}, (err, stocks) => {
    if (err) {
      res.send(err);
    }
    res.json(stocks);
  });
};
exports.createStock = (req, res) => {
  const newstock = new stock(req.body);
  newstock.save((err, stock) => {
    if (err) {
      res.send(err);
    }
    res.json(stock);
  });
};