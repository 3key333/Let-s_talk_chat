import { useEffect, useRef, useState } from 'react'
import style from './chatsPage.module.scss'
import axios from 'axios'
import type { IUserEntity } from '@SHARED/types.ts'
import { io, type Socket } from 'socket.io-client'
import { addMesssage, clearChat } from '../../redux/slice/chatSlice.ts'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../redux/store.ts'
import { useNavigate } from 'react-router-dom'
import { getAllMessages } from '../../redux/thunk/chatThunk.ts'


export const ChatsPage = () => {

    const navigate = useNavigate()

    const [accountInfo, setAccountInfo] = useState<IUserEntity | null>(() => {
        const raw = localStorage.getItem('accountInfo')
        return raw ? JSON.parse(raw) : null
    })

    const token = localStorage.getItem('token')

    useEffect(() => {
        if(!token || !accountInfo){
            navigate('/')
        }
    }, [token, accountInfo, navigate])

    const [room, setRoom] = useState<string>('')

    const [newMessage, setNewMessage] = useState<string>('')

    const socketRef = useRef<Socket | null>(null)

    const currentRoomRef = useRef<string>('')

    const dispatch = useDispatch<AppDispatch>()

    const { chat } = useSelector((state: RootState) => state.chat)

    useEffect(() => {
        if (accountInfo?.room) {
            currentRoomRef.current = accountInfo.room
        }
    }, [accountInfo?.room])

    useEffect(() => {

        if(!token) return 

        const newSocket = io('http://localhost:3000')
        socketRef.current = newSocket

        newSocket.on('add_new_message', (data: {user_name: string, room: string, message: string}) => {

            if (data.room !== currentRoomRef.current) return

            dispatch(addMesssage({user_name: data.user_name, message: data.message}))

        })


        return () => {
            newSocket.disconnect()
            socketRef.current = null
        }

    }, [token, dispatch])

    const handleChangeRoom = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoom(e.target.value)
    }

    const handleClickJoinChat = async () => {

        if (!accountInfo || !room.trim()) return

        try {

            const { data } = await axios.post('http://localhost:3000/api/chats/join_chat', {
                name: room, 
                created_by: accountInfo.id
            })

            const chatId = data.data.chat_id

            if (accountInfo.room) {
                socketRef.current?.emit('leave_room', { room: accountInfo.room })
            }

            dispatch(clearChat())
            await dispatch(getAllMessages({chat_id: chatId}))

            currentRoomRef.current = room

            socketRef.current?.emit('join_room', {user: accountInfo.user_name, room: room})

            socketRef.current?.emit('new_message', {
                user_name: 'Уведомление', 
                room: room, 
                message: `${accountInfo.user_name} присоеденился !`
            })

            const updatedAccount = {
                ...accountInfo,
                room: room,
                chat_id: chatId,
            }

            setAccountInfo(updatedAccount)

            localStorage.setItem('accountInfo', JSON.stringify(updatedAccount))

        } catch (error) {
            console.log(error)
        }

    }



    const handleChangeNewMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value)
    }

    const handlerClicToSendNewMessage = async () => {

        if (!accountInfo || !newMessage.trim() || !accountInfo.chat_id || !accountInfo.room) return

        try {

            await axios.post('http://localhost:3000/api/chats/add_new_message', {
                chat_id: accountInfo.chat_id, 
                user_id: accountInfo.id, 
                text: newMessage
            })



            socketRef.current?.emit('new_message', {
                user_name: accountInfo.user_name, 
                room: accountInfo.room, 
                message: newMessage
            })

            setNewMessage('')

        } catch (error) {
            console.log(error)
        }

    }



    return(

        <section className={style.chatsPage}>
            <div className={style.chatsPageInner}>

                <div className={style.joinChat}>
                    <h2>Присоедениться к чату</h2>

                    <div className={style.joinChat}>

                        <input name='room' type="text" onChange={handleChangeRoom}/>

                        <button onClick={handleClickJoinChat}>+</button>

                    </div>

                </div>



                <div className={style.chat}>

                    <div className={style.chat_messages}>

                        {chat.map((data, index) => (

                            <p key={index}>{data.user_name?data.user_name:'Уведомление'}: {data.message}</p>

                        ))}

                    </div>

                    <div className={style.chat_sendMessage}>

                        <input name='newMessage' type="text" value={newMessage} onChange={handleChangeNewMessage}/>

                        <button disabled={newMessage.trim()===''} onClick={handlerClicToSendNewMessage}>отправить</button>

                    </div>

                </div>

            </div>
        </section>

    )

}


