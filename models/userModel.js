const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the username"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: [true, "Email address already taken"], //prevents duplicates emai
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);