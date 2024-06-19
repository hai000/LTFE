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
    const [conversationPaneState,setConversationPaneState] = useState(null)
    // useEffect(()=>{
    //     // cap nhat ten nguoi se nhan o day
    //
    // },[conversationPaneState])
    return (

        <Container>
            <Row>
                <button type="button" className="btn btn-secondary col-lg-1 m-3">Logout</button>
                <button type="button" className="btn btn-primary col-lg-1 m-3">Add</button>
            </Row>
            <Row className="justify-content-center">
                <Col>
                    <Card>

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
                                <ConversationPaneList data ={conversationPaneState} update={setConversationPaneState}/>


                            </Card.Body>
                            <Card.Body className="col-lg-7 border-left">
                                <BoxChat data ={conversationPaneState}/>

                                <div className="chat-messages">
                                    <div className="row my_message col-lg-10">
                                        <div className="row justify-content-end font-small">
                                            <strong className="w-fit mr-0 pr-0">21130356</strong>
                                            <span className="w-fit ml-0 pl-0">-10/06/2024, 9:18 AM</span>
                                        </div>
                                        <div className="row " id="my_message_container">
                                            <span className="my_message_item">2222222</span><span
                                            className="my_message_item">2222222</span><span
                                            className="my_message_item">2222222</span>
                                        </div>

                                    </div>
                                    <div className="row other_message col-lg-11">
                                        <div className="row justify-content-start font-small">
                                            <strong className="w-fit mr-0 pr-0">21130356</strong>
                                            <span className="w-fit ml-0 pl-0">-10/06/2024, 9:18 AM</span>
                                        </div>
                                        <div className="row">
                                            <div
                                                className="col-lg-2 d-flex align-items-center justify-content-center pr-0">
                                                <img className="avt"
                                                     src="https://ptetutorials.com/images/user-profile.png"
                                                     alt="sunil"/>
                                            </div>
                                            <div className="row col-lg-10 pl-0" id="other_message_container">
                                                <span className="other_message_item">2222222</span><span
                                                className="other_message_item">2222222</span><span
                                                className="other_message_item">2222222</span>
                                            </div>
                                        </div>
                                        <div className="row justify-content-start font-small">
                                            <strong className="w-fit mr-0 pr-0">21130356</strong>
                                            <span className="w-fit ml-0 pl-0">-10/06/2024, 9:18 AM</span>
                                        </div>
                                        <div className="row">
                                            <div
                                                className="col-lg-2 d-flex align-items-center justify-content-center pr-0">
                                                <img className="avt"
                                                     src="https://ptetutorials.com/images/user-profile.png"
                                                     alt="sunil"/>
                                            </div>
                                            <div className="row col-lg-10 pl-0" id="other_message_container">
                                                <span className="other_message_item">2222222</span><span
                                                className="other_message_item">2222222</span><span
                                                className="other_message_item">2222222</span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="d-flex align-items-center send_msg">
                                    <FormControl type="text" placeholder="Type a message..."
                                                 className="flex-grow-1 mr-3 input_msg"/>
                                    <Button variant="primary"><i aria-hidden="true"
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
    useEffect(() => {
        if (loginStatus){
            navigate('/chat')
        }
    },[loginStatus]);

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    useEffect(() => {
        if (lastMessage !== null){
            if(JSON.parse(lastMessage.data).status=="success"){
                store.dispatch(login(JSON.parse(lastMessage.data)))
                setLoginStatus(true)
            }
        }
    }, [lastMessage])
    const onLogin = () => {
        sendMessage(payloadLoginAPI(username, password))
    }

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

