var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://aditya:Aditya99@ds251179.mlab.com:51179/todoapp" || "mongodb://localhost:27017/ToDoApp", { useNewUrlParser: true });


module.exports = {mongoose};