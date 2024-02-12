import { Request, Response} from "express";
import {Router} from "express";
import { IdNumberGetAndDeleteModel} from "../models/IdNumberGetAndDeleteModel";
import {CreateVideo} from "../models/CreateVideoModel";
import { videosRepository} from "../repositories/videos-repository";
import {titleValidation} from "../middlewares/titleValidation";
import {authorValidation} from "../middlewares/authorValidation";
import {errorValidation} from "../middlewares/errorValidation";
import {minAgeRestrictionValidation} from "../middlewares/minAgeRestrictionValidation";
import {canBeDownloadedValidation} from "../middlewares/canBeDownloadedValidation";
import {publicationDateValidation} from "../middlewares/publicationDateValidation";
import {availableResolutionsValidation} from "../middlewares/availableResolutionsValidation";
import {RequestWithParams} from "../types/RequestWithParams";
import {RequestWithBody} from "../types/RequestWithBody";
import {STATUS_CODE} from "../constant-status-code";



export const videosRoute = Router({})


type RequestWithParamsWithBody<P, B> = Request<P, unknown, B, unknown>


videosRoute.get('/', (req: Request, res: Response) => {
    const videos = videosRepository.getVideos()
    res.status(STATUS_CODE.CODE_200).send(videos)
})


videosRoute.get('/:id', (req: RequestWithParams<IdNumberGetAndDeleteModel>, res: Response) => {
    let video = videosRepository.findVideoById(+req.params.id)
    if (video) {
        res.status(STATUS_CODE.CODE_200).send(video)
    } else {
        res.sendStatus(STATUS_CODE.CODE_404)
    }
})


videosRoute.post('/', titleValidation, authorValidation, errorValidation,
    (req: RequestWithBody<CreateVideo>, res: Response) => {
        let newVideo = videosRepository.createVideo(req.body)
        res.status(STATUS_CODE.CODE_201).send(newVideo)
    })


//RequestWithParamsWithBody<IdNumberGetAndDeleteModel, UpdateVideoModel>
videosRoute.put('/:id', titleValidation, authorValidation,
    minAgeRestrictionValidation,
    canBeDownloadedValidation,
    publicationDateValidation,
    availableResolutionsValidation, errorValidation,
    (req: Request, res: Response) => {
        let isUpdateVideo = videosRepository.updateVideo(+req.params.id, req.body)
        if (isUpdateVideo) {
            res.sendStatus(STATUS_CODE.CODE_204)
        } else {
            res.sendStatus(STATUS_CODE.CODE_404)
        }
    })


videosRoute.delete('/:id', (req: RequestWithParams<IdNumberGetAndDeleteModel>, res: Response) => {
    let video = videosRepository.deletVideoById(+req.params.id)
    if (video) {
        res.sendStatus(STATUS_CODE.CODE_204)
    } else {
        res.sendStatus(STATUS_CODE.CODE_404)
    }
})


