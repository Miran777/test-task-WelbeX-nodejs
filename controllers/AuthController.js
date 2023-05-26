import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { validationResult } from "express-validator"
import jwt from "jsonwebtoken"
import { secret } from "../config.js"

const generateAccessToken = (id, username) => {
    const payload = {
        id,
        username,
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class AuthController {

    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: 'Пользователь с таким именем уже существует!'})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({username, password: hashPassword})
            await user.save()
            const token = generateAccessToken(user._id, user.username)
            return res.json({message: "Пользователь успешно зарегистрирован!", token: token})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: `Пользователь ${username} не найден.`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: 'Введен неверный пароль'})
            }
            const token = generateAccessToken(user._id, user.username)
            return res.json({token})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Login error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Users error'})
        }
    }
}


export default new AuthController()