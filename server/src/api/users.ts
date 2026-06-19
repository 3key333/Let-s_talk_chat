import { Router } from "express";
import type { Request, Response } from "express";
import { throwServerError } from "../helpers/helpers.ts";
import { pool } from "../db/pool.ts";



export const usersRouter = Router()


usersRouter.get('/user/:id', async (req: Request<{id: string}>, res: Response) => {

    try {

        const { id } = req.params

        const { rows } = await pool.query(
            `SELECT  * FROM users
            WHERE id = $1`,
            [id]
        )

        if(rows.length === 0){
            res.status(404).json({message: 'Пользователь с таким id не был найден'})
            return
        }

        res.status(200).json({message: 'Получили данные о пользователе', data: rows})
        
    } catch (error) {
        throwServerError(res, error)
    }

})