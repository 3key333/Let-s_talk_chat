import express from 'express'
import type { Express } from 'express'
import cors from 'cors'
import { createServer, Server as HttpServer } from 'http'
import { Server as SocketServer } from 'socket.io'


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

    return { app, httpServer, io }
}

export const startServer = (httpServer: HttpServer) => {

    const port = Number(process.env.SERVER_PORT)
    const host = String(process.env.SERVER_HOST)

    httpServer.listen(port, host, () => {
        console.log(`✔️ сервер успешно слушает порт http://${host}:${port}`)
    })

}