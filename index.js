import express from 'express'
import mongoose from 'mongoose'
import BlogRouter from './routes/BlogRouter.js'
import AuthRouter from './routes/AuthRouter.js'
import fileUpload from 'express-fileupload'
import cors from 'cors'

const PORT = process.env.PORT || 5000
const DB_URL = `mongodb+srv://user:user@cluster0.v8nrw00.mongodb.net/?retryWrites=true&w=majority`

const app = express()

app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({}))
app.use(cors())
app.use('/', AuthRouter)
app.use('/', BlogRouter)

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log('Server started on PORT:', PORT))
    } catch (e) {
        console.log(e)
    }
}


startApp()