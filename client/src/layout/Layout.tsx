import { Header } from '../components/header/Header'
import { Footer } from '../components/footer/Footer'
import { AuthPage } from '../pages/authPage/AuthPage'
import style from './layout.module.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ChatsPage } from '../pages/chatsPage/ChatsPage'


export const Layout = () => {
    return(
        <BrowserRouter>
            <div className={style.layout}>
                <Header/>
                <main>
                    <Routes>
                        <Route path='/' element={<AuthPage/>}/>
                        <Route path='/chats' element={<ChatsPage/>}/>
                    </Routes>
                </main>
                <Footer/>
            </div>
        </BrowserRouter>
    )
}