import type { Express } from 'express'
import type { Server as HttpServer } from 'http'
import type { Server as SocketServer } from 'socket.io'


export interface AppServers {
    app: Express;
    httpServer: HttpServer;
    io: SocketServer;
}