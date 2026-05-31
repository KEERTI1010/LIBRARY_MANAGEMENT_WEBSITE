require("dotenv").config();

const express = require ("express");
const app = express ();
const mongoose = require("mongoose");
const User = require("./user_schema");
const URL = process.env.MONGO_URL;
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect (URL)
.then(() =>{
    console.log("Database Connected");
})
.catch((err) => {
    console.log("Error:",err);
});

app.get("/" , async (req,res) => {
    res.status(200).json ({msg:"Login"})
});

app.post("/signup" ,async (req , res) => {
    const { email , password}= req.body;
    const Exist_User = await User.findOne({ email });

    if (Exist_User) {
        return res.status(400).json({msg: "User already exists"});
    }
    const user = new User({email,password});
    await user.save();

    return res.status(200).json({msg:"Signup in Sucessfully"})
});

app.post("/login" , async(req , res) => {
    const {email , password} = req.body;
    const user = await User.findOne ({email});

    if (!user) {
        return res.status(400).json({msg:"Email Not Found"});
    }

    if (user.password !== password) {
        return res.status(400).json ({msg:"Invalid Passward"});
    }
    return res.status(200).json ({msg:"Logged in Successfully"});
});

app.listen(3000,() => console.log("its Runniig  on port 3000"));
