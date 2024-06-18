export const login = (data) => {
    return {
        type: 'user.login',
        payload: data

    }
}