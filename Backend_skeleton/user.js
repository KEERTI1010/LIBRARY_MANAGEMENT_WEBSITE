const express = require ("express");
const app = express ();

app.use(express.json());

const users = [];

app.get("/" , async (req,res) => {
    res.status(200).json ({msg:"Login"})
});

app.post("/signup" , (req , res) => {
    const { email , password } =req.body;
    user.push ({
        email , password
    });

    return res.status(200).json({msg:"Signup in Sucessfully"})
});

app.post("/login" ,(req , res))


app.listen(3000,() => console.log("its Runniig  on port 3000"));
