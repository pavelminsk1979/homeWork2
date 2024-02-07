import {AvailableResolutions} from "../repositories/videos-repository";

export type CreateVideo = {
           title: string,
           author: string,
           availableResolutions?: AvailableResolutions[]
       }