import type { Express } from 'express'
import type { Server as HttpServer } from 'http'
import type { Server as SocketServer } from 'socket.io'


export interface AppServers {
    app: Express;
    httpServer: HttpServer;
    io: SocketServer;
}

export interface CreateAccountBody {
    user_name: string;
    email: string;
    password: string;
}

export interface IUserEntity {
    id: string;
    user_name: string;
    email: string;
    password_hash: string;
    created_at: string;
}

export interface JoinChatBody {
    name: string;
    created_by: string;
}