import {CreatePostModel} from "../models/CreatePostModel";


type Post = {
    id:string
    title:string
    shortDescription:string
    content:string
    blogId:string
    blogName:string
}
export const posts:Post[]=[
    {
        id:'77777',
        title:'firstPosTtitle',
        shortDescription:'firstPostShortDescription',
        content:'firstPostContent',
        blogId:'firstPostBlogId',
        blogName:'firstPostBlogName',
    }
]



export const postsRepository = {
    getPosts(){
        return posts
    },

    findPostById(id:string){
        const post =posts.find(e=>e.id===id)
        return post
    },


    createPost(requestBodyPost:CreatePostModel){
        const {title,shortDescription,content,blogId}=requestBodyPost

        const newPost: Post = {
            id:(new Date()).toISOString(),
            title,
            shortDescription,
            content,
            blogId,
            blogName:'anyBlogName'
        }
        posts.push(newPost)
        return newPost
    }
}