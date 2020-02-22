const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    level: {
        type: Number,
        default: 1
    },
    score: {
        type: Number, 
        default: 0
    }
});

module.exports = mongoose.model("User", userSchema);