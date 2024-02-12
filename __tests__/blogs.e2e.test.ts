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

    })


    const loginPasswordBasic64='YWRtaW46cXdlcnR5'

    it('- POST does not create the newBlog with incorrect data (no name, no description, no websiteUrl)', async ()=> {
        const res =await req
            .post('/blogs')
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .send({ name: '', description: '',websiteUrl:'' })
            .expect(400)

        expect(res.body).toEqual({  errorsMessages: [
                { message: 'Incorrect name', field: 'name' },
                { message: 'Incorrect description', field: 'description' },
                { message: 'Incorrect websiteUrl', field: 'websiteUrl' },
            ]})


        const getRes = await req.get('/videos/')
        expect(getRes.body).toEqual([])
    })

    let idNewBlog:string

    it('POST create newBlog',async ()=>{
        const res =await req
            .post('/blogs')
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .send({ name: 'name',
                description: 'description',
                websiteUrl:'https://www.outue.com/'})
            .expect(201)

        idNewBlog=res.body.id

        expect(res.body.name).toEqual('name')
        expect(res.body.description).toEqual('description')
        expect(res.body.websiteUrl).toEqual('https://www.outue.com/')
    })

    it('Get blog bu incorrect id',async ()=>{
        const res =await req
            .get('/blogs/12345')
        .expect(404)

    })


    it('get content blogs',async ()=>{
        const res = await req
            .get('/blogs')
            .expect(200)
        console.log(res.body)

    })

    it('Get blog bu correct id',async ()=>{
        const res =await req
            .get('/blogs/'+idNewBlog)
             .expect(200)

         expect(res.body.name).toEqual('name')
         expect(res.body.description).toEqual('description')
         expect(res.body.websiteUrl).toEqual('https://www.outue.com/')

    })


    it('- PUT blog by incorrect ID ', async () => {

        await req
            .put('/blogs/1223')
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .send({ name: 'updateName',
                description: 'updateDescription',
                websiteUrl:'https://www.outue.updateCom/'})
            .expect(404)

        const getRes =await req
            .get('/blogs/')
        expect(getRes.body.length).toBe(1)
        expect(getRes.body[0].name).toEqual('name')
        expect(getRes.body[0].description).toEqual('description')
        expect(getRes.body[0].id).toEqual(idNewBlog)
    })


    it('+ PUT blog by correct ID ', async () => {

        await req
            .put('/blogs/'+idNewBlog)
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .send({ name: 'updateName',
                description: 'updateDescription',
                websiteUrl:'https://www.outue.updateCom/'})
            .expect(204)

        const getRes =await req
            .get('/blogs/')
        expect(getRes.body.length).toBe(1)
        expect(getRes.body[0].name).toEqual('updateName')
        expect(getRes.body[0].description).toEqual('updateDescription')
        expect(getRes.body[0].websiteUrl)
            .toEqual('https://www.outue.updateCom/')
    })


    it('- PUT blog by correct ID and incorrect data ', async () => {

        const res=await req
            .put('/blogs/'+idNewBlog)
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .send({ name: 'updateNameupdateNameupdateNameupdateName',
                description: '',
                websiteUrl:'htt-updateCom'})
            .expect(400)
        expect(res.body).toEqual({  errorsMessages: [
                { message: 'Incorrect name', field: 'name' },
                { message: 'Incorrect description', field: 'description' },
                { message: 'Incorrect websiteUrl', field: 'websiteUrl' },
            ]})

        const getRes =await req
            .get('/blogs/')
        expect(getRes.body[0].name).toEqual('updateName')
        expect(getRes.body[0].description).toEqual('updateDescription')
        expect(getRes.body[0].websiteUrl)
            .toEqual('https://www.outue.updateCom/')
    })



    it('- DELETE blog by incorrect ID', async () => {
        await req
            .delete('/blogs/888')
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .expect(404)

        const getRes =  await req
            .get('/blogs')
        expect(getRes.body[0].name).toEqual('updateName')
        expect(getRes.body[0].description).toEqual('updateDescription')
        expect(getRes.body[0].websiteUrl)
            .toEqual('https://www.outue.updateCom/')

    })


    it('+ DELETE blog by incorrect ID', async () => {
        await req
            .delete('/blogs/'+idNewBlog)
            .set('Authorization', `Basic ${loginPasswordBasic64}`)
            .expect(204)

        const getRes =  await req
            .get('/blogs')
        expect(getRes.body.length).toBe(0)

    })



})