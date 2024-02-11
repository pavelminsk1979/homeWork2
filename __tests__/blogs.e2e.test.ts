import {agent as supertest} from "supertest";
import {app} from "../src/settings";


const  req = supertest(app)

describe('/blogs',()=>{

    beforeAll(async ()=>{
        await req
            .delete ('/testing/all-data')
    })

    it('get content blogs',async ()=>{
        const res = await req
            .get('/blogs')
            .expect(200)

        expect(res.body).toEqual([])
        console.log(res.body)
    })
//доделать тест на get запрос по Id которая есть , и по Id корой несуществует
})