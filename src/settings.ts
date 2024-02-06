import express, {Request, Response} from 'express'
import {videos, videosRoute} from "./routes/videos-route";

export const app = express()


app.use(express.json())

app.use('/videos', videosRoute)


app.delete('/testing/all-data', (req: Request, res: Response) => {
    videos.length = 0
    res.sendStatus(204)
})