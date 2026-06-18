import dotenv from 'dotenv'
import { initDataBase } from './src/db/pool.ts'
import { createAppServer, startServer } from './src/server.ts'
import type { AppServers } from './types.ts'


dotenv.config({path: '../.env'})

const startApp = async () => {

    try {

        await initDataBase()
        const {app, httpServer, io}: AppServers= createAppServer()

        startServer(httpServer)
        
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
    
}

startApp()