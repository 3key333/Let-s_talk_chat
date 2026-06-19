import { createSlice } from '@reduxjs/toolkit'
import { getAllMessages } from '../thunk/chatThunk.ts';


interface ChatMessage {
    user_name: string | null;
    message: string;
}

interface ChatState {
    chat: ChatMessage[];
    error: string | null;
}

const initialState: ChatState = {
    chat: [],
    error: null,
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {

        addMesssage: (state, action) => {
            const data: {user_name: string, message: string} = action.payload
            state.chat.push(data)
        },

        clearChat: (state) => {
            state.chat = []
        }


    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllMessages.rejected, (state) => {
                state.error = 'ошибка заргузи'
            })

            .addCase(getAllMessages.fulfilled, (state, action) => {
                state.chat = action.payload.map((mesage) => ({
                    user_name: mesage.user_name,
                    message: mesage.text
                }))
                state.error = null
            })

    }
})

export default chatSlice.reducer
export const { 
    addMesssage,
    clearChat,
 } = chatSlice.actions