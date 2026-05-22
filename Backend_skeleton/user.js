const express = require ("express");
const app = express ();

app.use(express.json());

const users = [];

app.get("/" , async (req,res) => {
    res.status(200).json ({msg:"Login"})
});

app.post("/signup" , (req , res) => {
    const { email , password } =req.body;
    users.push ({
        email , password
    });

    return res.status(200).json({msg:"Signup in Sucessfully"})
});

app.post("/login" ,(req , res) => {
    const {email , password} = req.body;
    const user = users.find ((user) => user.email === email);

    if (!user) {
        return res.status(400).json({msg:"Email Not Found"});
    }

    if (user.password !== password) {
        return res.status(400).json ({msg:"Invalid Passward"});
    }
    return res.status(200).json ({msg:"Logged in Successfully"});
})

app.listen(3000,() => console.log("its Runniig  on port 3000"));
