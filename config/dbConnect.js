/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js              
 * @descrition      : connects data base
 * @file            : dbConnect.js
 * @author          : Adithya S Shenoy
 * @version         : 1.0
 * @since           : 7-Oct-2021
 * 
 **************************************************************************/

const mongoose = require('mongoose');
const dbConfig = require('./database.config.js');
const logger = require('./logger.js');

// Connecting to the database
exports.dbConnection = () =>{
    mongoose.connect(dbConfig.url, {
        useNewUrlParser: true
    }).then(() => {
        logger.info("Successfully connected to the database");    
    }).catch(err => {
        logger.error('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
}