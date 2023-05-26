import Router from 'express'
import AuthController from '../controllers/AuthController.js'
import {check} from "express-validator"

const AuthRouter = new Router()


AuthRouter.post('/registration', [
    check('username', "Имя пользователя не может быть пустым.").notEmpty(),
    check('password', "Пароль должен быть не менее 8 и не более 16 символов").isLength({min: 8, max: 16})
], AuthController.registration)
AuthRouter.post('/login', AuthController.login)
AuthRouter.get('/users', AuthController.getUsers)

export default AuthRouter