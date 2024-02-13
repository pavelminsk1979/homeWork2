
import {body} from "express-validator";


export const shortDescriptionValidationPosts = body('shortDescription')
    .exists()
    .trim()
    .custom((value) => typeof value === 'string')
    .isLength({ max: 100})
    .withMessage('Incorrect shortDescription')