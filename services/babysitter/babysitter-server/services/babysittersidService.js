const fs = require('fs');
const path = require('path');

module.exports.funcbabysittersid = function funcbabysittersid(req, res) {
    // parse the babysitters.json file
    let babysitters = JSON.parse(fs.readFileSync(path.join(__dirname, '../babysitters.json'), 'utf8'));

    // convert babysitters object to array if it's not one
    if (!Array.isArray(babysitters)) {
        babysitters = Object.values(babysitters);
    }

    try {
        // find the babysitter with the provided email
        let babysitter = babysitters.find(bbs => bbs.email === req.params.id);

        if (babysitter) {
            // if the babysitter is found, send it
            res.send(babysitter);
        } else {
            // if the babysitter is not found, send a 404 status code with a message
            res.status(404).send({
                message: 'Babysitter not found.'
            });
        }
    } catch (error) {
        // if there is an error, send a 500 status code with a message
        res.status(500).send({
            message: 'An error occurred while retrieving the babysitter.'
        });
    }
}
