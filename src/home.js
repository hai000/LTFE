import React from 'react';
import {Container, Row, Col, Card, InputGroup, FormControl, Button, Image} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';


const ZaloHomePage = () => {
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
                                <Row className="bg-0 chat">
                                    <div className="col-lg-2 d-flex justify-content-center">
                                        <i className="fa-user fas icon-user"></i>
                                    </div>
                                    <div className="col-lg-10 row align-content-center">
                                        <Row>
                                            <strong className="card-title col-lg-7 pb-0 mb-0">long</strong>
                                            <span className="card-title col-lg-5 pb-0 mb-0">17/06/2024, 20:42</span>
                                        </Row>
                                        <Row>
                                            <span className="card-title w-fit ">21130356:</span>
                                            <span className="card-title col-lg-8 pl-0"> 22222222</span>
                                        </Row>
                                    </div>
                                </Row>
                                <Row className="bg-1 chat">

                                    <div className="col-lg-2 d-flex justify-content-center">
                                        <i className="fa-users fas icon-group"></i>
                                    </div>
                                    <div className="col-lg-10 row align-content-center">
                                        <Row>
                                            <strong className="card-title col-lg-7 pb-0 mb-0">LTFE2024_Nhóm 31</strong>
                                            <span className="card-title col-lg-5 pb-0 mb-0">17/06/2024, 20:42</span>
                                        </Row>
                                        <Row>
                                            <span className="card-title w-fit ">21130356:</span>
                                            <span className="card-title col-lg-8 pl-0"> 22222222</span>
                                        </Row>
                                    </div>
                                </Row>
                            </Card.Body>
                            <Card.Body className="col-lg-7 border-left">
                                <Row className="chat">
                                    <div className="w-fit d-flex justify-content-center">
                                        <i className="fa-user fas icon-user"></i>
                                    </div>
                                    <div className="col-lg-10 row align-content-center">
                                        <Row>
                                            <strong className="card-title col-lg-7 pb-0 mb-0 fs-5">long</strong>
                                        </Row>
                                        <Row className="align-items-center">
                                            <div className=" icon-onl">

                                            </div>
                                            <span className="card-title col-lg-8 mb-0 pl-1 pb-4px"> Online</span>
                                        </Row>
                                    </div>
                                </Row>
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

export default ZaloHomePage;