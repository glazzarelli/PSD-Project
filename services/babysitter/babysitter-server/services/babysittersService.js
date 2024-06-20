const fs = require('fs');
const path = require('path');

module.exports.funcbabysitters = function babysitters(req, res) {
    // retrieve the requested parameters
    const requestedDay = req.query.date;
    const requestedCity = req.query.city;
    const numOfChildren = req.query.numofchildren;
    const requestedHours = req.query.numofhours;
    const requestedServices = req.query.requestedservices.split(',').filter(item => item != '');


    try {
        // parse the babysitters.json "database" file
        let babysitters = JSON.parse(fs.readFileSync(path.join(__dirname, '../babysitters.json'), 'utf8'));

        // find the babysitters that satisfy the requested criteria
        const availableBabysitters = babysitters
            .filter(babysitter => babysitter.city === requestedCity)
            .filter(babysitter =>
                requestedServices.every(reqService => babysitter.services.includes(reqService)) &&
                babysitter.availabilities.some(day => requestedDay === day.day && day.is_available === "true")
            )
            .map(babysitter => {
                babysitter.price = (numOfChildren * babysitter.hourly_salary * requestedHours).toString();
                return babysitter;
            });

        res.send({
            availableBbsResponse: availableBabysitters.length === 0 ? "No babysitter satisfied your criteria :(" : "Here is the list of the available babysitters",
            availableBabysitters: availableBabysitters
        });

    } catch (e) {
        // should be res.status(500) but if we put it this way, camunda process will fail
        res.send({
            message: "An error occurred while retrieving the babysitters."
        });
    }
}