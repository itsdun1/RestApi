var mongoose = require("mongoose");
var validator = require("validator");
const jwt = require("jsonwebtoken");
var lodash = require("lodash");
var bcrypt = require("bcryptjs")
var userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        minlength:6,
        trim:true,
        unique:true,
        validate: {
            validator:(value)=>{
                return validator.isEmail(value);
            },
            message:`{value} is not a valid email`
        }
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    tokens:[{
        access:{
            type:String,
            required:true

        }
        ,
        token:{
            type:String,
            required:true
        }
    }]


})

userSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
  
    return lodash.pick(userObject, ['_id', 'email']);
  };


userSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth';
    var token =  jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
    user.tokens = user.tokens.concat([{access,token}]);
    return user.save().then(()=>{
        return token;

    })

}

userSchema.statics.findbyToken = function(token){

    var User = this;
    var decoded;
    try{
        decoded = jwt.verify(token,'abc123');

    }catch(e)
    {
        return Promise.reject(); 
        // console.log(e)      
    }   
// console.log(User,token);
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
      });

}

userSchema.pre('save',function(next){
    user = this;
    if(user.isModified('password')){
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(user.password,salt,(err,hash)=>{
                    // console.log(hash)
                    user.password = hash;
                    next()
                })
            })

    }else{
        next()
    }

})

var User = mongoose.model('User',userSchema)

module.exports = {User};