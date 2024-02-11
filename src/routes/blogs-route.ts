import {Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogs-repository";



export const blogsRoute = Router({})


blogsRoute.get('/', (req: Request, res: Response) => {
    const blogs = blogsRepository.getBlogs()
    res.status(200).send(blogs)
})

blogsRoute.get('/:id', (req: Request, res: Response) => {

    const blog = blogsRepository.findVideoById(req.params.id)
    if (blog) {
        res.status(200).send(blog)
    } else {
        res.sendStatus(404)
    }


    const blogs = blogsRepository.getBlogs()
    res.status(200).send(blogs)
})