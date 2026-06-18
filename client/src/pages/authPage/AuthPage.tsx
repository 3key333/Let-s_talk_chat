import { useState } from 'react'
import style from './authPage.module.scss'
import { isValidUserInfoToReg } from '../../helpers/helpers'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export const AuthPage = () => {

    const navigate = useNavigate()

    const [userInfo, setUserInfo] = useState<{user_name: string, email: string, password: string}>({
        user_name: '',
        email: '',
        password: ''
    })

    const handlerChangeUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value
        setUserInfo((prev) => ({...prev, [e.target.name]: text}))
    }

    

    const handlerClickToCreateAccount = async () => {

        const validate = isValidUserInfoToReg(userInfo)
        console.log(validate)

        if(validate){
            const data = await axios.post('http://localhost:3000/api/auth/create_account', userInfo)
            const accountInfo = data?.data.data
            localStorage.setItem('accountInfo', JSON.stringify(accountInfo))
            localStorage.setItem('token', data.data.token)
            navigate('/chats')
        }

    }

    return(
        <section className={style.authPage}>
            <div className={style.authPageInner}>

            <div className={style.card_createAccount}>
                <div className={style.cardInner}>

                    <div className={style.card_title}>
                        <h3>Расскажите о себе</h3>
                    </div>

                    <div className={style.card_userInfo}>

                        <div className={style.user_name}>
                            <p>введите ваше имя</p>
                            <input name={'user_name'} type="text" onChange={handlerChangeUserInfo}/>
                        </div>

                        <div className={style.user_email}>
                            <p>введите ваш email</p>
                            <input name={'email'} type="text" onChange={handlerChangeUserInfo}/>
                        </div>

                        <div className={style.user_password}>
                            <p>придумайте пароль</p>
                            <input name={'password'} type="password" onChange={handlerChangeUserInfo}/>
                        </div>

                    </div>

                    <div className={style.createAccount_button}>
                        <button onClick={handlerClickToCreateAccount}>создать аккаунт</button>
                    </div>
                    
                </div>
            </div>

            </div>
        </section>
    )
}