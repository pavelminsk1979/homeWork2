import express, {Request, Response} from 'express'
import { videosRoute} from "./routes/videos-route";
import {videos} from "./repositories/videos-repository";
import {blogsRoute} from "./routes/blogs-route";
import {blogs} from "./repositories/blogs-repository";
import {postsRoute} from "./routes/posts-route";
import {posts} from "./repositories/posts-repository";

export const app = express()


app.use(express.json())

app.use('/videos', videosRoute)
app.use('/blogs', blogsRoute)
app.use('/posts', postsRoute)


app.delete('/testing/all-data', (req: Request, res: Response) => {
    videos.length = 0
    blogs.length=0
    posts.length=0
    res.sendStatus(204)
})