import React, {useEffect, useState} from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import {Container, Row, Col, Card, InputGroup, FormControl, Button, Image} from 'react-bootstrap';
import store from "../store/store";
import {map} from "react-bootstrap/ElementChildren";
import useWebSocket from "react-use-websocket";
import {payloadGetUserList, payloadLoginAPI, payloadReLoginAPI, websocket_url} from "../configAPI";
import {addConversationPane, login, setConversationPane} from "../store/action";
import {loadConversationPane} from "../selector/selector";
import {useWebSocketContext} from "../store/webSocketProvider";
import {useSelector} from "react-redux";

export default function ConversationPaneList(props:any) {
    const {sendMessage, lastMessage, readyState} = useWebSocketContext()
    const [name, setName] = useState(null);

    useEffect(() => {
        if (lastMessage != null) {
            let data = JSON.parse(lastMessage.data);
            if (data.status == "success" && data.event == "GET_USER_LIST") {
                store.dispatch(setConversationPane(data.data))
            }
        }
    }, [lastMessage])
    useEffect(() => {
        props.update(name)
    }, [name])

    useEffect(() => {
        if (readyState == 1) {
            sendMessage(payloadGetUserList())
        }
    }, [readyState])
    const conversationPanes = loadConversationPane(store.getState())
    return (
        conversationPanes.map((data: any) => (

            <ConservationPaneItem key={data.name}
                                  name={data.name}
                                  actionTime={data.actionTime}
                                  nameClicked={name}
                                  updateName={setName}
            />
        ))
    )
}

export function ConservationPaneItem(props: any) {

    const functionClick = () => {
        props.updateName(props.name)
    }


    return (

        <Row className={props.nameClicked === props.name ? "bg-0 chat" : "bg-1 chat"} onClick={functionClick}>

                <div className="col-lg-2 d-flex justify-content-center">
                    <i className="fa-user fas icon-user"></i>
                </div>
                <div className="col-lg-10 row align-content-center">
                    <Row>
                        <strong className="card-title col-lg-7 pb-0 mb-0">{props.name}</strong>
                        <span className="card-title col-lg-5 pb-0 mb-0">{props.actionTime}</span>
                    </Row>
                    <Row>
                        <span className="card-title w-fit ">21130356:</span>
                        <span className="card-title col-lg-8 pl-0"> 22222222</span>
                    </Row>
                </div>

        </Row>

    )
}

