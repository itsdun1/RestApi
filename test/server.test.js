var expect = require("expect");
var request = require("supertest");
var {ToDo} = require("./../models/ToDo");
var {app} = require("./../server");

beforeEach((done)=>{
    ToDo.deleteMany({}).then(()=>{
        done();
    })
})

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
                return done(e);

            }

            ToDo.find().then((data)=>{
                    expect(data.length).toBe(1);
                    expect(data[0].text ).toBe(text);   
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
                expect(data.length).toBe(1);
                done();
            }).catch((e)=>
            {
                done(e);
            })
        })

    })

})