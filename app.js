const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const pe = require('parse-error');
const cors = require('cors');
const {ReE} = require('./services/util.service')
const v1 = require('./routes/v1');
const app = express();
const CONFIG = require('./config/app_config');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const path=require('path');
//const port=process.env.PORT || 8000;
app.listen(process.env.PORT || 8000, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
//Log Env 
console.log("Environment:", CONFIG.app)
    //DATABASE
const models = require("./models");
models.sequelize.authenticate().then(() => {
        console.log('Connected to  a SQL database:', CONFIG.db_name);
    })
    .catch(err => {
        console.error('Unable to connect to SQL database:', CONFIG.db_name, err);
    });
if (CONFIG.app === 'dev') {
    models.sequelize.sync(); //creates table if they do not already exist
    // models.sequelize.sync({ force: true });//deletes all tables then recreates them useful for testing and development purposes
}
// CORS
app.use(cors());
app.use('/v1', v1);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', function(req, res) {
    res.statusCode = 200; //send the appropriate status code
    res.json({ status: "success", message: "Parcel Pending API", data: {} })
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
     if(err.errors&&err.errors.length>0&&err.errors[0].messages&&err.errors[0].messages.length>0){
      return  ReE(res,err.errors[0].messages[0]);


     }
     return     ReE(res,err)

    // render the error page
});

module.exports = app;

//This is here to handle all the uncaught promise rejections
process.on('unhandledRejection', error => {
    console.error('Uncaught event Error', pe(error));
});

// sms send
