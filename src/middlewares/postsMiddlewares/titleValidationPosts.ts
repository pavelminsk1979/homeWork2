
import {body} from "express-validator";


export const titleValidationPosts = body('title')
    .exists()
    .trim()
    .custom((value) => typeof value === 'string')
    .isLength({ max: 30})
    .withMessage('Incorrect title')