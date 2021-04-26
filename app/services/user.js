/**
 * @module       Services
 * @file         user.js
 * @description  holds the methods calling from controller
 * @author       Rajas Dongre <itsmerajas2@gmail.com>
*  @since        25/04/2021  
-----------------------------------------------------------------------------------------------*/

const { error } = require('winston');
const model = require('../models/user');
const EventEmitter = require("events");
// const helper = require('../../utility/helper')
// const consume = require("../../utility/subscriber.js");
// const publish = require("../../utility/publisher.js");
// const auth = require('../../auth/nodemailer')
const emmiter = new EventEmitter();
const logger = require('../../logger/logger.js')

// emmiter.on("publish", (userInfo, callback) => {
//     publish.getMessage(userInfo, callback);
// });

// emmiter.on("consume", (token, mailData, callback) => {
//     consume.consumeMessage(token, mailData, callback);
// });
class UserService {

    /**
     * @description Create and save notes then send response to controller
     * @method create is used to save the notes
     * @param callback is the callback for controller
     */
    createUser = (user, callback) => {
        model.createUser(user, callback)
    }

    loginUser = (userLogin, callback) => {
        model.findUser(userLogin, callback)
    }
}
module.exports = new UserService();