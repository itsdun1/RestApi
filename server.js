var {mongoose} = require("./db/connect");
var {ToDo} =require("./models/ToDo");
var {User} =require("./models/user");
var express = require("express");
var {authenticate} = require("./middleware/authenticate");
var bodyparser = require("body-parser");
var app = express();
var {ObjectID} = require("mongodb");
var lodash = require("lodash");
app.use(bodyparser.json());
var port = process.env.PORT || 3000;
app.post("/todos",(req,res)=>{

    // console.log(req.body);
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
            res.status(404).send({})
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
            res.status(404).send({})
        }
        ToDo.findByIdAndRemove(req.params.id).then((data)=>{
            if(data)
            {
                res.status(200).send({data})
            }
            else{
                res.status(404).send({data})
            }

        }).catch((e)=>
        {
            res.status(404).send({})
        })
})

app.patch('/todos/:id',(req,res)=>{
    var id = req.params.id;
    var body = lodash.pick(req.body,  ['text','completed'])
    if(lodash.isBoolean(body.completed) && body.completed)
    {
        body.completedAt = new Date().getTime();
    }
    else{
        body.completed = false;
        body.completedAt = null;
    }

    ToDo.findByIdAndUpdate(id,{$set:body},{new:true}).then((data)=>{
            if(!data)
            {
                res.status(404).send({});
            }
            
            else{
                res.status(200).send({data});
            }

    }).catch((e)=>{

        res.status(404).send({})
    })

})


app.post("/user",(req,res)=>{

    var body = lodash.pick(req.body,['email','password']);
    var user = new User(body);
    user.save().then((data)=>{
      return  user.generateAuthToken();
       
       
       
       
        // if(!data)
        // {
        //     res.status(404).send({})
        // }
        // else{
        //     res.status(200).send({data});
        // }
    }).then((token)=>{
        res.header('x-auth',token).send(user);

    }).catch((E)=>{
        res.status(404).send(E);
    })

})

// var authenticate = (req,res,next)=>{
//     var token = req.header('x-auth');

//     User.findbyToken(token).then((user)=>{

//         if(!user){

//            return Promise.reject();

//         }

//        req.user = user;
//        req.token = token;
//        next();

//     }).catch((e)=>{
//         res.status(401).send();
//     })


// }


app.get("/user/me",authenticate,(req,res)=>{
    res.send(req.user);
})

app.listen( port,()=>
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


