import style from './header.module.scss'


export const Header = () => {
    return(
        <header>
            <div className={style.headerInner}>

                <div className={style.header_title}>
                    <h1>Let's Talk !</h1>
                </div>

                <div className={style.header_accauntInfo}>
                    <p>username</p>
                </div>

            </div>
        </header>
    )
}