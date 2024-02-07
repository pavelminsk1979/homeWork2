import {AvailableResolutions} from "../repositories/videos-repository";

export  type UpdateVideo = {
    title: string,
    author: string,
    availableResolutions?: AvailableResolutions[]
    canBeDownloaded?: boolean,
    minAgeRestriction?: number,//maximum: 18   minimum: 1
    publicationDate?: string
}