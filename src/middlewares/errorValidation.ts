import {NextFunction, Request, Response} from "express";
import { validationResult} from "express-validator";


type ErrorsMessage = {
    msg: string,
    type: string,
    value: string,
    path: string,
    location: string,
}
type ErrorType = { errors: ErrorsMessage[] }

export const errorValidation = (req: Request, res: Response, next: NextFunction) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()})
    } else {
        next()
    }
}