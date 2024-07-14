import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Container, Row, Col, Card, InputGroup, FormControl, Button, Image} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

import '@fortawesome/react-fontawesome';
import '@fortawesome/free-solid-svg-icons';
import store from "./store/store";
import {login, updateUser} from "./store/action";
import {useDispatch} from "react-redux";
import useWebSocket, {resetGlobalState} from "react-use-websocket";
import {payloadLoginAPI, payloadLogout, payloadRegisterAPI,payloadCheckUser,
    payloadCreateRoomAPI, payloadGetPeopleChatMessAPI, payloadGetUserList, payloadJoinRoom, payloadReLoginAPI, websocket_url} from "./configAPI";

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
    const [inputValue, setInputValue] = useState('');
    const [isRoomChecked, setIsRoomChecked] = useState(false);
    const [stateListUser,setStateListUser] = useState([])


    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleCheckboxChange = (e) => {
        setIsRoomChecked(e.target.checked);
    };

    const createRoom = () => {
        if(isRoomChecked){
            sendMessage(payloadCreateRoomAPI(inputValue))
        }

    };
    const joinChat = () => {
        if(isRoomChecked){
            console.log("tai sao ha")
            sendMessage(payloadJoinRoom(inputValue))
        }else{
            sendMessage(payloadCheckUser(inputValue))
            console.log("checkuser roi ma")
        }


    };



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
            } else if(JSON.parse(lastMessage.data).status == "success" && JSON.parse(lastMessage.data).event == "CHECK_USER"){
               sendMessage(payloadGetPeopleChatMessAPI(inputValue,1));
                setConversationPaneState([inputValue, 0]);
            } else if(JSON.parse(lastMessage.data).status =="success"&& JSON.parse(lastMessage.data).event == "JOIN_ROOM"){
                setConversationPaneState([inputValue, 1]);
            }else if(JSON.parse(lastMessage.data).status =="success"&& JSON.parse(lastMessage.data).event == "CREATE_ROOM"){
                setConversationPaneState([inputValue, 1]);
            }
        }

    }, [lastMessage])
    const [conversationPaneState, setConversationPaneState] = useState([null, null])

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
                                    <input type="text" placeholder="Name of Room or People" className="name-room ml-3" onChange={handleInputChange}/>
                                    <input type="checkbox" name="isRoom" id="isRoom"
                                           class="form-check w-fit w-20px ml-3" onChange={handleCheckboxChange}/>
                                    <label for="isRoom" className="w-fit">Room</label>
                                    <button className="btn btn-primary btn-icon ml-3 btnAdd " onClick={createRoom}><i
                                        className="bi bi-plus-square-fill"></i></button>
                                    <button className="btn btn-primary btn-icon ml-3" onClick={joinChat}><i
                                        className="bi bi-arrow-right-circle-fill"></i></button>
                                </Row>
                                <Row className="chat-list">
                                    <ConversationPaneList data={conversationPaneState}
                                                          update={setConversationPaneState}
                                                          state={stateListUser}

                                    />

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
    const [loginFailed, setLoginFailed] = useState('')
    const onLogin = () => {// gui request len server
        sendMessage(payloadLoginAPI(username, password))
    }
    const onRegister= () =>{
        sendMessage(payloadRegisterAPI(username,password))
    }
    useEffect(() => {

        if (lastMessage !== null) {//nhan data tu server
            if (JSON.parse(lastMessage.data).status == "success" && JSON.parse(lastMessage.data).event == "LOGIN") {
                let jsondata = JSON.parse(lastMessage.data)
                jsondata.username = username
                store.dispatch(login(jsondata))
                setLoginStatus(true)
            }
            if (JSON.parse(lastMessage.data).status == "error" && JSON.parse(lastMessage.data).event == "LOGIN") {
                let jsondata = JSON.parse(lastMessage.data)
                setLoginFailed(jsondata.mes)
            }
            if (JSON.parse(lastMessage.data).status == "success" && JSON.parse(lastMessage.data).event == "REGISTER") {
                //dang ki thanh cong dang nhap
                onLogin();
            }
            if (JSON.parse(lastMessage.data).status == "error" && JSON.parse(lastMessage.data).event == "REGISTER") {
                let jsondata = JSON.parse(lastMessage.data)
                setLoginFailed(jsondata.mes)
            }

        }

    }, [lastMessage])


    return (
        <Container>
            <Row className="justify-content-center col-lg-8 m-auto mt-5">
                <Col>
                    <Card className={" p-4"}>
                        <Card.Body>
                            <h1 className="text-center text-secondary">NLU CHAT APP</h1>
                            <Row className={""}>
                                <input type="text" placeholder="Username" className="form-control mb-3" id="username"
                                       onChange={e => setUsername(e.target.value)}/>
                                <input type="password" placeholder="Password" className="form-control mb-3"
                                       id="password"
                                       onChange={e => setPassword(e.target.value)}/>
                                <p className="text-danger">{loginFailed}</p>
                                <Row className={"justify-content-around"}>
                                    <Button variant="primary" type="submit" className="col-lg-4 "
                                            onClick={onRegister}>Register</Button>
                                    <Button variant="primary" type="submit" className="col-lg-4"
                                            onClick={onLogin}>Login</Button>
                                </Row>
                            </Row>
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