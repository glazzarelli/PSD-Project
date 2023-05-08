const service = require('../services/quoteidService.js');

module.exports.getQuoteById = function getQuoteById(req, res) {
    service.getQuoteById(req, res);
}

