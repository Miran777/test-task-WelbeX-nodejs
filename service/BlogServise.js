import Blog from "../models/Blog.js"
import FileServise from "./FileServise.js"

class BlogServise {
    async create(blog) {
        if (blog.picture) {
            const fileName = FileServise.saveFile(blog.picture)
            const createdBlog = Blog.create({...blog, picture: fileName})
            return createdBlog
        } else {
            const createdBlog = await Blog.create(blog)
            return createdBlog
        }
    }

    async getAll() {
        const blogs = await Blog.find()
        return blogs
    }

    async getOne(id) {
        if (!id) {
            throw new Error('Не указан ID')
        }
        const blog = await Blog.findById(id)
        return blog
    }

    async update(blog) {
        console.log(blog, blog._id)
        if (!blog._id) {
            throw new Error('ID не указан')
        }
        console.log(!blog._id)
        const updatedBlog = await Blog.findByIdAndUpdate(blog._id, blog, {new: true})
        console.log('updated ',updatedBlog)
        return updatedBlog
    }

    async delete(blog) {
        const blogId = blog._id
        if (!blogId) {
           throw new Error('ID не указан')
        }
        const deletedBlog = await Blog.findByIdAndDelete(blogId)
        return deletedBlog
    }

}


export default new BlogServise()