const express = require('express');
const router = express.Router();

const UserController = require('../controllers/admin.controller');
var jwt = require('jsonwebtoken');

const path = require('path');
const validate = require('express-validation');
const userValidate = require('../validation/user');
const multer=require("multer");

const checkjwtauth= require("../middleware/jwtauth.js")
/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({ status: "success", message: "Parcel Pending API", data: { "version_number": "v1.0.0" } })
});


var storage = multer.diskStorage({
  destination:  './public/uploads',
  filename: function (req, file, cb) {
    return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
var upload = multer({ storage: storage })

 
  router.post('/login', validate(userValidate.login),  UserController.login);

   router.post('/add-contact', validate(userValidate.addContact),UserController.addContact)

   router.post('/contact-list', checkjwtauth,UserController.detailContact)
 
   router.post('/delete-contact', checkjwtauth,validate(userValidate.deletContact),UserController.deletContact)
 
   router.post('/add-content', checkjwtauth,upload.single('content_img'),validate(userValidate.addContent),UserController.addContent)
 
   router.post('/delete-content', checkjwtauth,validate(userValidate.deletContent),UserController.deletContent)
 
   router.post('/content-list',checkjwtauth,UserController.detailContent)

   router.post('/update-content',checkjwtauth,validate(userValidate.deletContent),UserController.updateContent)
  
  router.post('/faq-list', UserController.detailFaq);

 router.post('/add-faq', checkjwtauth,validate(userValidate.addFaq),UserController.addFaq);
 
 router.post('/update-faq', checkjwtauth,validate(userValidate.updateFaq), UserController.updateFaq);
 
 router.post('/delete-faq',checkjwtauth, validate(userValidate.deletFaq), UserController.deletFaq);

// //order routes





 module.exports = router;

 
