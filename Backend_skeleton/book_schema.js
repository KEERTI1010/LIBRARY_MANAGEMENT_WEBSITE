const mongoose = require(mongoose);
const schema = new mongoose.Schema({
    title:{
        type : String,required:true
    },

    author:{
        type : String , required : true 
    },

    price : {
        type : String , required : true
    },

    available : {
        type : Boolean , required : true
    }

})

const Book = mongoose.model("Book",schema);
module.exports = Book;
