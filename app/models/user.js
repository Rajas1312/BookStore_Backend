
/**
 * @module       models
 * @file         user.js
 * @description  UserModel class holds the databse related methods 
 * @author       Rajas Dongre <itsmerajas2@gmail.com>
 * @since        25/4/2021  
-----------------------------------------------------------------------------------------------*/
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const { version } = require('joi');
const { error } = require('winston');

const UserSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
}, {
    timestamps: true
});
UserSchema.set("versionKey", false)

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model('User', UserSchema);

class UserModel {

    /**
     * @description saving  greetings in the database
     * @param {*} greetings 
     * @param {*}callback 
     */
    createUser = (user, callback) => {
        const userSchema = new User({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            role: user.role
        });
        userSchema.save(callback)
    };

    /**
     * @description find the user
     * @param {*} userLoginData
     * @param {*} callback
     */
    findUser = (userLogin, callback) => {
        User.findOne({ email: userLogin.emailId }, callback)
    };



}
module.exports = new UserModel();