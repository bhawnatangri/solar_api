'use strict';

const { TE, to } = require('../services/util.service');
const CONFIG = require('../config/app_config');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('Content', {
        content_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, 
        content_name:{type: DataTypes.STRING, unique: true,allowNull: false},
        content_img:{type: DataTypes.STRING},
        description:{type: DataTypes.STRING, allowNull: false}
        
         
    }, {
            timestamps: true,
            deletedAt: 'deletedAt',
            tableName: "contents"

        }
         );
    sequelize.sync({
        force: false,
        logging: true,
        // alter: true
    })

    
       
     return Model;
}