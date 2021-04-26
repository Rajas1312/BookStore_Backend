const user = require('../controllers/user');
// const notes = require("../controllers/notes.js");
// const labels = require('../controllers/label')
const helper = require("../../utility/helper");
module.exports = (app) => {
    // Create a new user
    app.post('/user', helper.addRole('user'), user.createUser);

    app.post('/admin', helper.addRole('admin'), user.createUser);

    app.post("/login", user.loginUser);

}