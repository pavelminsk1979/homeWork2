import {NextFunction, Request, Response} from "express";
import {validationResult, ValidationError} from "express-validator";


export const errorValidationBlogs = (req: Request, res: Response, next: NextFunction) => {
    const formatedErrors = validationResult(req)
        .formatWith((error: ValidationError) => ({
            message: error.msg,
            field: error.type === 'field' ? error.path : 'not found field'
        }))
    if (formatedErrors.isEmpty()) {
        next()
    } else {
        res.status(400).json({errorsMessages: formatedErrors.array({onlyFirstError:true})})
    }
}