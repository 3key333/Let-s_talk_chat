import dotenv from 'dotenv'
import { initDataBase } from './src/db/pool.ts'
import { createAppServer, startServer } from './src/server.ts'
import type { AppServers } from './types.ts'
import { authRouter } from './src/api/auth.ts'


dotenv.config({path: '../.env'})

const startApp = async () => {

    try {

        await initDataBase()
        const {app, httpServer, io}: AppServers= createAppServer()

        app.use('/api/auth', authRouter)

        startServer(httpServer)
        
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
    
}

startApp()