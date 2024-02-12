import { Request, Response} from "express";
import {Router} from "express";
import {GetVideoById} from "../models/GetVideoModel";
import {CreateVideo} from "../models/CreateVideoModel";
import {DeleteVideoById} from "../models/DeleteVideoModel";
import { videosRepository} from "../repositories/videos-repository";
import {titleValidation} from "../middlewares/titleValidation";
import {authorValidation} from "../middlewares/authorValidation";
import {errorValidation} from "../middlewares/errorValidation";
import {minAgeRestrictionValidation} from "../middlewares/minAgeRestrictionValidation";
import {canBeDownloadedValidation} from "../middlewares/canBeDownloadedValidation";
import {publicationDateValidation} from "../middlewares/publicationDateValidation";
import {availableResolutionsValidation} from "../middlewares/availableResolutionsValidation";
import {UpdateVideo} from "../models/UpdateVideoModel";

export const videosRoute = Router({})


type RequestWithParams<P> = Request<P, unknown, unknown, unknown>


type RequestWithBody<B> = Request<unknown, unknown, B, unknown>


type RequestWithParamsWithBody<P, B> = Request<P, unknown, B, unknown>


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


videosRoute.post('/', titleValidation, authorValidation, errorValidation,
    (req: RequestWithBody<CreateVideo>, res: Response) => {
        let newVideo = videosRepository.createVideo(req.body)
        res.status(201).send(newVideo)
    })


//RequestWithParamsWithBody<GetVideoById, UpdateVideo>
videosRoute.put('/:id', titleValidation, authorValidation,
    minAgeRestrictionValidation,
    canBeDownloadedValidation,
    publicationDateValidation,
    availableResolutionsValidation, errorValidation,
    (req: Request, res: Response) => {
        let isUpdateVideo = videosRepository.updateVideo(+req.params.id, req.body)
        if (isUpdateVideo) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
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


