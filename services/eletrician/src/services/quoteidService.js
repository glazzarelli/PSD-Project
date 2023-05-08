module.exports.getQuoteById = function getQuoteById(req, res) {

    var id = req.params.id;
    console.log("received id = " + id);

    if (id == 1) {
        
        res.status(200).send({
            message: 'here the quote'
        });    
    } else {
        res.status(202).send({
            message: 'the  quote is not yet ready'
        });
    }
    
    
}

