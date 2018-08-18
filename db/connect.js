var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/ToDoApp", { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {mongoose};