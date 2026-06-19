import { Router } from "express"
import type { Request, Response } from "express"
import { throwServerError } from "../helpers/helpers.ts"
import type { JoinChatBody } from "../../types.ts"
import { pool } from "../db/pool.ts"


export const chatRouter = Router()

chatRouter.post('/join_chat', async (req: Request<{}, {}, JoinChatBody>, res: Response) => {

    try {

        const { name, created_by } = req.body

        let { rows } = await pool.query(
            `SELECT * FROM chats
            WHERE name = $1`,
            [name]
        )

        if(rows.length === 0){
            const inserted = await pool.query(
                `INSERT INTO chats(name, created_by)
                VALUES($1, $2)
                RETURNING id`,
                [name, created_by]
            )
            rows = inserted.rows
        }

        res.status(200).json({message: 'Ок', data: {chat_id: rows[0].id, name}})
        
    } catch (error) {
        throwServerError(res, error)
    }

})

chatRouter.post('/get_chat_id', async (req: Request<{}, {}, {name: string}>, res: Response) => {

    try {

        const { name } = req.body

        const { rows } = await pool.query(
            `SELECT * FROM chats
            WHERE name = $1`,
            [name]
        )

        if (rows.length === 0) {
            res.status(404).json({ message: 'Чат не найден' })
            return
        }

        res.status(200).json({message: 'Данные о чате', data: rows[0].id})
        
    } catch (error) {
        throwServerError(res, error)
    }

})

chatRouter.post('/add_new_message', async (req: Request<{}, {}, {chat_id: string, user_id: string, text: string}>, res: Response) => {

    try {

        const { chat_id, user_id, text } = req.body

        await pool.query(
            `INSERT INTO messages(chat_id, user_id, text)
            VALUES($1, $2, $3)`,
            [chat_id, user_id, text]
        )

        res.status(200).send('ok')
    } catch (error) {
        throwServerError(res, error)
    }

})

chatRouter.post('/get_all_messages', async (req: Request<{}, {}, {chat_id: string}>, res: Response) => {

    try {

        const { chat_id } = req.body

        const { rows } = await pool.query(
            `SELECT m.text, m.created_at, u.user_name
            FROM messages m
            JOIN users u ON u.id = m.user_id
            WHERE m.chat_id = $1
            ORDER BY m.created_at ASC`,
            [chat_id]
        )


        res.status(200).json({
            message: rows.length === 0 ? 'Сообщений нет' : 'Получены все сообщения', 
            data: rows
        })
        
    } catch (error) {
        throwServerError(res, error)
    }

})

