import style from './header.module.scss'


export const Header = () => {

    const accountInfo = JSON.parse(localStorage.getItem('accountInfo'))

    return(
        <header>
            <div className={style.headerInner}>

                <div className={style.header_title}>
                    <h1>Let's Talk !</h1>
                </div>

                <div className={style.header_accauntInfo}>
                    <p>{accountInfo?accountInfo.user_name:''}</p>
                </div>

            </div>
        </header>
    )
}