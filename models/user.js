const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    contact: {
        type: Number
    },
    college: {
        type: String
    },
    level: {
        type: Number,
        default: 1
    },

});

module.exports = mongoose.model("User", userSchema);