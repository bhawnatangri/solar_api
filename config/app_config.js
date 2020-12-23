require('dotenv').config(); //instatiate environment variables

let CONFIG = {} //Make this global to use all over the application

CONFIG.app = process.env.APP || 'dev';
CONFIG.port = process.env.PORT || '8000';

CONFIG.db_dialect = process.env.DB_DIALECT || 'mysql';
CONFIG.db_host = process.env.DB_HOST || '127.0.0.1';
CONFIG.db_port = process.env.DB_PORT || '3306';
CONFIG.db_name ='solar_api';
CONFIG.db_user = process.env.DB_USER || 'blueoak';
CONFIG.db_password = process.env.DB_PASSWORD || 'rcuh#ZL1xFgm61zr';



module.exports = CONFIG;
//CREATE USER 'solar'@'0.0.0.0' IDENTIFIED BY 'Ep#12345';
//REMOVE USER 'solar'@'0.0.0.0' IDENTIFIED BY 'Ep#12345';
//CREATE USER 'solar_user'@'0.0.0.0' IDENTIFIED WITH mysql_native_password BY 'Ep#12345';
//GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'solar_user'@'0.0.0.0' WITH GRANT OPTION;
//sudo ufw allow from 0.0.0.0 to any port 3306
//GRANT ALL PRIVILEGES ON *.* TO "root"@"%" IDENTIFIED BY "Ep#12345" WITH GRANT OPTION; FLUSH PRIVILEGES;