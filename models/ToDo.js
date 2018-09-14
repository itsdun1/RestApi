var mongoose = require("mongoose");

var ToDo = mongoose.model("ToDo",{
    text:{
        type:String,
        
    },

    completed:{
        type:Boolean
    },
    completedAt:{
        type:Number
    }
})

module.exports = {ToDo};