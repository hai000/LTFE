export const websocket_url = 'ws://140.238.54.136:8080/chat/chat';
export const TYPE_ROOM = "room";
export const TYPE_PEOPLE = "people";
//type == 1 la room, type == 0 la people
export  function payloadGetUserList(){
    return JSON.stringify({
        "action": "onchat",
        "data": {
            "event": "GET_USER_LIST"
        }
    })
}

export  function payloadLogout(){
    return JSON.stringify({
        "action": "onchat",
        "data": {
            "event": "LOGOUT"
        }
    })
}
export  function payloadCheckUser(username){
    return JSON.stringify({
        "action": "onchat",
        "data": {
            "event": "CHECK_USER",
            "data": {
                "user": username
            }
        }
    })
}
export function payloadSendChatAPI(name,mess,type) {
    return JSON.stringify({
        "action": "onchat",
        "data": {
            "event": "SEND_CHAT",
            "data": {
                "type": type,
                "to": name,
                "mes": mess
            }
        }
    })
}
export function payloadGetPeopleChatMessAPI(namePeople,page) {
    return JSON.stringify({
        "action": "onchat",
        "data": {
            "event": "GET_PEOPLE_CHAT_MES",
            "data": {
                "name": namePeople,
                "page":page
            }
        }
    })
}
export function payloadGetRoomChatMessAPI(nameRoom,page) {
    return JSON.stringify({
        "action": "onchat",
        "data": {
            "event": "GET_ROOM_CHAT_MES",
            "data": {
                "name": nameRoom,
                "page":page
            }
        }
    })
}
export function payloadCreateRoomAPI(nameRoom) {
    return JSON.stringify({
        "action": "onchat",
        "data": {
            "event": "CREATE_ROOM",
            "data": {
                "name": nameRoom
            }
        }
    })
}
export function payloadLogoutAPI() {
    return JSON.stringify({
        "action": "onchat",
        "data": {
            "event": "LOGOUT"
        }
    })
}
export function payloadReLoginAPI(username, code) {
    return JSON.stringify({
        "action": "onchat",
        "data": {
            "event": "RE_LOGIN",
            "data": {
                "user": username,
                "code": code
            }
        }
    })
}
export function payloadRegisterAPI(username, password) {
    return JSON.stringify({
        "action": "onchat",
        "data": {
            "event": "REGISTER",
            "data": {
                "user": username,
                "pass": password
            }
        }
    })
}


export function payloadLoginAPI(username, password) {
    return JSON.stringify({
        "action": "onchat",
        "data": {
            "event": "LOGIN",
            "data": {
                "user": username,
                "pass": password
            }
        }
    })
}

