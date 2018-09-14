var expect = require("expect");
var request = require("supertest");
var {ToDo} = require("./../models/ToDo");
var {app} = require("./../server");

// const todos = [{
//     text: 'First test todo'
//   }, {
//     text: 'Second test todo'
//   }];


// beforeEach((done)=>{
//     ToDo.deleteMany({}).then(()=>{
//         return ToDo.insertMany(todos);
//     }).then(()=>{
//         done();
//     })
// })


const todos = [{
    text: 'First test todo'
  }, {
    text: 'Second test todo'
  }];
  
  beforeEach((done) => {
    ToDo.deleteMany({}).then(() => {
      return ToDo.insertMany(todos);
    }).then(() => done());
  });


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
          expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
  });
  