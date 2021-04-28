/**
 * @module       Middleware
 * @file         helper.js
 * @description  holds the logical reusable methods calling from service class
 * @author       Payal Ghusalikar <payal.ghusalikar9@gmail.com>
*  @since        05/04/2021  
-----------------------------------------------------------------------------------------------*/

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
require("dotenv").config();
var jwt = require('jsonwebtoken');
const logger = require("../logger/logger")

class Helper {

    /**
     * @description verify the user to authorized user's role
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    addRole = (role) => {
        return (req, res, next) => {
            req.role = role;
            next();
        }
    };

    /**
     * @description encypted user password
     * @param {*} password contains user input field
     * @param {*} callback is for service class method
     */
    encryptPassword = (password, callback) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err)
                return callback(err, null);
            return callback(null, hash);
        })
    }

    /**
     * @description create the token
     * @param {} data
     */
    generateToken = (data) => {
        return jwt.sign({
            emailId: data.email,
            id: data._id,
            role: data.role
        },
            process.env.JWT_SECRET, {
            expiresIn: "30d",
        })
    }

    /**
     * @description verify user role i.e admin/user
     * @param {*} req takes token from header
     * @param {*} res sends response 
     * @param {*} next 
     * @returns 
     */
    verifyRole = (req, res, next) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            if (token === undefined) {
                logger.error('Incorrect token or token is expired');
                return res.status(401).send({
                    success: false,
                    message: 'Incorrect token or token is expired'
                });
            }
            return jwt.verify(token, process.env.JWT_SECRET, (error, decodeData) => {
                if (error) {
                    logger.error('Incorrect token or token is expired');
                    return res.status(401).send({
                        success: false,
                        message: 'Incorrect token or token is expiredd ',
                        error
                    });
                } else if (decodeData.role != 'admin') {
                    logger.error('Authorization failed');
                    return res.status(401).send({
                        success: false,
                        message: 'Authorization failed'
                    });
                }
                req.decodeData = decodeData;
                next();
            });
        } catch (error) {
            return res.status(401).send({
                success: false,
                message: 'some error occured ' + error
            });
        }
    }

    /**
     * @description verify token authenticates user
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    verifyToken = (req, res, next) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            if (token === undefined) {
                logger.error('Incorrect token or token is expired');
                return res.status(401).send({
                    success: false,
                    message: 'Incorrect token or token is expired'
                });
            }
            return jwt.verify(token, process.env.JWT_SECRET, (error, decodeData) => {
                if (error) {
                    logger.error('Incorrect token or token is expired');
                    return res.status(401).send({
                        success: false,
                        message: 'Incorrect token or token is expired'
                    });
                }
                req.decodeData = decodeData;
                next();
            });
        } catch {
            return res.status(401).send({
                success: false,
                message: 'some error occured'
            });
        }
    }
}

module.exports = new Helper();