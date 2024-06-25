import {useWebSocketContext} from "../store/webSocketProvider";
import {useSelector} from "react-redux";
import {Row} from "react-bootstrap";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {payloadGetPeopleChatMessAPI, payloadGetRoomChatMessAPI} from "../configAPI";
import store from "../store/store";
import {addMessage, setConversationPane, setMessages} from "../store/action";
import {loadConversationPane, loadMessages, loadUser} from "../selector/selector";
import {ConservationPaneItem} from "./ConversationPane";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {InputChat} from "./InputChat";

export default function BoxChat(props: any) {
    const {sendMessage, lastMessage, readyState} = useWebSocketContext()
    const [myMessage, setMyMessage] = useState("")
    useEffect(() => {
        if (props.data[1] == 1) {
            sendMessage(payloadGetRoomChatMessAPI(props.data[0], 1))
        } else {
            sendMessage(payloadGetPeopleChatMessAPI(props.data[0], 1))
        }
    }, props.data);


    return (
        <div>
            <Row><ConversationObject conversation={props.data} status="Online"/>
                <div className="chat-messages row">
                    <ChatMessageList conversation={props.data} myMess={myMessage}/>
                </div>
            </Row>
            <InputChat data={props.data} setMyMess={setMyMessage}/>
        </div>


    )
}

export function ChatMessage(props: any) {

    return (
        <div className={props.my_message ? "row my_message col-lg-10" : "row other_message col-lg-11"}>
            {props.isNear ? null :
                <div
                    className={props.my_message ? "row justify-content-end font-small" : "row justify-content-start font-small"}>
                    <strong className="w-fit mr-0 pr-0">{props.name}</strong>
                    <span className="w-fit ml-0 pl-0">-{props.actionTime}</span>
                </div>
            }
            <div className="row align-items-end">

                {props.my_message ? null : <div
                    className="col-lg-2 d-flex align-items-center justify-content-center pr-0">
                    {props.isNear ? null :
                        <img className="avt"
                             src="https://ptetutorials.com/images/user-profile.png"
                             alt="sunil"/>
                    }

                </div>}
                <span className={props.my_message ? "my_message_item" : "other_message_item"}>{props.mes}</span>
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
    const {sendMessage, lastMessage, readyState} = useWebSocketContext()
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

    for (let i = 0; i < messages.length; i++) {
        let data = messages[i];
        let oldName = i > 0 ? messages[i - 1].name : "";
        let curName = data.name;
        let name = curName != oldName ? curName : "";
        let createAt = curName != oldName ? data.createAt : "";

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

    return (
        <div>
            {messageElements}
        </div>
    );

}

export function ConversationObject(props: any) {
    return (
        <Row className="chat">
            <div className="w-fit d-flex justify-content-center">
                <FontAwesomeIcon
                    icon={faUser} className="icon-user p-1"/>
            </div>
            <div className="col-lg-10 row align-content-center">
                <Row>
                    <strong className="card-title col-lg-7 pb-0 mb-0 fs-5">{props.conversation[0]}</strong>
                </Row>
                <Row className="align-items-center">
                    <div className=" icon-onl">

                    </div>
                    <span className="card-title col-lg-8 mb-0 pl-1 pb-4px">{props.status}</span>
                </Row>
            </div>
        </Row>
    )

}