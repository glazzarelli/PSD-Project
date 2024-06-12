const fs = require('fs');
const path = require('path');

module.exports.funcbabysittersupdateavailabilities = function funcbabysittersupdateavailabilities(req, res) {
    // parse the babysitters.json file
    let babysitters = JSON.parse(fs.readFileSync(path.join(__dirname, '../babysitters.json'), 'utf8'));

    // convert babysitters object to array if it's not one
    if (!Array.isArray(babysitters)) {
        babysitters = Object.values(babysitters);
    }
    
    try {
        // find the babysitter with the provided email
        let babysitter = babysitters.find(bbs => bbs.email === req.body.email);

        if (babysitter) {
            // update the babysitter's availabilities
            babysitter.availabilities = req.body.availabilities;

            // write the updated babysitters array back to the file
            fs.writeFileSync(path.join(__dirname, '../babysitters.json'), JSON.stringify(babysitters), 'utf8');

            res.send({
                message: 'Babysitter availability updated successfully!'
            });
        } else {
            // should be res.status(404) but if we put it this way, camunda process will fail
            res.send({
                message: 'Babysitter not found.'
            });
        }
    } catch (error) {
        // should be res.status(500) but if we put it this way, camunda process will fail
        res.send({
            message: 'An error occurred while updating the babysitter availability.'
        });
    }
}
