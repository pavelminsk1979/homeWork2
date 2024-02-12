import {CreateAndUpdateBlogModel} from "../models/CreateAndUpdateBlogModel";

export type Blog = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string
}

export const blogs: Blog[] = [
    {
        id: '123',
        name: 'blogName',
        description: 'blogDescription',
        websiteUrl: 'blogWebsiteUrl'
    }
]


export const blogsRepository = {
    getBlogs() {
        return blogs
    },

    findBlogById(id: string) {
        debugger
        let blog = blogs.find(e => e.id === id)
        return blog
    },

    createBlog(requestBodyBlog: CreateAndUpdateBlogModel) {
        const {name, description, websiteUrl} = requestBodyBlog

        const newBlog: Blog = {
            id: (new Date()).toISOString(),
            name,
            description,
            websiteUrl
        }

        blogs.push(newBlog)
        return newBlog
    },

    updateBlog(id: string, requestBodyBlog: CreateAndUpdateBlogModel) {
        const {name, description, websiteUrl} = requestBodyBlog
        const blog = blogs.find(e => e.id === id)
        if (blog) {
            blog.name = name
            blog.description = description
            blog.websiteUrl = websiteUrl
            return true
        } else {
            return false
        }
    },

    deleteBlogById(id: string) {
        const indexBlog = blogs.findIndex(e => e.id === id)
        if (indexBlog === -1){
            return false
        }else {
            blogs.splice(indexBlog, 1)
            return true
        }

    }
}

