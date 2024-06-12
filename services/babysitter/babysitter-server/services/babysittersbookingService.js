const fs = require('fs');
const path = require('path');

module.exports.funcbabysittersbooking = function funcbabysittersbooking(req, res) {
    const requestedDay = req.body.day;
    const intReqDay = parseInt(requestedDay);
    const chosenEmail = req.body.babysitter_chosen;

    let babysitters = JSON.parse(fs.readFileSync(path.join(__dirname, '../babysitters.json'), 'utf8'));

    // Convert babysitters object to array if it's not one
    if (!Array.isArray(babysitters)) {
        babysitters = Object.values(babysitters);
    }

    try {
        for (let bbs of babysitters) {
            if (bbs.email === chosenEmail) {
                let oldAvailabs = bbs.availabilities;
                let updatedDay = {
                    "day": requestedDay,
                    "is_available": "false"
                };

                oldAvailabs[intReqDay - 1] = updatedDay;

                fs.writeFileSync(path.join(__dirname, '../babysitters.json'), JSON.stringify(babysitters), 'utf8');

                // send a success message
                res.send({
                    message: 'Booking successful.'
                });
                return;
            }
        }

    } catch (e) {
        // if there is an error, send an error message
        // should be res.status(500) but if we put it this way, camunda process will fail
        res.send({
            message: 'An error occurred while booking the babysitter.'
        });
    }

    // should be res.status(404) but if we put it this way, camunda process will fail
    res.send({ 
        message: 'Babysitter not found.' 
    });
}

