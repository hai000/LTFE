export const login = (data) => {
    return {
        type: 'user.login',
        payload: data

    }
}
export const updateUser = (data) => {
    return {
        type: 'user.update',
        payload: data

    }
}
export const addConversationPane = (data) => {
    return {
        type: 'set.messageList',
        payload: data

    }
}
export const setMessageList = (data) => {
    return {
        type: 'set.messageList',
        payload: data

    }

}
export const setConversationPane = (data) => {
    return {
        type: 'set.conversationPane',
        payload: data

    }
}

export const setMessages = (data) => {
    return {
        type: 'set.Messages',
        payload: data

    }
}
export const addMessage = (data) => {
    return {
        type: 'add.message',
        payload: data
    }
}
