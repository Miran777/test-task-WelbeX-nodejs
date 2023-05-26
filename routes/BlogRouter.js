import Router from 'express'
import BlogController from '../controllers/BlogController.js'
import middleware from '../middleware.js'

const BlogRouter = new Router()

BlogRouter.post('/blogs', middleware, BlogController.create)
BlogRouter.get('/blogs', middleware, BlogController.getAll)
BlogRouter.get('/blogs/:id', middleware, BlogController.getOne)
BlogRouter.delete('/blogs', middleware, BlogController.delete)
BlogRouter.put('/blogs', middleware, BlogController.update)


export default BlogRouter