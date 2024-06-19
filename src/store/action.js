export const login = (data) => {
    return {
        type: 'user.login',
        payload: data

    }
}
export const setConversationPane = (data) => {
    return {
        type: 'set.conversationPane',
        payload: data

    }
}
export const addConversationPane = (data) => {
    return {
        type: 'add.conversationPane',
        payload: data

    }
}