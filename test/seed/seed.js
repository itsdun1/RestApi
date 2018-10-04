

const {ObjectID} = require("mongodb");
var {ToDo} = require("./../../models/ToDo");
var jwt = require("jsonwebtoken")
var {User} = require("./../../models/user")

const todos = [{
    _id:new ObjectID(),
    text: 'First test todo',
    completed:true
  }, {
    _id:new ObjectID(),
    text: 'Second test todo',
    completed:false
  }];

  first_user_id = new ObjectID();
  second_user_id= new ObjectID();
  const users = [{
    _id:first_user_id,
    email:"adityakalengp@gmail.com",
    password:"Aditya99",
    tokens:[{
      access:"auth"
 , 
    token:jwt.sign({_id:first_user_id,access:'auth'},'abc123').toString()
    }]
  

  },{
    _id:second_user_id,
    email:"adityakalengp22@gmail.com",
    password:'Aditya99'
    
  }]

  var populateusers = (done)=>{
    User.deleteMany({}).then(()=>{
      var userone = new User(users[0]).save()
      var usertwo = new User(users[1]).save()

      return Promise.all([userone,usertwo])
    }).then(()=>{
      done()
    })

  }
  
var populateTodo = (done)=> {
    ToDo.deleteMany({}).then(() => {
      return ToDo.insertMany(todos);
    }).then(() => done());
  };


  
  module.exports = {
      todos,
      populateTodo,
      users,
      populateusers
  }