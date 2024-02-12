import {AvailableResolutions} from "../repositories/videos-repository";

export  type UpdateVideoModel = {
    title: string,
    author: string,
    availableResolutions?: AvailableResolutions[]
    canBeDownloaded?: boolean,
    minAgeRestriction?: number,//maximum: 18   minimum: 1
    publicationDate?: string
}