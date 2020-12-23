'use strict';

const { TE, to } = require('../services/util.service');
const CONFIG = require('../config/app_config');

module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('Faq', {
        faq_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, 
        question: {type: DataTypes.STRING, allowNull: false},
        answer:{type: DataTypes.STRING, allowNull: false} 
         
    }, {
            timestamps: true,
            deletedAt: 'deletedAt',
            tableName: "faqs"

        }
         );
    sequelize.sync({
        force: false,
        logging: true,
        // alter: true
    })

    
       
     return Model;
}