var expect = require("expect");
var request = require("supertest");
var {ToDo} = require("./../models/ToDo");
var {app} = require("./../server");
var {ObjectID} = require("mongodb");
var {todos } = require("./seed/seed");
var {populateTodo,users,populateusers} = require("./seed/seed");
var {User} = require("./../models/user")

// const todos = [{
//     _id:new ObjectID(),
//     text: 'First test todo'
//   }, {
//       _id:new ObjectID,
//     text: 'Second test todo'
//   }];


// beforeEach((done)=>{
//     ToDo.deleteMany({}).then(()=>{
//         return ToDo.insertMany(todos);
//     }).then(()=>{
//         done();
//     })
// })


// const todos = [{
//     _id:new ObjectID(),
//     text: 'First test todo',
//     completed:true
//   }, {
//     _id:new ObjectID(),
//     text: 'Second test todo',
//     completed:false
//   }];
  
//   beforeEach((done) => {
//     ToDo.deleteMany({}).then(() => {
//       return ToDo.insertMany(todos);
//     }).then(() => done());
//   });

beforeEach(populateTodo);
beforeEach(populateusers);
describe("server test",()=>{

    it('it should send the data via post request ',(done)=>{
        var text = "this is from mocha";

        request(app)
        .post("/todos")
        .send({text})
        .expect(200)
        .expect((res)=>{
                expect(res.body.text ).toBe(text);
                // expect(res.body.text).toBeA('String');
        })
        .end((err,res)=>{
            if(err)
            {
                return done(err);

            }

            ToDo.find({text}).then((data)=>{
                    expect(data.length).toBe(1);
                    // expect(data[0].text ).toBe(text);   
                    done();            
            }).catch((e)=>{
                done(e);
            })
        })


    })



})


describe("exercise empty",()=>{
    it("should send empty string",(done)=>{
        request(app)
        .post("/todos")
        .send({})
        .expect(200)
        .end((err,res)=>{
            if(err)
            {
                return done(err);
            }
            ToDo.find().then((data)=>{
                expect(data.length).toBe(3);
                done();
            }).catch((e)=>
            {
                done(e);
            })
        })

    })

})


// describe("get request",()=>{
//   it("should get data by get request",(done)=>{

//     request(app)
//         .get("/todos")
//         .expect(200)
//         .expect((res)=>{
//             // expect(res.body.todos[0].text).toBeA(String);
//             // expect(res.body.length).toBe(2);
//             console.log(res.body);
//         }).end(done);

//   })
    
// })


describe('GET /todos', () => {
    it('should get all todos', (done) => {
      request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
          expect(res.body.data.length).toBe(2);
        })
        .end(done);
    });
 
it("should return correct id data",(done)=>{
    request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.data.text).toBe(todos[0].text);
        }).end(done);

})

it("should return a 404 if todo is nmot found",(done)=>{
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
})

it("should return 404 if invalid id id foun=s",(done)=>{
    request(app)
    .get("/todos/2345")
    .expect(404)
    .end(done);
})



});

describe("it should delete specified todo ",()=>{

    it("should remove a todo",((done)=>{
            request(app)
                .delete(`/todos/${todos[0]._id.toHexString()}`)
                .expect(200)
                .expect((res)=>{
                    console.log(res.body.data._id,"this is gap ",todos[0]._id.toHexString());
                    expect(res.body.data._id).toBe(todos[0]._id.toHexString());

                }).end((err,res)=>{

                    if(err)
                    {
                        return done(err);
                    }

                    ToDo.findById(todos[0]._id.toHexString()).then((data)=>{
                        expect(data).toNotExist();
                        done();
                    }).catch((e)=>{
                            done(e);
                    })
                })


    }))

    it("should return a 404 if todo not found",(done)=>{
            request(app)
            .delete(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);


    })

    it("should return a 404 when object id is invalid",(done)=>{
            request(app)
            .delete(`/todos/12662`)
            .expect(404)
            .end(done)

    })
})
  
describe("it should update the todos",()=>{

    it("should updatre the todo",((done)=>{
            request(app)
            .patch(`/todos/${todos[0]._id.toHexString()}`)
            .send({
                text:"wash cloths 2050",
                completed:true
            })
            .expect(200)
            .expect((res)=>{
                expect(res.body.data.completed).toBe(true);
                expect(res.body.data.completedAt).toBeA('number');
                done()

            }).end((err,res)=>{

                if(err)
                {
                    return done(err);
                }

                ToDo.findById(todos[0]._id.toHexString()).then((data)=>{

                    expect(data.text).toBe("wash cloths 2050");
                }).catch((e)=>
                {
                    done(e);
                })
            })


    }))

    it("should clear completed at when  todo is not complete",((done)=>{
        request(app)
        .patch(`/todos/${todos[1]._id.toHexString()}`)
        .send({
            text:"ha ha ha",
            completed:false
        })
        .expect(200)
        .expect((res)=>{
            expect(res.body.data.text).toBe("ha ha ha");
            expect(res.body.data.completedAt).toNotExist();
            done()
        }).end((err,res)=>{
                if(err)
                {
                    done(err);
                }

                ToDo.findById(todos[1]._id.toHexString()).then((data)=>{
                    expect(data.text).toBe("ha ha ha")
                }).catch((e)=>{
                        done(e);
                })
        })

    }))

})

describe("/GET/users/me",()=>{

    it("should authenticate user with corrected user",((done)=>{

        request(app).
        get("/user/me").
        set('x-auth',users[0].tokens[0].token).
        expect(200)
        .expect((res)=>{
            expect(res.body._id).toBe(users[0]._id.toHexString());
            expect(res.body.email).toBe(users[0].email);
        })
        .end(done)

    }))

    it("should send 401 to unauthorized user",(done)=>{
        request(app)
        .get("/user/me")
        .expect(401)
        .expect((res)=>{
            expect(res.body).toEqual({});
        })
        .end(done)
    })
})


describe("POST/user",()=>{

    var email_user = 'adityakalengp123@gmail.com';
    var password_user = 'Aditya99'
    it("should create an user",(done)=>{
        request(app)
        .post("/user")
        .send({email:email_user,password:password_user})
        .expect(200)
        .expect((res)=>{
            expect(res.headers['x-auth']).toExist()
            expect(res.body._id).toExist()
            expect(res.body.email).toBe(email_user)
        })
        .end((err)=>{
            if(err)
            {
                return(done(err))
            }

            User.findOne({email:email_user}).then((data)=>{
                expect(data).toExist()
                expect(data.password).toNotBe(password_user)
                expect(data.email).toBe(email_user)
                done()
            })
            
        })

    })


    it("should return validation error if  request invalid",(done)=>{

        request(app)
        .post('/user')
        .send({
            email:'ddhdhhd',
            password:"ssk"
        })
        .expect(404)
        .end(done)
    })

    it("should not create user when email is in use",(done)=>{
        request(app)
        .post("/user")
        .send({email:'adityakalengp@gmail.com',
        password:'adsdds'})
        .expect(404)
        .end(done)
    })
})