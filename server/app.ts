import dotenv from 'dotenv'
import { initDataBase } from './src/db/pool.ts'
import { createAppServer, startServer } from './src/server.ts'
import type { AppServers } from './types.ts'
import { authRouter } from './src/api/auth.ts'
import { chatRouter } from './src/api/chats.ts'
import { usersRouter } from './src/api/users.ts'


dotenv.config({path: '../.env'})

const startApp = async () => {

    try {

        await initDataBase()
        const {app, httpServer, io}: AppServers= createAppServer()

        app.use('/api/auth', authRouter)
        app.use('/api/chats', chatRouter)
        app.use('/api/users', usersRouter)

        startServer(httpServer)
        
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
    
}

startApp()