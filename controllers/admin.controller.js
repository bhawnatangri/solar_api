const { User,Contact,Content,Faq} = require('../models');
const { to, ReE, ReS } = require('../services/util.service');
const utilService = require('../services/util.service');
const CONFIG = require('../config/app_config');
const db = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var nodemailer = require("nodemailer");
const { emailsend } = require('../services/util.service');
const multer=require('multer')




//user apis 
//-----------------------------------------------------------------------------------------------


const login = async function (req, res) {
console.log("login api")
  const username = req.body.email;
  let [errUsername, user] = await to(User.findOne({
    where: {
      email: username
    }
  }))
  if (user) {
    const validPass = await bcrypt.compare(req.body.password, user.password)
    console.log(validPass)
    if(validPass){  
    var token = await jwt.sign({ username:user.email, user_id:user.user_id }, 
    'secret',
    {
      expiresIn:"1d"
    }
    );
    
    return ReS(res, "user login successfully",token)
  }
    else {return ReE(res, "login failed")}
  }
  return ReE(res, "email not match")
   
}
module.exports.login = login;




//contact us apis
//--------------------------------------------------------------------------------------------

const addContact = async function (req, res) {
  let user = req.body
  let [err, con] = await to(Contact.create(user));
  if (err) return ReE(res, err, 422);
  if (!con) return ReE(res, " not added")
  
  return ReS(res, "contact added successfully", con)
  }
  module.exports.addContact =addContact;

 

const detailContact = async function (req, res) {
  let body = req.body
  let [errDetail, detail] = await to(Contact.findAll());
  if (errDetail) return ReE(res, errDetail, 422);
  if (!detail) return ReE(res, "contact list not found")
  
  return ReS(res, "Contact_list", detail)
  }
  module.exports.detailContact =detailContact;


  const deletContact = async function (req, res) {
    let body = req.body
    let [err2, del] = await to(Contact.destroy({where:{
      contact_id:body.contact_id
    }}));
    if (err2) return ReE(res, err2, 422);
    if (!del) return ReE(res, "not found")
    
    return ReS(res, "Contact_delete" )
    }
    module.exports.deletContact =deletContact;
  

   
//     //Content apis
// //--------------------------------------------------------------------------------------------------------------   
   
const addContent = async function (req, res) {
  let body = req.body
  console.log(req.file)
  body.content_img=`http://143.110.191.51/${req.file.path}`
  let[err1,cont]=await to (Content.create(body))
      if (err1) return ReE(res, err1, 422);
      if (!cont) return ReE(res, " Content not Created")
      return ReS(res, "Content Created", cont)
  }
module.exports.addContent=addContent;

  const updateContent = async function (req, res) {
    let body = req.body
    if(req.file)
    {
      body.content_img=`http://143.110.191.51/${req.file.path}`
    }
    let [err1, updat] = await to(Content.update({...body},{
      where:{content_name:body.content_name}
    }));
    if (err1) return ReE(res, err1, 422);
    if (updat[0]==0) return ReE(res, " not update")
    
    return ReS(res, "updated",updat)
    }
    module.exports.updateContent =updateContent;

const detailContent = async function (req, res) {
  let body = req.body
  let [errDetail, detail] = await to(Content.findAll());
  if (errDetail) return ReE(res, errDetail, 422);
  if (!detail) return ReE(res, "Content_list not found")
  
  return ReS(res, "Content_list", detail)
  }
  module.exports.detailContent =detailContent;


  const deletContent = async function (req, res) {
    let body = req.body
    let [err2, del] = await to(Content.destroy({where:{
      content_id:body.content_id
    }}));
    if (err2) return ReE(res, err2, 422);
    if (!del) return ReE(res, "not found")
    
    return ReS(res, "Content_delete" )
    }
    module.exports.deletContent =deletContent;
  

// //  //faq api
// // //---------------------------------------------------------------------------------------------------

const addFaq = async function (req, res) {
  let body = req.body

  let[err1,addTec]=await to (Faq.create(body))
      if (err1) return ReE(res, err1, 422);
      if (!addTec) return ReE(res, " not found")
      return ReS(res, "created", addTec)
  }
module.exports.addFaq =addFaq;

  const updateFaq = async function (req, res) {
    let body = req.body

    let [err1, updat] = await to(Faq.update({...body},{
      where:{faq_id:body.faq_id}
    }));
    if (err1) return ReE(res, err1, 422);
    if (updat[0]==0) return ReE(res, " not update")
    
    return ReS(res, "updated",updat)
    }
    module.exports.updateFaq =updateFaq;

const detailFaq= async function (req, res) {
  let body = req.body
  let [errDetail, detail] = await to(Faq.findAll());
  if (errDetail) return ReE(res, errDetail, 422);
  if (!detail) return ReE(res, "list not found")
  
  return ReS(res, "Faq_list", detail)
  }
  module.exports.detailFaq =detailFaq;


  const deletFaq = async function (req, res) {
    let body = req.body
    let [err2, del] = await to(Faq.destroy({where:{
      faq_id:body.faq_id
    }}));
    if (err2) return ReE(res, err2, 422);
    if (!del) return ReE(res, "not found")
    
    return ReS(res, "Faq_delete" )
    }
    module.exports.deletFaq =deletFaq;
  
