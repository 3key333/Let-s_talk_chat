import type { Response } from "express"


export const throwServerError = (res: Response, error: unknown) => {
    console.log('Со стороны сервера произошла неизвестная ошибка, попробуйте позже', error)
    if (!res.headersSent) {
        res.status(500).json({ message: 'Со стороны сервера произошла неизвестная ошибка, попробуйте позже' })
    }
}

export const isValidUserInfoToReg = (userInfo: {name: string, email: string, password: string}) => {

    const validate = userInfo.name && userInfo.email && userInfo.password &&
    userInfo.name.trim() !== '' && userInfo.email.trim() !== '' &&
    userInfo.password.trim() !== ''

    if(validate) return true

    return false
    
}