const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    author: String,
    page_count: Number,
    year: Number
});

module.exports = mongoose.model('Book', bookSchema);