import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Container, Row, Col, Card, InputGroup, FormControl, Button, Image} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

import '@fortawesome/react-fontawesome';
import '@fortawesome/free-solid-svg-icons';
import store from "./store/store";
import {login, updateUser} from "./store/action";
import {useDispatch} from "react-redux";
import useWebSocket, {resetGlobalState} from "react-use-websocket";
import {payloadLoginAPI, payloadLogout, payloadReLoginAPI, websocket_url} from "./configAPI";
import {useLocation, useNavigate} from "react-router-dom";
import {loadUser} from "./selector/selector";

import {useLoginStatusContext, useWebSocketContext} from "./store/webSocketProvider";
import ConversationPaneList from "./component/ConversationPane";
import BoxChat from "./component/BoxChat";

import '@fortawesome/fontawesome-svg-core/styles.css';
import {config} from '@fortawesome/fontawesome-svg-core';
import * as getWebSocket from "react-dom/test-utils";

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically


export const ZaloHomePage = () => {
    const user = loadUser(store.getState())
    const navigate = useNavigate();
    const {sendMessage, lastMessage, readyState} = useWebSocketContext()
    const [stateComponent, setStateComponent] = useState(false)
    const {loginStatus, setLoginStatus} = useLoginStatusContext();
    const onLogout =() =>{
        sendMessage(payloadLogout())
        // setWebsocketUrl("wss://demos.kaazing.com/echo")

        setLoginStatus(false)
        navigate("/")

    }


    useEffect(() => {

        if (user.status != "success") {
            navigate('/');
        } else if (user.status == "success") {
            sendMessage(payloadReLoginAPI(user.username, user.data.RE_LOGIN_CODE))

        }
    }, [navigate]);
    useEffect(() => {
        if (lastMessage !== null) {
            if (JSON.parse(lastMessage.data).status == "success" && JSON.parse(lastMessage.data).event == "RE_LOGIN") {

                store.dispatch(updateUser(JSON.parse(lastMessage.data).data))
                setStateComponent(!stateComponent)
            } else if (JSON.parse(lastMessage.data).status == "error" && JSON.parse(lastMessage.data).event == "RE_LOGIN") {
                navigate('/')
            }
        }

    }, [lastMessage])
    const [conversationPaneState, setConversationPaneState] = useState([null, null])
    // console.log(conversationPaneState)
    return (

        <Container>
            <Row>
                <button type="button" className="btn btn-secondary col-lg-1 m-3" onClick={onLogout}>Logout</button>
                <button type="button" className="btn btn-primary col-lg-1 m-3">Add</button>
            </Row>
            <Row className="justify-content-center">
                <Col>
                    <Card className="mb-5">

                        <Row className="">
                            <Card.Body className="col-lg-5">
                                <h1 className="text-center text-secondary">NLU CHAT APP</h1>
                                <Row className="align-items-center nav">
                                    <input type="text" placeholder="Name of Room or People" className="name-room ml-3"/>
                                    <input type="checkbox" name="isRoom" id="isRoom"
                                           class="form-check w-fit w-20px ml-3"/>
                                    <label for="isRoom" className="w-fit">Room</label>
                                    <div className="btn btn-primary btn-icon ml-3 btnAdd "><i
                                        className="bi bi-plus-square-fill"></i></div>
                                    <div className="btn btn-primary btn-icon ml-3"><i
                                        className="bi bi-arrow-right-circle-fill"></i></div>
                                </Row>
                                <Row className="chat-list">
                                    <ConversationPaneList data={conversationPaneState}
                                                          update={setConversationPaneState}/>

                                </Row>
                            </Card.Body>
                            <Card.Body className="col-lg-7 border-left">
                                <BoxChat data={conversationPaneState}/>



                            </Card.Body>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export const LoginPage = () => {
    const {sendMessage, lastMessage, readyState, getWebSocket} = useWebSocketContext();
    // const {loginStatus, setLoginStatus} = useLoginStatusContext();
    const {loginStatus, setLoginStatus} = useLoginStatusContext();
    const navigate = useNavigate();
    if (loginStatus) {
        navigate('/chat')
    }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const onLogin = () => {// gui request len server
        sendMessage(payloadLoginAPI(username, password))
    }
    useEffect(() => {

        if (lastMessage !== null) {//nhan data tu server
            if (JSON.parse(lastMessage.data).status == "success" && JSON.parse(lastMessage.data).event == "LOGIN") {
                let jsondata = JSON.parse(lastMessage.data)
                jsondata.username = username
                store.dispatch(login(jsondata))
                setLoginStatus(true)
            }
        }
        console.log(lastMessage)
    }, [lastMessage])


    return (
        <Container>
            <Row className="justify-content-center">
                <Col>
                    <Card>
                        <Card.Body>
                            <h1 className="text-center text-secondary">NLU CHAT APP</h1>
                            <input type="text" placeholder="Username" className="form-control mb-3" id="username"
                                   onChange={e => setUsername(e.target.value)}/>
                            <input type="password" placeholder="Password" className="form-control mb-3" id="password"
                                   onChange={e => setPassword(e.target.value)}/>
                            <Button variant="primary" type="submit" className="w-100" onClick={onLogin}>Login</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};



function inputMsg() {
    var inputMsgElement = document.getElementById("inputMsg");
    if (inputMsgElement !== null) {
        var inputMsg = inputMsgElement.value;
        var btnSend = document.getElementById("btnSend");

        if (inputMsg.length === 0) {
            btnSend.disabled = true;
        } else {
            btnSend.disabled = false;
        }
    }
}