module.exports.submitRfQ = function submitRfQ(req, res) {
    console.log(JSON.stringify(req.body));
    res.send({
        id: 1
    });
}

