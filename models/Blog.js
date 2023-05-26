import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const Blog = new mongoose.Schema({
    username: {type: String, required: true},
    content: {type: String, required: true},
    date: {type: String, required: true},
    picture: {type: String}
})



export default mongoose.model('Blog', Blog.plugin(mongoosePaginate))