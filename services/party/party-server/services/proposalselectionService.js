const fs = require('fs');
const path = require('path');

module.exports.funcproposalselection = function funcproposalselection(req, res) {
    const party = req.body;
    try {
        const organizedParties = JSON.parse(fs.readFileSync(path.join(__dirname, '../organized_parties.json'), 'utf8'));
        organizedParties.push(party);
        fs.writeFileSync(path.join(__dirname, '../organized_parties.json'), JSON.stringify(organizedParties), 'utf8');
        res.send({
            message: 'Party successfully organized.'
        });
    } catch (error) {
        // should be res.status(500) but if we put it this way, camunda process will fail
        res.send({
            message: 'An error occurred while organizing the party.'
        });
    }
}

