const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    mail: {
        type: String,
        required: true,
        unique: true,
    },
});

const Email = mongoose.model('Email', emailSchema);
module.exports = Email;
