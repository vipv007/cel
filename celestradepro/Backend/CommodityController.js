// Node.js controller code
const commodity = require('./CommodityModel');

exports.getCommodity = (req, res) => {
  commodity.find({}, (err, commodity) => {
    if (err) {
      res.send(err);
    }
    res.json(commodity);
  });
};
