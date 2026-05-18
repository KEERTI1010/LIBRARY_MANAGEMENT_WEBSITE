const cors = require('cors');
const Book =require('./models/Book')

require('dotenv').config({path:'./.env'});
const mongoose = require('mongoose');


const express = require("express");
const app = express();

const authRoutes = require('./routes/auth');

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database Connected"))
.catch((err) => {
    console.log("Connection Error Details:");
    console.log("Error Name:", err.name);
    console.log("Error Message:", err.message);
});

app.get("/",(req,res) => {
    res.send("Library Server is Live!!");
});

app.use('/api/auth', authRoutes);

app.post("/add-book", async (req, res) => {
    try {
        const { title, author, price } = req.body;
        const newBook = new Book({ title, author, price });
        await newBook.save();
        
        res.status(201).json({ message: "Book added successfully!", book: newBook });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/get-all-books", async (req, res) => {
    try {

        const allBooks = await Book.find(); 

        res.status(200).json(allBooks); 
    } catch (err) {
        res.status(500).json({ error: "Database search failed!" });
    }
});

app.put("/update-book/:id", async (req, res) => {
    try {
        const { title, author, price } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id, 
            { title, author, price }, 
            { new: true } 
        );

        res.status(200).json({ message: "Updated!", updatedBook });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/delete-book/:id", async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Book deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000,() => console.log("Server running on port 5000"));