const fs = require('fs');
const path = require('path');

module.exports.funcbabysitters = function babysitters(req, res) {
    // retrieve the requested parameters
    const requestedDay = req.query.date;
    const requestedCity = req.query.city;
    const numOfChildren = req.query.numofchildren;
    const requestedHours = req.query.numofhours;
    const requestedServices = JSON.parse(req.query.requestedservices);

    console.log(requestedDay, requestedCity, numOfChildren, requestedHours, requestedServices);
    console.log(typeof requestedDay, typeof requestedCity, typeof numOfChildren, typeof requestedHours, typeof requestedServices);

    let availableBabysitters = [];

    try {
        // parse the babysitters.json "database" file
        let babysitters = JSON.parse(fs.readFileSync(path.join(__dirname, '../babysitters.json'), 'utf8'));

        for (let babysitter of babysitters) {
            let flag = true;
            
            console.log(babysitter.surname)

            console.log(babysitter.city === requestedCity)
            console.log(babysitter.city == requestedCity)
            if (babysitter.city === requestedCity) {
                console.log('matching city')
                for (let reqService of requestedServices) {
                    if (!babysitter.services.includes(reqService)) {
                        console.log('service not provided')
                        // if the babysitter does not provide the requested service, set the flag to false
                        flag = false;
                        break;
                    }
                }

                console.log('flag1: ', flag);

                for (let day of babysitter.availabilities) {
                    if (requestedDay === day.day && day.is_available !== "true") {
                        // if the babysitter is not available on the requested day, set the flag to false
                        flag = false;
                        break;
                    }
                }

                console.log('flag2: ', flag);

                if (flag) {
                    // if the babysitter satisfies all the criteria, calculate the price she requests and add it to the list
                    babysitter.price = numOfChildren * babysitter.hourly_salary * requestedHours;
                    availableBabysitters.push(babysitter);
                }
            }
        }

        res.send({
            availableBbsResponse: availableBabysitters.length === 0 ? "No babysitter satisfied your criteria :(" : "Here is the list of the available babysitters",
            availableBabysitters: availableBabysitters
        });

    } catch (e) {
        console.error(e);
        res.status(500).send({
            message: 'An error occurred while retrieving the babysitters.'
        });
    }
}