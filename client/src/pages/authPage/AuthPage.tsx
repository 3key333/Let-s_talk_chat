import { useState } from 'react'
import style from './authPage.module.scss'


export const AuthPage = () => {

    const [userInfo, setUserInfo] = useState<{name: string, email: string, password: string}>({
        name: '',
        email: '',
        password: ''
    })

    const handlerChangeUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value
        setUserInfo((prev) => ({...prev, [e.target.name]: text}))
    }

    const handlerClickToCreateAccount = () => {
        
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
                            <input name={'name'} type="text" onChange={handlerChangeUserInfo}/>
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
                        <button>создать аккаунт</button>
                    </div>
                    
                </div>
            </div>

            </div>
        </section>
    )
}