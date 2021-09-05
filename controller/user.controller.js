const User = require('../model/User');
const validator = require('validator');

module.exports.create = async (req,res) => {
    let user = {};
    console.log(req.body);   
    user.fullName = req.body.fullName ? req.body.fullName : "";
    user.contact = req.body.contact ? req.body.contact : "";
    user.email = req.body.email ? req.body.email : "";
    user.location = req.body.location ? req.body.location : "";
    user.viewContactPermission = req.body.viewContactPermission;

    console.log(user);

    //validating before saving in DB
    if(validator.isEmpty(user.fullName) || validator.isEmpty(user.contact) ||validator.isEmpty(user.email) 
    ||validator.isEmpty(user.location) ){
        return res.status(400).json({ 
         status:400,
         data:"user fullName,contact,email,location and viewContactPermission is required"
        })
    }

    try {
        const userCollection = new User(user);
        await userCollection.save();

        res.json({
            status:200
        })
    } 
    catch(e) {
        console.log(e);
        res.send(e);
    }
}
module.exports.get = async (req,res) => {
    /*
    usually we have id in our sessions or httpOnly cookies
    but here I suppose that I got an id from params
    */

    const userId = req.params.userId;

    try {
        const userData = await User.findById(userId);
        res.json({
            status:200,
            data:userData
        })
    } 
    catch(e) {
        res.send(e);
    }
}
module.exports.changePermission = async (req,res) => {

    const userId = req.params.userId;
    const contact = req.body.viewContactPermission;

    try {
        await User.findByIdAndUpdate({viewContactPermission:contact});
        res.json({
            status:200
        })
    } 
    catch(e) {
        res.send(e);
    }
}