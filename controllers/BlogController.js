import Blog from "../models/Blog.js"
import BlogServise from "../service/BlogServise.js"

class BlogController {
    async create(req, res) {
        try {
            console.log(req.body)
            const blog = await BlogServise.create(req.body)
            res.json(blog)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async getAll(req, res) {
        try {
            const {page, limit} = req.query
            console.log(parseInt(page, 2), parseInt(limit, 20))
            const option = {
                page: parseInt(page, 1) || 1,
                limit: parseInt(limit, 10) || 20
            }
            const blogs = await BlogServise.getAll().paginate({}, option)
            return res.json(blogs)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async getOne(req, res) {
        try {
            const blogId = await BlogServise.getOne(req.params.id)
            return res.json(blogId)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async update(req, res) {
        try {
            console.log('new', req.body)
            const updatedBlog = await BlogServise.update(req.body)
            return res.json(updatedBlog)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async delete(req, res) {
        try {
            console.log(req.body)
            const deletedBlog = await BlogServise.delete(req.body)
            return res.json(deletedBlog)
        } catch (error) {
            res.status(500).json(error)
        }
    }

}

export default new BlogController()