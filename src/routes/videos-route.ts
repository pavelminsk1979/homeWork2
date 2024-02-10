import {NextFunction, Request, Response} from "express";
import {Router} from "express";
import {GetVideoById} from "../models/GetVideoModel";
import {CreateVideo} from "../models/CreateVideoModel";
import {UpdateVideo} from "../models/UpdateVideoModel";
import {DeleteVideoById} from "../models/DeleteVideoModel";
import {AvailableResolutions, videosRepository} from "../repositories/videos-repository";
import {validationResult} from "express-validator";
import {titleValidation} from "../middlewares/titleValidation";
import {authorValidation} from "../middlewares/authorValidation";
import {errorValidation} from "../middlewares/errorValidation";
import {body} from "express-validator";

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


videosRoute.put('/:id', titleValidation, authorValidation,

    body('minAgeRestriction').optional().trim().isLength({min: 1, max: 18}).withMessage('min1,max 18'),
    body('canBeDownloaded').optional().custom((value) => typeof value === 'boolean').withMessage('boolean value'),
    body('publicationDate').optional().custom((value) => typeof value === 'string').withMessage('Date value, type string'),
    body('availableResolutions').optional().custom((value, {req}) => {
        if (Array.isArray(value)) {
            value.forEach(e => {
                if (!(e in AvailableResolutions)) {
                    throw new Error('Incorrect availableResolutions');
                }
            })
        } else {
            req.body.availableResolutions = []
        }
    }).withMessage('Incorrect availableResolutions'),
    (req: Request, res: Response) => {
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()})
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


/*

videosRoute.put('/:id',titleValidation, authorValidation,
    body('minAgeRestriction').trim().isLength({min: 1, max: 18}).withMessage('min1,max 18'),
    body('canBeDownloaded').custom((value) => typeof value === 'boolean').withMessage('boolean value'),
    body('publicationDate').custom((value) => typeof value === 'string').withMessage('Date value, type string'),
    body('availableResolutions').custom((value,{req}) =>{
        if(Array.isArray(value)){
            value.forEach(e => {
                if (!(e in AvailableResolutions)) {
                    throw new Error('Incorrect availableResolutions');
                }
            })
        }else{req.body.availableResolutions=[]}
    }).withMessage('Incorrect availableResolutions'),
    //RequestWithParamsWithBody<GetVideoById, UpdateVideo>
    (req: Request, res: Response) => {
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()})
        }
        /!*  let errors = videosRepository.findErrors(req.body)
          if (errors.errorsMessages.length) {
              res.status(400).send(errors)
          }*!/ else {
            let isUpdateVideo = videosRepository.updateVideo(+req.params.id, req.body)
            if (isUpdateVideo) {
                res.sendStatus(204)
            } else {
                res.sendStatus(404)
            }
        }

    })*/
