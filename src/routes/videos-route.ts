import {Request, Response} from "express";
import {Router} from "express";
import {GetVideoById} from "../models/GetVideoModel";
import {CreateVideo} from "../models/CreateVideoModel";
import {UpdateVideo} from "../models/UpdateVideoModel";
import {DeleteVideoById} from "../models/DeleteVideoModel";
import {videosRepository} from "../repositories/videos-repository";
import {body, validationResult} from "express-validator";

export const videosRoute = Router({})


type RequestWithParams<P> = Request<P, unknown, unknown, unknown>


type RequestWithBody<B> = Request<unknown, unknown, B, unknown>


type RequestWithParamsWithBody<P, B> = Request<P, unknown, B, unknown>

/*
type ErrorsMessage = {
    msg: string,
    type: string,
    value: string,
    path: string,
    location: string,
}
type ErrorType = { errors: ErrorsMessage[] }

*/



const titleValidation = body('title').trim().isString().isLength({min: 1, max: 40}).withMessage('Incorrect title')

const authorValidation =   body('author').trim().isString().isLength({min: 1, max: 20}).withMessage('Incorrect author')

videosRoute.get('/', (req: Request, res: Response) => {
    const videos = videosRepository.getVideos()
    res.status(200).send(videos)
})


videosRoute.get('/:id', (req: RequestWithParams<GetVideoById>, res: Response) => {
    let video = videosRepository.findVideoById(+req.params.id)
    if (video) {
        res.status(200).send(video)
    } else {
        res.sendStatus(404)
    }
})

    //RequestWithBody<CreateVideo>
videosRoute.post('/', titleValidation,authorValidation,
    (req: Request, res: Response) => {
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()})
        } else {
            let newVideo = videosRepository.createVideo(req.body)
            res.status(201).send(newVideo)
        }
})


videosRoute.put('/:id', (req: RequestWithParamsWithBody<GetVideoById, UpdateVideo>, res: Response) => {
    let errors = videosRepository.findErrors(req.body)
    if (errors.errorsMessages.length) {
        res.status(400).send(errors)
    } else {
        let isUpdateVideo = videosRepository.updateVideo(+req.params.id, req.body)
        if (isUpdateVideo) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    }

})


videosRoute.delete('/:id', (req: RequestWithParams<DeleteVideoById>, res: Response) => {
    let video = videosRepository.deletVideoById(+req.params.id)
    if (video) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})


