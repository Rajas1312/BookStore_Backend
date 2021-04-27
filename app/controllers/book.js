const noteService = require("../services/book.js");
const Joi = require("joi");
const logger = require("../../logger/logger.js");
const status = require("../../utility/static.json");
const jwt = require('jsonwebtoken');

const ControllerDataValidation = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    author: Joi.string().required(),
    price: Joi.string().required(),
    image: Joi.string().required(),
    quantity: Joi.string().required()
});

const ControllerDataValidation1 = Joi.object({
    name: Joi.string().required()
});

class NoteController {
    /**
     * @description create anew note
     * @message Create and save a new note
     * @param res is used to send the response
     */
    createBook = (req, res) => {
        try {
            const noteInfo = {
                title: req.body.title,
                description: req.body.description,
                author: req.body.author,
                price: req.body.price,
                image: req.body.image,
                quantity: req.body.quantity

            };
            const token = req.headers.authorization.split(" ")[1];
            const validation = ControllerDataValidation.validate(noteInfo);
            return validation.error ?
                res.status(400).send({
                    success: false,
                    message: "please enter valid details",
                }) :
                noteService.createNotes(noteInfo, (error, data) => {
                    return error ?
                        (logger.error("Some error occurred while creating note"),
                            res.send({
                                success: false,
                                status_code: status.Internal_Server_Error,
                                message: "Some error occurred while creating note!!",
                            })) :
                        res.send({
                            success: true,
                            message: "note added successfully !",
                            data: data,
                        });
                });
        } catch (error) {
            res.send({
                success: false,
                status_code: status.Internal_Server_Error,
                message: "Some error occurred while creating note!!!!",
            });
        }
    };

    /**
               * @description Find all the greeting
               * @method findAll is service class method
               * @param req is used to get the request
               *  @param res is used to send resposne
               */

    findAllBooks = (req, res) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            noteService.findAll((err, data) => {
                if (err) {
                    (logger.error("Some error occurred while serching greeting"),
                        res.status(404).send({
                            sucess: false,
                            message: "could not find any entries"
                        })
                    )
                } else {
                    logger.info("Greeting found successfully !"),
                        res.status(200).send({
                            sucess: true,
                            message: "found greetings sucessfully",
                            data: data
                        })
                }
            })
        } catch (error) {
            logger.error("greeting not found");
            res.send({
                success: false,
                status_code: 500,
                message: `greeting not found`,
            });
        }
    };


}
module.exports = new NoteController()