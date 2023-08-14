const Tutorial = require("../models/tutorial.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // validate request
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty bro, jeez"
        }); 
    }

    //create a tutorial
    const tutorial = new Tutorial({
        title: req.body.title, 
        description: req.body.description, 
        published: req.body.published || false 
    });

    // save tutorial in database 
    Tutorial.create(tutorial, (err, data) => {
        if(err)
        res.status(500).send ({
            message: err.message || "Error occurred while creating the Tutorial (Probably your fault)"
        }); 
        else res.send(data); 
    });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title; 

    Tutorial.getAll(title, (err, data) => {
        if(err)
        req.status(500).send({
            message: err.message || "error occurrded while retrieving tutorial"
        }); 
        else res.send(data);
    });
};

exports.findAllPublished = (req, res) => {
    Tutorial.getAllPublished((err, data) => {
        if(err) 
        res.status(500).send({
            message: err.message || "error occured while retrienving tutorial"
        }); 
        else res.send(data); 
    });
};

// Find a single Tutorial with a id
exports.findOne = (req, res) => {
    Tutorial.findById(req.params.id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `not found tutorial with id ${req.params.id}.`
                });
            }
            else{
                res.status(500).send({
                    message: "Error retrieving Tutorial with id" + req.params.id
                });
            }
        }
        else res.send(data); 
    });
};

// find all published Tutorials
exports.findAllPublished = (req, res) => {
    Tutorial.findById(req.params.id, (errr, data) => {
        if(err) {
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `not found tutorial with id ${req.params.id}.`
                });
            }
            else{
                res.status(500).send({
                    message: "error retrieving tutorial with id" + req.params.id
                });
            }
        }
        else res.send(data); 
    });
};

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
    // validate request
    if(!req.body){
        res.status(400).send({
            message: "How many times must i tell that this content can not be empty"
        }); 
    }
    console.log(req.body); 

    Tutorial.updateById(
        req.params.id, 
        new Tutorial(req.body), 
        (err, data) => {
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `not found tutorial with id ${req.params.id}.`
                    });
                }
                else{
                    res.status(500).send({
                        message: "error updating tutorial with id " + req.params.id
                    })
                }
            }
            else res.send(data);
        }
    )
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    Tutorial.remove(req.params.id, (err, data) => {
        if(err){
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `not found tutorial with id ${req.params.id}.`
                });
            }
            else {
                res.status(500).send({
                    message: "could not delete tutorial with id " + req.params.id
                }); 
            }
        }
        else res.send({message: `tutorial was deleted successfully`});
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Tutorial.removeAll((err, data) => {
        if(err)
        res.status(500).send({
            message: err.message || "error occured while removing all tutorials"
        });
        else res.send({message: `all tutorials were deleted successfully, Thank you :)`})
    });
};