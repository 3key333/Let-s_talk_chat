import { useEffect, useRef, useState } from 'react'
import style from './chatsPage.module.scss'
import axios from 'axios'
import type { IUserEntity } from '@SHARED/types.ts'
import { io, type Socket } from 'socket.io-client'


export const ChatsPage = () => {
    

    const accountInfo: IUserEntity = JSON.parse(localStorage.getItem('accountInfo'))
    const token = localStorage.getItem('token')

    const [room, setRoom] = useState<string>('')

    const socketRef = useRef<Socket | null>(null)

    useEffect(() => {
        if(!token) return 

        const newSocket = io('http://localhost:3000')
        socketRef.current = newSocket

        newSocket.on('connect', () => {

        })

        return () => {
            newSocket.disconnect()
            socketRef.current = null
        }
    }, [token])

    const handleChangeRoom = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoom(e.target.value)
    }

    const handleClickJoinChat = async () => {
        const data = await axios.post('http://localhost:3000/api/chats/join_chat', {name: room, created_by: accountInfo.id})
        socketRef.current.emit('join_room', {user: accountInfo.user_name, room: room})
    }

    return(
        <section className={style.chatsPage}>
            <div className={style.chatsPageInner}>

                <div className={style.joinChat}>
                    <h2>Присоедениться к чату</h2>

                    <div className={style.joinChat}>
                        <input name={'room'} type="text" onChange={handleChangeRoom}/>
                        <button onClick={handleClickJoinChat}>+</button>
                    </div>

                </div>

                <div className={style.chat}>

                    <div className={style.chat_messages}>
                        
                    </div>

                    <div className={style.chat_sendMessage}>
                        <input type="text" />
                        <button>отправить</button>
                    </div>

                </div>

            </div>
        </section>
    )
}