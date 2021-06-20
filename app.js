
const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");


const bcrypt = require('bcrypt');


const saltRound = 10;

const app=express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended:true

}));


mongoose.connect("mongodb://localhost:27017/myloginDB",{useNewUrlParser:true , useUnifiedTopology:true,useCreateIndex: true}).then(() => console.log("Database connected!"))
.catch(err => console.log(err));
;


const loginSchema={
    fname:String,
    lname:String,
    email:String,
    password:String,
    no:Number
}

const feedbackSchema={
    feedback:String
}

const Query = new mongoose.model("Query",feedbackSchema);

const Deepak = new mongoose.model("Deepak",loginSchema);

app.get("/", function(req,res){
    res.sendFile(__dirname+ "/index.html")
});

app.get("/sirte", function(req,res){
    res.sendFile(__dirname+ "/SIRTE.html")
});

app.get("/sirtm", function(req,res){
    res.sendFile(__dirname+ "/SIRTM.html")
});

app.get("/sirts", function(req,res){
    res.sendFile(__dirname+ "/SIRTS.html")
});


app.get("/about", function(req,res){
    res.sendFile(__dirname+ "/about.html")
});

app.get("/contact", function(req,res){
    res.sendFile(__dirname+ "/contact.html")
});

app.get("/Gallery", function(req,res){
    res.sendFile(__dirname+ "/Gallery.html")
});

app.get("/feedback", function(req,res){
    res.sendFile(__dirname+ "/feedback.html")
});

app.post('/feedback',(req,res)=>{

    const newFeedback= new Query({
         feedback : req.body.opinion

    });

    newFeedback.save(err=>{

     if(err){
          console.log(err)
        }      
        else{

    res.sendFile(__dirname + "/feedback.html")
    console.log('successfuly inserted ur query in database')
}

    });
    
});

app.get("/login", function(req,res){
    res.sendFile(__dirname+ "/login.html")

});

app.get("/signup", function(req,res){
    res.sendFile(__dirname+ "/signup.html")
});


app.get("/SIRTM", function(req,res){
    res.sendFile(__dirname+ "/SIRTM.html")
});


app.get("/first", function(req,res){
    res.sendFile(__dirname+ "/first.html")
});
app.post("/signup",function(req,res){
    bcrypt.hash(req.body.password,saltRound,(err,hashedPassword)=>{

        const newDeepak=new Deepak({
             fname:req.body.fname,
             lname:req.body.lname,
             email:req.body.email,
             password:hashedPassword, 
             no:req.body.no
    
        });
        newDeepak.save(function(err){
            if(err){
                console.log(err);
            } else{
                res.sendFile(__dirname + "/first.html")
            }
        });
    });
});

app.post("/login",function(req,res){
    const userEmail=req.body.email;
    const userpassword=req.body.password;

    Deepak.findOne({email:userEmail}, function(err,foundUser){

        if(err){
            // res.sendFile(__dirname + "/main.html")
            console.log(err);
        }
         else
         {
            if(foundUser){
                bcrypt.compare(userpassword,foundUser.password,(err,result)=>{
                    if(result==true){
                        res.sendFile(__dirname + "/first.html")
                    }else{
                        //res.sendFile(__dirname + "/main.html");
                        console.log(err);
    
                    }
        
                })
                
            }
        }
  

    });


});

app.listen(30000,function(){
    console.log("on 3000");
});

