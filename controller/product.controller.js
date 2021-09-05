const Product = require('../model/Product');
const validator = require('validator');
const multer = require('multer');
const nodemailer = require("nodemailer");
const fs = require('fs');
const User = require('../model/User');
let images  = [];
const storage = multer.diskStorage({
    destination: (req,file,callback) => {
        let dir = './upload';
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        callback(null,dir);
    },
    filename: (req,file,callback) => {
        callback(null,file.originalname);
        images.push(file.originalname);
    }
})
let upload = multer({storage:storage}).array('files',12)

module.exports.create = async (req,res) => {
    let product = {};

    product.title = req.body.title ? req.body.title : ""
    product.price = req.body.price ? req.body.price : ""
    product.description = req.body.description ? req.body.description : ""
    product.category = req.body.category ? req.body.category : ""
    product.userId = req.body.userId ? req.body.userId : ""

    //upload function executes when any image uploads
    await upload(req,res,(err) => {
        if (err) {
            return res.status(400).json({
                data:"something wrong"
            });  
        }
    })
    const data = await User.findById(product.userId);
    console.log(data)
    //checking after upload 
    product.images = images[0] ? images : [];

    console.log(product.images);
    //validating before saving in DB
    if(validator.isEmpty(product.title) || validator.isEmpty(product.price) ||validator.isEmpty(product.description) 
    ||validator.isEmpty(product.category) || validator.isEmpty(product.userId) ){
        return res.status(400).json({ 
         status:400,
         data:"product title,price,description,category and userId is required"
        })
    }

    try {
        const productCollection = new Product(product);
        await productCollection.save();

        res.json({
            status:200
        })

       

// for notification I will use nodemailer
     let transport = nodemailer.createTransport(
         {
             service:'gmail',
             auth:{
                 user:'',//you can write yours for checking
                 pass:process.env.password
             }
         }
     )
     let mailOptions = {
         from:'',
         to:'',// here email can be found by 
         subject:'',
         text:''
     }
    } 
    catch(e) {
        console.log(e);
    }
}