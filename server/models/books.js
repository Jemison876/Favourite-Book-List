let mongoose = require('mongoose');
// create a model class
let bookModel = new mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books229"
});

module.exports = mongoose.model('Book', bookModel);