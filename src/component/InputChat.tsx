import {Button, FormControl} from "react-bootstrap";
import React, {useState} from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPaperPlane, faPlus} from '@fortawesome/free-solid-svg-icons';
import {useWebSocketContext} from "../store/webSocketProvider";
import {payloadSendChatAPI, TYPE_PEOPLE, TYPE_ROOM} from "../configAPI";

export function InputChat(props:any) {
    const {sendMessage, lastMessage, readyState} = useWebSocketContext()
    const [message, setMessage] = useState("");
    function showButtonSend() {

        if(message.length > 0){
            return true;
        }

        return false;
    }

    function clickSendMessage() {
        sendMessage(payloadSendChatAPI(props.data[0],message,(props.data[1]==0?TYPE_PEOPLE:TYPE_ROOM)))
        props.setMyMess(message);
        setMessage("");

    }
    return (
        <div className="d-flex align-items-center send_msg">
            <FormControl type="text" placeholder="Type a message..."
                         value={message}
                         className="flex-grow-1 mr-3 input_msg" id="inputMsg" onChange={e => setMessage(e.target.value)}
            />
            <Button onClick={clickSendMessage} variant="primary" id="btnSend" className={showButtonSend()?"":"disabled "}><FontAwesomeIcon icon={faPaperPlane}/></Button>
        </div>
    )
}
