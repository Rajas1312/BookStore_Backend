const user = require('../controllers/user');
const books = require("../controllers/book.js");
// const labels = require('../controllers/label')
const helper = require("../../utility/helper");
module.exports = (app) => {
    // Create a new user
    app.post('/user', helper.addRole('user'), user.createUser);

    app.post('/admin', helper.addRole('admin'), user.createUser);

    app.post("/login", user.loginUser);

    app.post("/forgotPassword", user.forgotPassword)

    // Create a new note
    app.post("/books", helper.verifyRole, books.createBook);

    app.get('/books', helper.verifyToken, books.findAllBooks);

    app.put('/books/:bookId', helper.verifyRole, books.updateBooks);

    app.delete('/books/:bookId', helper.verifyRole, books.deleteBooks);
}