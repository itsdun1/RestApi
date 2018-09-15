var {mongoose} = require("./db/connect");
var {ToDo} =require("./models/ToDo");
var {User} =require("./models/user");
var express = require("express");
var bodyparser = require("body-parser");
var app = express();
var {ObjectID} = require("mongodb");
app.use(bodyparser.json());
// var port = process.env.PORT || 3000;
app.post("/todos",(req,res)=>{

    console.log(req.body);
    var postm = new ToDo({
        text:req.body.text
    })
    postm.save().then((data)=>{
        res.send(data)
    },(err)=>{
        
        res.status(400).send(err);
    })

//     postm.save(function(err,data)
// {
//     if(err)
//     {
//         return(res.status(400).send(err));
//     }
//     else{
//         res.send(data);
//     }
// })
})


app.get("/todos",(req,res)=>{
    ToDo.find().then((data)=>{

        res.send({data});
    }),(err)=>{

        res.status(400).send(err);
    }
})


app.get("/todos/:id",(req,res)=>{
    var id = req.params.id;
    // if(!ObjectId.isValid(id))
    // {
    //     return res.status(404).send({})
    // }
    if(!ObjectID.isValid(id))
    {
            res.status(404).send({text:"user not exist"})
    }

    ToDo.findById(id).then((data)=>{

        if(!data)
        {
            res.status(404).send({});
        }
        else{
           res.send({data});
        }
    }).catch((e)=>{

        res.status(404).send({});
      
    })
        
})

app.delete("/todos/:id",(req,res)=>{

        if(!ObjectID.isValid(req.params.id))
        {
            res.status(404).send({text:"not found"})
        }
        ToDo.findByIdAndRemove(req.params.id).then((data)=>{
            if(data)
            {
                res.status(200).send(data)
            }
            else{
                res.status(404).send(data)
            }

        }).catch((e)=>
        {
            res.status(404).send({})
        })
})

app.listen(process.env.PORT || 3000,()=>
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


