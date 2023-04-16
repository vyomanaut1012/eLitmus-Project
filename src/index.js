const express=require("express");
const bodyParser=require("body-parser");
const path=require("path");
require('dotenv').config();
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");

//**************************** */
mongoose.connect("mongodb://127.0.0.1:27017/userData")
.then(()=>{
 console.log("connection with database successfully");
})
.catch((err)=>{
    console.log(err);
})
const db=mongoose.connection;
const app=express();
// ******************************/

const Registration = require("./model/schema.js")
const port=process.env.PORT || 5000;
const static_path=path.join(__dirname,"../Public");
const static2=path.join(__dirname,"../leaderboard");
app.use(bodyParser.json());
app.use(express.static(static_path));
app.use(express.static(static2));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));


app.post("/register", async(req,res)=>{
    try{
      const password=req.body.password;
      const confirmPassword=req.body.confirmPassword;
      if(password===confirmPassword){
        const name=req.body.name;
        const email=req.body.email; 
        const data = new Registration({
            "name": name,
            "email":email,
            "password":password,
            "confirmPassword":confirmPassword,
         })
         console.log(data);
         db.collection('registrations').insertOne(data,()=>(err,collection)=>{
            if(err) throw err;
                 console.log("Record inserted Successfully");
            });
         return res.redirect('pro0.html');
      }
      else{
        res.send("enter the same passward");
      }
    }
    catch(err){
      res.send(err);
    }
})


app.get("/", (req,res)=>{  
    res.set({
        "Access-control-Allow-Origin":"*"
    });
    return res.redirect("index.html");
})


app.get("/login",(req,res)=>{
  return res.redirect("login.html");
})


app.get("/test", async (req,res)=>{
  try{
     const data=await Registration.find().sort({"score":-1});
     res.send(data);
  }
  catch(err){
      res.send(err);
  }
})


app.post("/enter",async(req,res)=>{
  try{
    const email=req.body.emailId;
    const password=req.body.pswd;
 
    const usermail=await Registration.findOne({email: email});
    if(usermail.password===password){
//*************************************************************************** */
      // res.status(200).render("index.html");
      // res.send("hi hello kaise ho aap log");
  
      // jwt.sign({user},secretKey,{expiresIn:"3000s"},(err,token)=>{
      //   res.send({token});
      // })
      // const access_token=jwt.sign({_id:'643a95470f2c5ec5cfb2616c'}, process.env.JWT_ACCESS_SECRET, {expiresIn:process.env.JWT_ACCESS_TIME})
      // // return res.json({status:true,message:"login success",data:{access_token}});
      // console.log(access_token);
     
//************************************************************************** */
    const createToken = async()=>{
        const token = await jwt.sign({sub:password}, "mynameisvinodbahadurthapayoutuber", {
            expiresIn: "2 seconds"
         });
        // console.log(token);
        const userver = await jwt.verify(token, "mynameisvinodbahadurthapayoutuber");
        // console.log(userver);
      }
      createToken();
      return res.redirect(`pro${usermail.score}.html`);
    }
    else{
     res.send("invalid login details");
    }
  }catch(err){
    res.send(err);
  }
});
//**************************************** */


app.post("/ans0", async(req,res)=>{
    const answer=req.body.answer;
    if(answer=="answer0"){
      return res.redirect('pro1.html');
    }
    else{
      return res.redirect('pro0.html');
    }
})


app.post("/ans1", async(req,res)=>{
  const answer=req.body.answer;
  if(answer=="answer1"){
    return res.redirect('pro2.html');
  }
  else{
    return res.redirect('pro1.html');
  }
})


app.post("/ans2", async(req,res)=>{
  const answer=req.body.answer;
  if(answer=="answer2"){
    return res.redirect('pro3.html');
  }
  else{
    return res.redirect('pro2.html');
  }
})


app.post("/ans3", async(req,res)=>{
  const answer=req.body.answer;
  if(answer=="answer3"){
    return res.redirect('pro4.html');
  }
  else{
    return res.redirect('pro3.html');
  }
})

app.post("/ans4", async(req,res)=>{
  const answer=req.body.answer;
  if(answer=="answer4"){
    return res.redirect('success.html');
  }
  else{
    return res.redirect('pro4.html');
  }
})
//******************************************* */


app.get("/leaderboard/leader", (req,res)=>{
    return res.redirect("leader.html");   
})


app.listen(port,()=>{
    console.log("connected succefullly with 5000");
})
