export const getUserMail = () => {
    const sessionData = sessionStorage.getItem("dummy_user")
    const umail = JSON.parse(sessionData).email
    return umail
}