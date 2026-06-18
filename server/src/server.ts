import express from 'express'
import type { Express } from 'express'
import cors from 'cors'
import { createServer, Server as HttpServer } from 'http'
import { Server as SocketServer } from 'socket.io'
import type { IUserEntity } from '../types.ts'


export const createAppServer = (): { app: Express, httpServer: HttpServer, io: SocketServer} => {
    const app = express()

    app.use(express.json())
    app.use(cors())

    const httpServer = createServer(app)

    const io = new SocketServer(httpServer, {
        cors: {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST']
        }
    })

    io.on('connection', (socket) => {
        console.log('пользователь подключился')

        socket.on('join_room', (data: {user: string, room: string}) => {
            console.log(`к комнате ${data.room} подключился пользователь`)
            socket.join(data.room)
        })
    })

    return { app, httpServer, io }
}

export const startServer = (httpServer: HttpServer) => {

    const port = Number(process.env.SERVER_PORT)
    const host = String(process.env.SERVER_HOST)

    httpServer.listen(port, host, () => {
        console.log(`✔️ сервер успешно слушает порт http://${host}:${port}`)
    })

}