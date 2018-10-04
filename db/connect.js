var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect( "mongodb://127.0.0.1:27017/ToDoApptest"|| "mongodb://aditya:Aditya99@ds251179.mlab.com:51179/todoapp" , { useNewUrlParser: true });


module.exports = {mongoose};