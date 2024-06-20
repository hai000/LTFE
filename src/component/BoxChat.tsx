import {useWebSocketContext} from "../store/webSocketProvider";
import {useSelector} from "react-redux";
import {Row} from "react-bootstrap";
import React, {useEffect} from "react";

export default function BoxChat(props: any) {
    const {sendMessage, lastMessage, readyState} = useWebSocketContext()
    useEffect(() => {


    }, [props.data]);

    return (
        <ConversationObject conversation="Nguyen Van A" status="Online"/>
    )
}

export function ConversationObject(props: any) {
    return (
        <Row className="chat">
        <div className="w-fit d-flex justify-content-center">
            <i className="fa-user fas icon-user"></i>
        </div>
        <div className="col-lg-10 row align-content-center">
            <Row>
                <strong className="card-title col-lg-7 pb-0 mb-0 fs-5">{props.conversation}</strong>
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