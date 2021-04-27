const mongoose = require("mongoose");
const User = require("../models/user.js");

const BookSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    quantity: { type: String, required: true }
}, {
    timestamps: true,
});

BookSchema.set("versionKey", false);
const Book = mongoose.model("Books", BookSchema);

class BookModel {
    /**
     * @description crete new note
     * @param {*} BookInfo holds data from user
     * @param {*} callback
     */
    createNotes = (bookInfo, callback) => {
        const book = new Book({
            title: bookInfo.title,
            author: bookInfo.author,
            description: bookInfo.description,
            quantity: bookInfo.quantity,
            price: bookInfo.price,
            image: bookInfo.image
        });
        book.save(callback);
    };

    /**
     * @description find all notes from db
     * @param {*} callback
     */
    findNotes = (callback) => {
        Book.find(callback);
    };

    //     /**
    //     * @description update a note by Id
    //     * @param {*} noteInfo
    //     * @param {*} callback
    //     */
    //     updateNotes = (noteInfo, callback) => {
    //         Note.findByIdAndUpdate(
    //             noteInfo.noteID, {
    //             title: noteInfo.title,
    //             description: noteInfo.description,
    //         }, { new: true },
    //             callback
    //         );
    //     };

    //     /**
    //      * @description delete the id from databse and returns the result to service
    //      * @param {*} noteID coming from service class
    //      * @param {*} callback callback for service class
    //      */
    //     deleteById = (noteID, callback) => {
    //         Note.findByIdAndRemove(noteID, callback);
    //     };

    //     /**
    //     * @description remove note temporary by setting isdeleted flag true
    //     * @param {*} noteID
    //     * @param {*} callback
    //     */
    //     removeNote = (noteID, callback) => {
    //         Note.findByIdAndUpdate(
    //             noteID, { isDeleted: true },
    //             callback
    //         );
    //     };

    //     /**
    //    * @description archive note  by setting isdeleted flag true
    //    * @param {*} noteID
    //    * @param {*} callback
    //    */
    //     archiveNote = (noteID, callback) => {
    //         Note.findByIdAndUpdate(
    //             noteID, { isArchived: true }, { new: true },
    //             callback
    //         );
    //     };


    //     /**
    //     * @description update note by adding collaborator
    //     * @param {*} collaborator hofds noteid and collaboratorId
    //     */
    //     findCollaborator = (collaborator) => {
    //         return Note.findById(collaborator.noteId).then((noteData) => {
    //             if (!noteData.collaborator.includes(collaborator.collaboratorId)) {
    //                 return Note.findByIdAndUpdate(
    //                     collaborator.noteId, {
    //                     $push: {
    //                         collaborator: collaborator.collaboratorId,
    //                     },
    //                 }, { new: true }
    //                 );
    //             }
    //         });
    //     };

}
module.exports = new BookModel()