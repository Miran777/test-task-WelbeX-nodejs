import jwt from "jsonwebtoken"
import { secret } from "./config.js"

const middleware = (req, res, next) => {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        console.log(req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
        next()
    } catch (error) {
        console.log(error)
        res.status(403).json({message: "Пользователь не авторизован"})
    }
}


export default middleware