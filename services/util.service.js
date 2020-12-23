// "use strict";
//const bcrypt = require('bcrypt');
//const bcrypt_p = require('bcrypt-promise');
const { to } = require('await-to-js');
const pe = require('parse-error');
const nodemailer=require('nodemailer')


/*********************** */


module.exports.to = async (promise) => {
    let err, res;
    [err, res] = await to(promise);
    if (err) return [pe(err)];

    return [null, res];
};

module.exports.ReE = function (res, err, code) { // Error Web Response
    if (typeof err == 'object' && typeof err.message != 'undefined') {
        err = err.message;
    }

    if (typeof code !== 'undefined') res.statusCode = 200;

    return res.json({ success: false, message: err });
};

// module.exports.ReS = function (res, data, code) { // Success Web Response
//     let send_data = { success: true, response: data };
//     // if(typeof data == 'object'){
//     //     send_data = Object.assign(response, send_data);//merge the objects
//     // }

//     if (typeof code !== 'undefined') res.statusCode = code;

//     return res.json(send_data)
// };

module.exports.ReS = function (res, data, code) { // Success Web Response
    let send_data = { success: true,message:data, response: code };
    // if(typeof data == 'object'){
    //     send_data = Object.assign(response, send_data);//merge the objects
    // }
  res.statusCode = 200;

    return res.json(send_data)
};

module.exports.TE = TE = function (err_message, log) { // TE stands for Throw Error
    if (log === true) {
        console.error(err_message);
    }
    throw new Error(JSON.parse(JSON.stringify(err_message)));
};

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: 'naveen.singhep@gmail.com',
      pass: 'Naveen@ep2020'
    }
});

const emailsend = async function (email) {
    // console.log(mail)
    let data01 = smtpTransport.sendMail(

        {
            from:'naveen.singhep@gmail.com', // sender address
            to: email.to, // list of receivers
            subject: email.subject, // Subject line
            text: email.text, // plaintext body
            //html: email.html // html body
        },

        function (err, res) {
            if (err) {
                return err;
            } else {
                return res;
            }
        });
    return data01;

}
module.exports.emailsend = emailsend;






