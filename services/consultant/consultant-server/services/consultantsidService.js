const fs = require('fs');
const path = require('path');


module.exports.funcconsultantsid = function funcconsultantsid(req, res) {
    // parse the consultants.json file
    let consultants = JSON.parse(fs.readFileSync(path.join(__dirname, '../consultants.json'), 'utf8'));

    // convert consultants object to array if it's not one
    if (!Array.isArray(consultants)) {
        consultants = Object.values(consultants);
    }

    try {
        // find the consultant with the provided email
        let consultant = consultants.find(css => css.email === req.params.id);

        if (consultant) {
            // if the consultant is found, send it
            res.send(consultant);
        } else {
            // if the consultant is not found, send a 404 status code with a message
            // should be res.status(400) but if we put it this way, camunda process will fail
            res.send({
                message: 'Consultant not found.'
            });
        }
    } catch (error) {
        // if there is an error, send a 500 status code with a message
        // should be res.status(500) but if we put it this way, camunda process will fail
        res.send({
            message: 'An error occurred while retrieving the consultant.'
        });
    }
}

