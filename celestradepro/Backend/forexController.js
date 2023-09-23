// Node.js controller code
const Forex = require('./forexModel');

exports.getAllForexs = (req, res) => {
  Forex.find({}, (err, forexs) => {
    if (err) {
      res.send(err);
    }
    res.json(forexs);
  });
};
exports.createForex = (req, res) => {
  const newForex = new Forex(req.body);
  newForex.save((err, forex) => {
    if (err) {
      res.send(err);
    }
    res.json(forex);
  });
};