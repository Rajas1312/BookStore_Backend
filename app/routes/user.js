const user = require('../controllers/user');
// const notes = require("../controllers/notes.js");
// const labels = require('../controllers/label')
// const helper = require("../../utility/helper.js");
module.exports = (app) => {
    // Create a new user
    app.post('/user', user.createUser);

}