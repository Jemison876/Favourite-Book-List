/*
  controller/books.ejs
  Tarique Jemison
  301266592
  Mid-Term Exam (Favorite Book List)
*/
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Book = require('../models/books');


module.exports.displayBookList = (req, res, next) => {
    Book.find((err, bookList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(BookList);
            //book is the view, {title:'Book List', BookList : bookList} is object being pushed to view
            res.render('books/index', 
            {title:'Books', 
            books : bookList, 
            displayName: req.user ? req.user.displayName : ''});
        }
    });
}


//Display add page
/*
module.exports.displayAddPage = (req, res, next) =>{
    res.render('books/details', {title:'Add Book', 
    displayName: req.user ? req.user.displayName : ''})
}*/

module.exports.displayAddPage = (req, res, next) => {
    Book.find((err, bookList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(BookList);
            //book is the view, {title:'Book List', BookList : bookList} is object being pushed to view
            res.render('books/details', 
            {title:'Add Book', 
            books : bookList, 
            displayName: req.user ? req.user.displayName : ''});
        }
    });
}


module.exports.processAddPage = (req, res, next) =>{
    let newBook = Book({
        "Title": req.body.title,
        "Description": req.body.description,
        "Price": req.body.price,
        "Author": req.body.author,
        "Genre": req.body.genre        
    });

    Book.create(newBook, (err, Book)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/books');
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Book.findById(id, (err, bookToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('books/details', 
            {title:'Edit Book', 
            books: bookToEdit, 
            displayName: req.user ? req.user.displayName : ''});
        }
    });
}

module.exports.processEditPage = (req, res, next)=>{
    let id = req.params.id;

    let updatedBook = Book({
        "_id": id,
        "Title": req.body.title,
        "Description": req.body.description,
        "Price": req.body.price,
        "Author": req.body.author,
        "Genre": req.body.genre
    });

    Book.updateOne({_id: id}, updatedBook, (err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the book list
            res.redirect('/books');
        }
    })
}

module.exports.performDelete = (req, res, next) =>{
    let id = req.params.id;
    Book.remove({_id: id}, (err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        {
            //refresh the book list
            res.redirect('/books');
        }
    });
    
}

