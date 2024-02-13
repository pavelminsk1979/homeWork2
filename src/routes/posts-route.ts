import {Request, Response, Router} from "express";
import {STATUS_CODE} from "../constant-status-code";
import {postsRepository} from "../repositories/posts-repository";
import {RequestWithParams} from "../types/RequestWithParams";
import {IdStringGetAndDeleteModel} from "../models/IdStringGetAndDeleteModel";
import {RequestWithBody} from "../types/RequestWithBody";
import {CreatePostModel} from "../models/CreatePostModel";
import {titleValidationPosts} from "../middlewares/postsMiddlewares/titleValidationPosts";
import {authMiddleware} from "../middlewares/authMiddleware/authMiddleware";
import {shortDescriptionValidationPosts} from "../middlewares/postsMiddlewares/shortDescriptionValidationPosts";
import {contentValidationPosts} from "../middlewares/postsMiddlewares/contentValidationPosts";
import {blogIdValidationPosts} from "../middlewares/postsMiddlewares/blogIdValidationPosts";
import {errorValidationBlogs} from "../middlewares/blogsMiddelwares/errorValidationBlogs";


export const postsRoute = Router ({})

const createValidationPosts = ()=>[titleValidationPosts,shortDescriptionValidationPosts,contentValidationPosts,blogIdValidationPosts]

postsRoute.get('/', (req: Request, res: Response) => {
    const posts = postsRepository.getPosts()
    res.status(STATUS_CODE.CODE_200).send(posts)
})


postsRoute.get('/:id', (req: RequestWithParams<IdStringGetAndDeleteModel>, res: Response) => {
    const post = postsRepository.findPostById(req.params.id)
    if(post){
        res.status(STATUS_CODE.CODE_200).send(post)
    } else { res.sendStatus(STATUS_CODE.CODE_404)}

})

postsRoute.post('/',authMiddleware,createValidationPosts(),errorValidationBlogs,(req: RequestWithBody<CreatePostModel>, res: Response) => {
const newPost = postsRepository.createPost(req.body)
    res.status(STATUS_CODE.CODE_201).send(newPost)
})