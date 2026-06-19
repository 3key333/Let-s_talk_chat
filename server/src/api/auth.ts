import { Router } from "express";
import type { Response, Request } from 'express'
import { isValidUserInfoToReg, throwServerError } from "../helpers/helpers.ts";
import { pool } from '../db/pool.ts'
import type { CreateAccountBody, IUserEntity } from "../../types.ts";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const authRouter = Router()


authRouter.post('/create_account', async (req: Request<{}, {}, CreateAccountBody>, res: Response) => {

    try {

        const { user_name, email, password } = req.body

        const validate = isValidUserInfoToReg({name: user_name, email, password })

        if(!validate){
            res.status(200).json({message: 'Данные полученные от пользователя не валидны'})
            return
        }

        const password_hash = await bcrypt.hash(password, 10)

        await pool.query(
            `INSERT INTO users(user_name, email, password_hash)
            VALUES($1, $2, $3)`,
            [user_name, email, password_hash]
        )

        const { rows } = await pool.query<IUserEntity>(
            `SELECT id, user_name, email, created_at FROM users
            WHERE user_name = $1 AND email = $2`,
            [user_name, email]
        )

        const user = rows[0]
        const secretKey = String(process.env.JWT_SECRET)

        const token = jwt.sign(
            { id: user.id, user_name: user.user_name },
            secretKey,
        )

        res.status(200).json({message: 'Регистрация прошла успешно', data: user, token: token})
        
    } catch (error) {
        throwServerError(res, error)
    }

})