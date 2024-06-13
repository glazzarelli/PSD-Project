const fs = require('fs');
const path = require('path');

module.exports.funcpartyplan = function funcpartyplan(req, res) {

    const city = req.query.location;
    const budget = req.query.budget;
    const requestedServices = req.query.requestedservices.split(',');

    try {
        let vendors = JSON.parse(fs.readFileSync(path.join(__dirname, '../vendors.json'), 'utf8'));
        let result = {};

        for (let service of requestedServices) {
            // create the key for the result object
            let name = "available" + service.charAt(0).toUpperCase() + service.slice(1);
            let availableVendors = [];

            for (let vendor of vendors) {
                if (vendor.city == city && vendor.category == service && vendor.price <= budget) {
                    availableVendors.push(vendor);
                }
            }
            result[name] = availableVendors;
        }
        res.send(result);
    } catch (error) {
        // should be res.status(500) but if we put it this way, camunda process will fail
        res.send({
            message: "An error occurred while organizing your party."
        });
    }
}