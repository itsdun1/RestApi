const {SHA256} = require("crypto-js");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var message = {
    name:" my name is aditya"
};
var hash = SHA256(message).toString();
// console.log(hash);

var token = {
    id:5
}

var token = {
        hash : SHA256(JSON.stringify(token)+ "mysecreat").toString()
        //here mysecreat is  salt which is added to make hash stronger so that user cant create same hash without knowing the secreat salt
}
// console.log(token.hash);

var hash = jwt.sign(message,'123456');
// console.log(hash);

var verify = jwt.verify(hash,'123456');
// console.log(verify);

var s = " password";

bcrypt.genSalt(30,(err,salt)=>{
    bcrypt.hash(s,salt,(err,hash)=>{
if(err){

console.log(err)

}
console.log(hash)

    })
})