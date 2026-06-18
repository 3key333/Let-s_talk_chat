import { Router } from "express"
import type { Request, Response } from "express"
import { throwServerError } from "../helpers/helpers.ts"
import type { JoinChatBody } from "../../types.ts"
import { pool } from "../db/pool.ts"


export const chatRouter = Router()

chatRouter.post('/join_chat', async (req: Request<{}, {}, JoinChatBody>, res: Response) => {

    try {

        const { name, created_by } = req.body

        const { rows } = await pool.query(
            `SELECT * FROM chats
            WHERE name = $1 AND created_by = $2`,
            [name, created_by]
        )

        if(rows.length === 0){
            await pool.query(
                `INSERT INTO chats(name, created_by)
                VALUES($1, $2)`,
                [name, created_by]
            )
        }

        if(rows.length === 1){
            res.status(200).json({message: 'Комната уже существует'})
            return
        }

        res.status(200).json({message: 'Создали новую комнату', data: name})
        
    } catch (error) {
        throwServerError(res, error)
    }

})

