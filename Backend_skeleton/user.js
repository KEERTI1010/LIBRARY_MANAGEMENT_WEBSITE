const express = require ("express");
const User = require("../Backend/models/User");
const app = express ();

app.use(express.json());

const users = [];

app.get("/" , async(req,res) => {
    res.status(200).json ({msg:"Login"})
});

app.post("/" , async(req,res) => {
    try{
        const {email , password }=req.body;
        const user = users.find((u) => u.email === email);
        if (!user){
            return res.status(400).json({err:"Enter Ur email and password"})
        }
        if (user.password !== password){
            return res.status(400).json({err:"Invalid email Or password"})
        }
        if (user){
            return res.status(200).json({msg:"Logged in sucessfully"});
        }
    }
    catch (err) {
            console.log(err);
            return res.status(500).json({err:"Server Error"});
        }
});

app.listen(3000,() => console.log("its Runniig  on port 3000"));
