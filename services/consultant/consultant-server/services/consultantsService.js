const fs = require('fs');
const path = require('path');

module.exports.funcconsultants = function funcconsultants(req, res) {
    const requestedZone = req.query.zone;

    let availableConsultants = [];

    try {
        // parse the consultants.json "database" file
        let consultants = JSON.parse(fs.readFileSync(path.join(__dirname, '../consultants.json'), 'utf8'));

        for (let consultant of consultants) {
            if (consultant.city == requestedZone) {
                availableConsultants.push(consultant);
            }
        }

        if (availableConsultants.length > 0) {
            res.send({
                consultantsResponse: "The following consultants are available",
                availableConsultants: availableConsultants,
            });
            return;
        }

        // should be res.status(404) but if we put it this way, camunda process will fail
        res.send({
            consultantsResponse: "No consultants available"
        });

    } catch (e) {
        // should be res.status(500) but if we put it this way, camunda process will fail
        res.send({ 
            message: "An error occurred while processing your request"
        });
    }
}
