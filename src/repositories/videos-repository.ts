import {CreateVideo} from "../models/CreateVideoModel";
import {UpdateVideoModel} from "../models/UpdateVideoModel";

export enum AvailableResolutions {
    P144 = 'P144',
    P240 = 'P240',
    P360 = 'P360',
    P480 = 'P480',
    P720 = 'P720',
    P1080 = 'P1080',
    P1440 = 'P1440',
    P2160 = 'P2160'
}

export type Video = {
    id?: number;
    title?: string;
    author?: string;
    canBeDownloaded?: boolean;
    minAgeRestriction?: number | null;
    createdAt?: string;
    publicationDate?: string;
    availableResolutions?: AvailableResolutions[];
}


export const videos: Video[] = [
    {
        "id": 0,
        "title": "video interesting",
        "author": "man",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2024-02-01T18:57:08.689Z",
        "publicationDate": "2024-02-01T18:57:08.689Z",
        "availableResolutions": [AvailableResolutions.P144]
    }
]

export const videosRepository = {
    getVideos() {
        return videos
    },


    findVideoById(id: number) {
        let video = videos.find(e => e.id === id)
        return video
    },


    deletVideoById(id: number) {
        for (let i = 0; i < videos.length; i++) {
            if (videos[i].id === id) {
                videos.splice(i, 1)
                return true
            }
        }
        return false
    },

    createVideo(requestBody: CreateVideo) {
        let {title, author, availableResolutions} = requestBody
        const createdAt = new Date()
        const publicationDate = new Date(createdAt);
        publicationDate.setDate(publicationDate.getDate() + 1);

        const newVideo: Video = {
            id: +(new Date()),
            title,
            author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: createdAt.toISOString(),
            publicationDate: publicationDate.toISOString(),
            availableResolutions
        }

        videos.push(newVideo)
        return newVideo
    },

    updateVideo(id:number,requestBody:UpdateVideoModel){
        let {title, author, availableResolutions, minAgeRestriction, canBeDownloaded, publicationDate} = requestBody

        let video = videos.find(e => e.id === id)
        if (video) {
            video.title = title
            video.author = author
            if (availableResolutions) {
                video.availableResolutions = availableResolutions
            }
            if (canBeDownloaded) {
                video.canBeDownloaded = canBeDownloaded
            }
            if (minAgeRestriction) {
                video.minAgeRestriction = minAgeRestriction
            }
            if (publicationDate) {
                video.publicationDate = publicationDate
            }
            return true

        } else {
            return false

        }
    }
}
