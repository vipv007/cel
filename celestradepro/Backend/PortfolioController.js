// Node.js controller code
const Portfolio = require('./PortfolioModel');

exports.getAllPortfolio= (req, res) => {
  Portfolio.find({}, (err, portfolio) => {
    if (err) {
      res.send(err);
    }
    res.json(portfolio);
  });
};
