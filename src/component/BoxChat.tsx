import {useWebSocketContext} from "../store/webSocketProvider";
import {useSelector} from "react-redux";
import {Row} from "react-bootstrap";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {payloadCheckPeople, payloadGetPeopleChatMessAPI, payloadGetRoomChatMessAPI} from "../configAPI";
import store from "../store/store";
import {addMessage, login, setConversationPane, setMessages} from "../store/action";
import {loadConversationPane, loadMessages, loadUser} from "../selector/selector";
import {ConservationPaneItem} from "./ConversationPane";
import {faUser, faUsers} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {InputChat} from "./InputChat";

export default function BoxChat(props: any) {
    const {sendMessage, lastMessage, readyState,  members} = useWebSocketContext()
    const [myMessage, setMyMessage] = useState("")
    const [status, setStatus] = useState(false);
    console.log(props)
    useEffect(() => {
        if (props.data[1] == 1) {
            sendMessage(payloadGetRoomChatMessAPI(props.data[0], 1))
        } else {
            sendMessage(payloadGetPeopleChatMessAPI(props.data[0], 1))

        }
    }, props.data);
    useEffect(() => {
        sendMessage(payloadCheckPeople(props.data[0]))
        if (lastMessage !== null) {//nhan data tu server

            if (JSON.parse(lastMessage.data).status == "success" && JSON.parse(lastMessage.data).event == "CHECK_USER") {
                console.log("status ", props.data[0], lastMessage)
                setStatus(JSON.parse(lastMessage.data).data.status)
            }
        }
    }, [lastMessage]);
    console.log(props)
    return (
        <div className={"p-0"}>
            <Row>
                {props.data[1] !=null?<ConversationObject conversation={props.data} status= {status} className={"border-bottom"}/>:""}
                <div className="chat-messages row">
                    {props.data[1] != null? <ChatMessageList conversation={props.data} myMess={myMessage}/>:
                        <div className={"d-flex align-items-center justify-content-center w-100 h-100"}>
                            <h1>Chào mừng đến với NLU CHAT</h1>
                        </div>}

                </div>
            </Row>
            {props.data[1] !=null?<InputChat data={props.data} setMyMess={setMyMessage}/>:""}
        </div>


    )
}

export function ChatMessage(props: any) {
    const parser = new DOMParser();

    return (
        <div className={props.my_message ? "d-flex flex-column my_message col-lg-9 pr-0" : "d-flex flex-column other_message col-lg-10 pl-0"}>
            {props.isNear ? null :
                <div
                    className={props.my_message ? "d-flex justify-content-end font-small" : "d-flex justify-content-start font-small"}>
                    <strong className="w-fit mr-0 pr-0">{props.name}</strong>
                    <span className="w-fit ml-0 pl-0">-{props.actionTime}</span>
                </div>
            }
            <div className="d-flex align-items-end">

                {props.my_message ? null : <div
                    className="col-lg-2 d-flex align-items-center justify-content-center pr-0">
                    {props.isNear ? null :
                        <img className="avt"
                             src="https://ptetutorials.com/images/user-profile.png"
                             alt="sunil"/>
                    }

                </div>}
                <p className={props.my_message ? "my_message_item" : "other_message_item"}>
                    <div className={"mes_content"} dangerouslySetInnerHTML={{__html: props.mes}}></div>

                </p>
            </div>
        </div>
    )

}

function receiveMessage(data: any, username: any, stateComponent: any, setComponent: Function) {
    if (data.status == "success" && data.event == "SEND_CHAT") {
        if (data.data.name == username) {
            store.dispatch(addMessage(data.data))
            setComponent(!stateComponent)
        }

    }
}

export function ChatMessageList(props: any) {

    let messages = loadMessages(store.getState()).reverse();
    let messageElements = [];
    const user = loadUser(store.getState())
    const {sendMessage, lastMessage, readyState, members, setMember} = useWebSocketContext()
    const [stateComponent, setStateComponent] = useState(false)

    useEffect(() => {
        if (lastMessage != null) {
            let data = JSON.parse(lastMessage.data);
            if (data.status == "success" && (data.event == "GET_ROOM_CHAT_MES" || data.event == "GET_PEOPLE_CHAT_MES")) {
                if (data.event == "GET_ROOM_CHAT_MES" && props.conversation[1] == 1 && props.conversation[0] == data.data.name) {
                    store.dispatch(setMessages(data.data.chatData))

                } else if (data.event == "GET_PEOPLE_CHAT_MES" && props.conversation[1] == 0) {
                    store.dispatch(setMessages(data.data))
                }
                setStateComponent(!stateComponent)
            }
        }
    }, [lastMessage]);



    useEffect(() => {
       store.dispatch(addMessage({name: user.username, mes: props.myMess,type: props.conversation[1],to: props.conversation[0], createAt: new Date().toLocaleTimeString()}))
        setStateComponent(!stateComponent)
    }, [props.myMess]);
    useEffect(() => {
        if (lastMessage != null) {
            receiveMessage(JSON.parse(lastMessage.data), props.conversation[0], stateComponent, setStateComponent)
        }
    }, [lastMessage]);

     messages = loadMessages(store.getState()).reverse();
     let listMember:string[] = [];
    // console.log(messages)
    for (let i = 0; i < messages.length; i++) {
        let data = messages[i];
        let oldName = i > 0 ? messages[i - 1].name : "";
        let curName = data.name;
        let name = curName != oldName ? curName : "";
        let createAt = curName != oldName ? data.createAt : "";
        if(!listMember.includes(curName)){
            listMember.push(curName);
        }
        messageElements.push(
            <ChatMessage

                name={curName}
                my_message={data.name === user.username}
                mes={data.mes}
                actionTime={data.createAt}
                isNear={oldName == curName}
            />
        );
    }
    setMember(listMember.length)
    return (
        <div>
            {messageElements}
        </div>
    );

}

export function ConversationObject(props: any) {
    const {sendMessage, lastMessage, readyState, members, setMember} = useWebSocketContext()

    console.log(props)
    return (
        <Row className="chat">
            <div className="w-fit d-flex justify-content-center">
                {props.conversation[1] ==0?<FontAwesomeIcon
                    icon={faUser} className="icon-user p-1"/>:
                    <FontAwesomeIcon
                        icon={faUsers} className="icon-group p-1"/>}
            </div>
            <div className="col-lg-10 row align-content-center">
                <Row>
                    <strong className="card-title col-lg-7 pb-0 mb-0 fs-5">{props.conversation[0]}</strong>
                </Row>

                    {props.conversation[1] == 1 ? <Row className="align-items-center">
                            <FontAwesomeIcon
                                icon={faUsers} className="w-fit p-1"/>
                            <span className="card-title col-lg-8 mb-0 pl-1 pb-4px">{members} Members</span></Row> :
                        <Row className="align-items-center">
                        <div className={props.status ? "icon-onl" : "icon-off"}/>
                        <span className="card-title col-lg-8 mb-0 pl-1 pb-4px">{props.status ? "Online" : "Offline"}</span></Row>
                }

</div>
</Row>
)

}