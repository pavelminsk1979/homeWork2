import express, {Request, Response} from 'express'
import { videosRoute} from "./routes/videos-route";
import {videos} from "./repositories/videos-repository";

export const app = express()


app.use(express.json())

app.use('/videos', videosRoute)


app.delete('/testing/all-data', (req: Request, res: Response) => {
    videos.length = 0
    res.sendStatus(204)
})