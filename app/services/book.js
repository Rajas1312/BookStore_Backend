const model = require("../models/book.js");

class BookService {
    /**
     * @description Create and save Note then send response to controller
     * @method create is used to save the Note
     * @param callback is the callback for controller
     */
    createNotes = (noteInfo, callback) => {
        return model.createNotes(noteInfo, callback);
    };


    findAll = (callback) => {
        model.findNotes(callback);
    }

    /**
* @description Update Note by id and return response to controller
* @method update is used to update Note by ID
* @param callback is the callback for controller
*/
    updateNotes = (noteInfo, callback) => {
        return model.updateNotes(noteInfo, callback);
    };

    /**
         * @description Delete Note by id and return response to controller
         * @method deleteById is used to remove Note by ID
         * @param callback is the callback for controller
         */
    deleteNotes = (noteID, callback) => {
        return model.deleteById(noteID, callback);
    };

    /**
         * @description Delete Note by id and return response to controller
         * @method deleteById is used to remove Note by ID
         * @param callback is the callback for controller
         */
    addToBag = (bookId, callback) => {
        return model.isAddToBag(bookId, callback);
    };


}
module.exports = new BookService()