const service = require('../services/quoteService.js');

module.exports.submitRfQ = function submitRfQ(req, res) {
    service.submitRfQ(req, res);
}

