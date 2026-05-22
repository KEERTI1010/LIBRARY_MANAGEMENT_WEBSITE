const express = require ("express");
const app = express ();

app.use(express.json());

const books = [];

app.get ("/get_book" , async (req , res) => {
    res.status(200).json ({books});
});

app.post ("/add_book" ,async ( req , res) => {
    const {title , author ,price} = req.body;
    if (!title || !author || !price) {
        return res.status(400).json ({msg:"Fill all fields"});
    }

    books.push({
        title,author,price
    });
    return res.status(200).json ({msg:"Books Added sucessfully",books})
});

app.get ("/search_book" , (req , res) => {
    const {title} = req.query;
    const book  = books.find ( (book) =>  book.title.toLowerCase() === title.toLowerCase());
    if (!book) {
        return res.status(400).json ({msg:"Searched Book Not found"});
    }
    return res.status(200).json ({msg:"Books Found",book});
});

app.delete ("/delete_book" , (req , res) => {

});

app.put ("/update_book" , (req , res) => {
    const {title , author , price } = req.body;
    const book = books.find ((book) => book.title.toLowerCase() === title.toLowerCase());
    if (!book){
        return res.status(400).json ({msg:"Book Not Found"});
    }
    if (author) {
        book.author = author;
    }

    if (price) {
        book.price = price;
    }

    return res.status(200).json({msg:"Book Updated Sucessfully",book});
});

app.listen (5000,() => {
    console.log("In Port 5000")
});
