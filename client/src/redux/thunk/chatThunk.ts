import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


interface MessageFromServer {
    text: string
    user_name: string
    created_at: string
}

export const getAllMessages = createAsyncThunk(
    'chat/get_all_mesages',
    async (data: {chat_id: string}, {rejectWithValue}) => {

        try {

            const payload = await axios.post('http://localhost:3000/api/chats/get_all_messages', data)

            return payload.data.data as MessageFromServer[]
            
        } catch (error) {
            return rejectWithValue('Ошибка загрузки сообщений')
        }

    }
)