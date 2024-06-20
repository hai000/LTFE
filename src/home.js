import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Card, InputGroup, FormControl, Button, Image} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import store from "./store/store";
import {login} from "./store/action";
import {useDispatch} from "react-redux";
import useWebSocket from "react-use-websocket";
import {payloadLoginAPI, websocket_url} from "./configAPI";
import {useLocation, useNavigate} from "react-router-dom";
import {loadUser} from "./selector/selector";

import {useWebSocketContext} from "./store/webSocketProvider";
import ConversationPaneList from "./component/ConversationPane";
import BoxChat from "./component/BoxChat";
import data from "bootstrap/js/src/dom/data";


export const ZaloHomePage = () => {
    const user = loadUser(store.getState())
    const navigate = useNavigate();
    useEffect(() => {
        if (user.status != "success") {

            navigate('/');
        }
    }, [navigate]);
    const [conversationPaneState,setConversationPaneState] = useState([null,null])

    return (

        <Container>
            <Row>
                <button type="button" className="btn btn-secondary col-lg-1 m-3">Logout</button>
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
                                    <ConversationPaneList data ={conversationPaneState} update={setConversationPaneState} />

                                </Row>
                            </Card.Body>
                            <Card.Body className="col-lg-7 border-left">
                                <BoxChat data ={conversationPaneState}
                                            />


                                <div className="d-flex align-items-center send_msg">
                                    <FormControl type="text" placeholder="Type a message..."
                                                 className="flex-grow-1 mr-3 input_msg" id="inputMsg" onChange={inputMsg}
                                    />
                                    <Button variant="primary" id="btnSend" disabled><i aria-hidden="true"
                                                                 className="fa fa-paper-plane"></i></Button>
                                </div>
                            </Card.Body>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export const  LoginPage = () => {
    const {sendMessage,lastMessage, readyState} = useWebSocketContext();
    const [loginStatus, setLoginStatus] = useState(false);
    const navigate = useNavigate();

        if (loginStatus){
            navigate('/chat')
        }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const onLogin = () => {// gui request len server
        sendMessage(payloadLoginAPI(username, password))
    }
    useEffect(() => {

        if (lastMessage !== null){//nhan data tu server
            if(JSON.parse(lastMessage.data).status=="success"&&JSON.parse(lastMessage.data).event=="LOGIN"){
               let jsondata = JSON.parse(lastMessage.data)
                jsondata.username = username
                store.dispatch(login(jsondata))
                setLoginStatus(true)
            }
        }
    }, [lastMessage])


    return (
        <Container>
            <Row className="justify-content-center">
                <Col>
                    <Card>
                        <Card.Body>
                            <h1 className="text-center text-secondary">NLU CHAT APP</h1>
                            <input type="text" placeholder="Username" className="form-control mb-3" id="username" onChange={e => setUsername(e.target.value)}/>
                            <input type="password" placeholder="Password" className="form-control mb-3" id="password" onChange={e => setPassword(e.target.value)}/>
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