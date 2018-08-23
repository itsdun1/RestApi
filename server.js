var {mongoose} = require("./db/connect");
var {ToDo} =require("./models/ToDo");
var {User} =require("./models/user");
var express = require("express");
var bodyparser = require("body-parser");
var app = express();

app.use(bodyparser.json());

app.post("/todos",(req,res)=>{

    console.log(req.body);
    var postm = new ToDo({
        text:req.body.text
    })
    // postm.save().then((data)=>{
    //     res.send(data)
    // },(err)=>{
        
    //     res.status(400).send(err);
    // })

    postm.save(function(err,data)
{
    if(err)
    {
        return(res.status(200).send(err));
    }
    else{
        res.send(data);
    }
})
})


app.listen(3000,()=>
{
    console.log("server has started");
})

module.exports = {app};




































































// var user1 = new User({
//     name:"Aditya Kale",
//     email:'adityakalengp@gmail.com'
// })

// user1.save().then((data)=>{
//     console.log(JSON.stringify(data,undefined,2));
// }),(err)=>{
//     console.log("cannot save new user")
// }

// var add = new ToDo({
//     text:'wash clothes',
//     completed:true,
//     completedAt:12-3-2918
// })

// add.save().then((data)=>{
//     console.log(JSON.stringify(data,undefined,2));
// }),(err)=>{
//     console.log("cannot be saved")
// };


