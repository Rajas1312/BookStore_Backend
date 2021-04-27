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
                    (logger.error("Some error occurred while serching for boooks"),
                        res.status(404).send({
                            sucess: false,
                            message: "could not find any entries"
                        })
                    )
                } else {
                    logger.info("Greeting found successfully !"),
                        res.status(200).send({
                            sucess: true,
                            message: "found books sucessfully",
                            data: data
                        })
                }
            })
        } catch (error) {
            logger.error("books not found");
            res.send({
                success: false,
                status_code: 500,
                message: `Books not found`,
            });
        }
    };

    /**
    * @description update a note by id
    * @message update and save a note
    * @param res is used to send the response
    */
    updateNotes = (req, res) => {
        const noteInfo = {
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
            price: req.body.price,
            image: req.body.image,
            quantity: req.body.quantity,
            noteID: req.params.bookId,
        };
        const noteData = {
            title: noteInfo.title,
            description: noteInfo.description,
            author: noteInfo.author,
            price: noteInfo.price,
            image: noteInfo.image,
            quantity: noteInfo.quantity

        };
        const validation = ControllerDataValidation.validate(noteData);
        return validation.error ?
            res.status(400).send({
                success: false,
                message: "please enter valid details " + validation.error,
            }) :
            noteService.updateNotes(noteInfo, (error, data) => {
                return (
                    error ?
                        (logger.error("Error updating books with id : "),
                            res.send({
                                status_code: status.Internal_Server_Error,
                                message: "Error updating books with id : ",
                            })) :
                        !data ?
                            (logger.error("books not found with id : "),
                                res.send({
                                    status_code: status.Not_Found,
                                    message: "books not found with id : "
                                })) :
                            logger.info("books updated successfully !"),
                    res.send({
                        message: "books updated successfully !",
                        data: data,
                    })
                );
            });
    }

    /**
        * @description Delete a note by id
        * @message Delete a note
        * @param res is used to send the response
        */
    deleteNotes(req, res) {
        const noteID = req.params.bookId;
        noteService.deleteNotes(noteID, (error, data) => {
            return (
                error ?
                    (logger.error("note not found with id " + noteID),
                        res.send({
                            status_code: status.Not_Found,
                            message: "note not found with id " + noteID,
                        })) :
                    logger.info("note deleted successfully!"),
                res.send({
                    message: "note deleted successfully!",
                })
            );
        });
    }



}
module.exports = new NoteController()