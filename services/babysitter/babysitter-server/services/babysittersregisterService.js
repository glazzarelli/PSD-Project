const fs = require('fs');
const path = require('path');

module.exports.funcbabysittersregister = function funcregister(req, res) {
    // parse the babysitters.json file
    let babysitters = JSON.parse(fs.readFileSync(path.join(__dirname, '../babysitters.json'), 'utf8'));
    // generate a random value for the babysitter's review
    let review = Math.round((Math.random() * 5) * 100) / 100;

    // convert babysitters object to array if it's not one
    if (!Array.isArray(babysitters)) {
        babysitters = Object.values(babysitters);
    }

    // check if a babysitter with the inserted email already exists
    try {
        let existingBabysitter = babysitters.find(babysitter => babysitter.email === req.body.email);

        if (existingBabysitter) {
            // if the babysitter already exists, send an error message
            // should be res.status(400) but if we put it this way, camunda process will fail
            res.send({
                message: 'A babysitter with this email already exists.'
            });
        } else {
            // if the babysitter does not exist, add them to the array
            req.body.review = review;
            babysitters.push(req.body);
            // write the updated array back to the file
            fs.writeFileSync(path.join(__dirname, '../babysitters.json'), JSON.stringify(babysitters), 'utf8');

            // send a success message
            res.send({
                message: 'Babysitter successfully registered.'
            });
        }
    } catch (error) {
        // if there is an error, send an error message
        // should be res.status(500) but if we put it this way, camunda process will fail
        res.send({
            message: 'An error occurred while registering the babysitter.'
        });
    }
}