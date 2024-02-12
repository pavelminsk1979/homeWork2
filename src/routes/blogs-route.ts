import {Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogs-repository";
import {authMiddleware} from "../middlewares/authMiddleware/authMiddleware";
import {nameValidationBlogs} from "../middlewares/blogsMiddelwares/nameValidationBlogs";
import {errorValidationBlogs} from "../middlewares/blogsMiddelwares/errorValidationBlogs";
import {descriptionValidationBlogs} from "../middlewares/blogsMiddelwares/descriptionValidationBlogs";
import {websiteUrlValidationBlog} from "../middlewares/blogsMiddelwares/websiteUrlValidationBlog";
import {RequestWithParams} from "../types/RequestWithParams";
import {IdStringGetAndDeleteModel} from "../models/IdStringGetAndDeleteModel";
import {RequestWithBody} from "../types/RequestWithBody";
import {CreateAndUpdateBlogModel} from "../models/CreateAndUpdateBlogModel";




export const blogsRoute = Router({})

const postValidationBlogs = ()=>[nameValidationBlogs,descriptionValidationBlogs,websiteUrlValidationBlog]



blogsRoute.get('/', (req: Request, res: Response) => {
    const blogs = blogsRepository.getBlogs()
    res.status(200).send(blogs)
})


blogsRoute.get('/:id', (req: RequestWithParams<IdStringGetAndDeleteModel>, res: Response) => {
debugger
    const blog = blogsRepository.findBlogById(req.params.id)
    if (blog) {
        res.status(200).send(blog)
    } else {
        res.sendStatus(404)
    }

})


blogsRoute.post('/', authMiddleware,postValidationBlogs(),errorValidationBlogs,(req: RequestWithBody<CreateAndUpdateBlogModel>, res: Response) => {
    const newBlog = blogsRepository.createBlog(req.body)
    res.status(201).send(newBlog)
})


//RequestWithParamsWithBody<IdStringGetAndDeleteModel, CreateAndUpdateBlogModel>
blogsRoute.put('/:id', authMiddleware,postValidationBlogs(),errorValidationBlogs,(req: Request, res: Response) => {
    const isUpdateBlog = blogsRepository.updateBlog(req.params.id,req.body)
    if(isUpdateBlog){
        res.sendStatus(204)
    }else {
        res.sendStatus(404)
    }
})


blogsRoute.delete('/:id', authMiddleware,(req: RequestWithParams<IdStringGetAndDeleteModel>, res: Response) => {
    const isBlogDelete = blogsRepository.deleteBlogById(req.params.id)
    if (isBlogDelete) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})















