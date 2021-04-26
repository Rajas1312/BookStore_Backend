/**
 * @module       controllers
 * @file         user.js
 * @description  BookStoreController class takes the request and sends response
 * @author       Rajas Dongre <itsmerajas2@gmail.com>
*  @since        15/02/2021  
-----------------------------------------------------------------------------------------------*/
const service = require('../services/user');
const Joi = require('joi');
const logger = require('../../logger/logger.js')
const statics = require('../../utility/static.json')
const bcrypt = require("bcrypt");
// const jwt = require('jsonwebtoken')
// const helper = require('../../utility/helper')
// const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const helper = require('../../utility/helper');
// const ejs = require('ejs')
// const fs = require('fs')
// const auth = require('../../auth/nodemailer')
dotenv.config();

const ControllerUserValidation = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required(),
    password: Joi.string().required(),
    role: Joi.string().required()
})
const ControllerLoginValidation = Joi.object().keys({
    emailId: Joi.string().required(),
    password: Joi.string().required()
})

class UserController {

    /**
         * @description Create and save a new Note
         * @param req is used to get the request
         * @param res is used to send resposne
         */
    createUser = (req, res,) => {
        try {
            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                role: req.role
            };
            const validation = ControllerUserValidation.validate(user);
            if (validation.error) {
                res.status(400).send(statics.Bad_Request)
            } else {
                service.createUser(user, (err, result) => {
                    if (err) {
                        (logger.error("Some error occurred while creating notes"),
                            res.status(500).send(statics.Internal_Server_Error)
                        )
                    } else {
                        logger.info("Registered successfully !"),
                            res.status(200).send(statics.Success);
                    }
                });
            }
        } catch (error) {
            logger.error("could not register ");
            return res.send(statics.Internal_Server_Error)
        }
    };

    loginUser = (req, res) => {
        const userLogin = {
            emailId: req.body.email,
            password: req.body.password
        };
        const validation = ControllerLoginValidation.validate(userLogin);
        if (validation.error) {
            res.status(400).send(statics.Bad_Request)
        } else {
            service.loginUser(userLogin, (error, result) => {
                if (!result) {
                    logger.error("Some error occurred while logging in"),
                        res.status(500).send(statics.InvalidCredentials)

                } else {
                    bcrypt.compare(userLogin.password, result.password, (err, data) => {
                        if (data) {
                            result.token = helper.generateToken(result)
                            logger.info("logged in  successfully !"),
                                res.status(200).send({ token: result.token, satus: statics.SuccessLogin });
                        }
                        if (!data) {
                            res.status(500).send(statics.InvalidCredentials)
                        }
                    })
                }

            });
        }
    }
}
module.exports = new UserController();