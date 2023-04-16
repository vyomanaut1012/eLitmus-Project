const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/userData")
.then(()=>{
 console.log("connection with database successfully");
})
.catch((err)=>{
    console.log(err);
})
