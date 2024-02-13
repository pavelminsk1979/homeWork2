
import {body} from "express-validator";


export const blogIdValidationPosts = body('blogId')
    .exists()
    .trim()
    .custom((value) => typeof value === 'string')
    .withMessage('Incorrect blogId')