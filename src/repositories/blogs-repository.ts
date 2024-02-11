




export type Blog = {
    id:string,
    name:string,
    description:string,
    websiteUrl:string
}

export const blogs :Blog[]=[
    {
        id:'123',
        name:'blogName',
        description:'blogDescription',
        websiteUrl:'blogWebsiteUrl'
    }
]



export const blogsRepository = {
    getBlogs(){
        return blogs
    },

    findVideoById(id:string){
        let blog = blogs.find(e=>e.id===id)
        return blog
    }
}

