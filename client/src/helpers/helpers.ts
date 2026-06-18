export const isValidUserInfoToReg = (userInfo: {user_name: string, email: string, password: string}) => {

    const validate = userInfo.user_name && userInfo.email && userInfo.password &&
    userInfo.user_name.trim() !== '' && userInfo.email.trim() !== '' &&
    userInfo.password.trim() !== ''

    console.log(userInfo)

    if(validate){
        return true
    }

    return false

}