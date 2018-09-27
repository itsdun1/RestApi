var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect( "mongodb://localhost:27017/ToDoApp"|| "mongodb://aditya:Aditya99@ds251179.mlab.com:51179/todoapp" , { useNewUrlParser: true });


module.exports = {mongoose};