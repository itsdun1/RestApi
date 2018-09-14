var {User} = require("../models/user");
var {mongoose} = require("../db/connect")
var{ObjectID} = require("mongoose");


var id = '5b77ee7272148e18e4409b0c';
mongoose.set('useCreateIndex', true);

User.findById(id).then((data)=>{

    if(!data)
    {
        console.log("userb does not exist ");
    }
    else{
        console.log(data);
    }
}).catch((e)=>{

    console.log(e)
})
