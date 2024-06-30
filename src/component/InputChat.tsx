import {Button, FormControl} from "react-bootstrap";
import React, {ChangeEvent, useEffect, useRef, useState} from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFaceSmile, faPaperPlane, faPlus} from '@fortawesome/free-solid-svg-icons';
import {useWebSocketContext} from "../store/webSocketProvider";
import {payloadSendChatAPI, TYPE_PEOPLE, TYPE_ROOM} from "../configAPI";
import EmojiPicker, {EmojiClickData} from 'emoji-picker-react';
// @ts-ignore
import {PickerProps} from "emoji-mart";
import { far } from '@fortawesome/free-regular-svg-icons'
import {MouseDownEvent} from "emoji-picker-react/dist/config/config";
import {Emoji} from "emoji-mart/dist-es/utils/data";

interface MyPickerProps extends PickerProps {
    onClose: () => void;
}
export function InputChat(props:any) {
    const {sendMessage, lastMessage, readyState} = useWebSocketContext()
    const [message, setMessage] = useState("");
    const [openEmoji, setOpen] = useState(false);
    const emojiPickerRef = useRef<HTMLDivElement>(null);
    const iconsRef = useRef<HTMLDivElement>(null);
    const [mapIcon,setMapIcon] =useState( new Map());
    var open = false;
    var emojiContainer = document.getElementById("emojiContainer");
    if(emojiContainer){
        emojiContainer.style.display="none";
    }
    const onEmojiClick = ( emojiObject: EmojiClickData, event: MouseEvent) => {
        const inputElement = document.getElementById("inputMsg") as HTMLInputElement;
        if(inputElement){
            const currentValue = inputElement.value;
            const selectionStart = inputElement.selectionStart || 0;
            const selectionEnd = inputElement.selectionEnd || 0;

            // Thêm emoji vào vị trí con trỏ chuột
            const newValue =
                currentValue.slice(0, selectionStart) +
                emojiObject.emoji +
                currentValue.slice(selectionEnd);

            setMessage(newValue);
            mapIcon.set(emojiObject.emoji, convertIcon(emojiObject.imageUrl));
            setMapIcon(mapIcon)


        }
    };
    const handleClickIcon = (event: MouseEvent) => {

        if (iconsRef.current && iconsRef.current.contains(event.target as Node)) {

            if(!open){
                open = true;
                setOpen(true) ;
                if(emojiContainer){
                    if(open){

                        emojiContainer.style.display="block";
                    }
                }
            }




        }

    };
     function handleMessageChange(event:any) {
         setMessage(event.target.value);
    }
    const handleClickOutside = (event: MouseEvent) => {
        if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
           if(open){
               open =(false);
               if(emojiContainer){
                   emojiContainer.style.display="none";
               }
           }
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        document.addEventListener('click', handleClickIcon, true);
    });

    function showButtonSend() {

        if(message.length > 0){
            return true;
        }

        return false;
    }

    function clickSendMessage() {
        let convertMsg ='';
        const parts = message.split(/([\p{Emoji}])/gu);
        console.log('parts ',parts)
        // console.log(mapIcon.keys())

        parts.forEach(value =>{

            if(mapIcon.has(value)){
                convertMsg += (mapIcon.get(value));
            }else{
                convertMsg += value;
            }
        })

        console.log(convertMsg);
        // console.log(convertMsg)
        sendMessage(payloadSendChatAPI(props.data[0],convertMsg,(props.data[1]==0?TYPE_PEOPLE:TYPE_ROOM)))
        // console.log("message ", message)
        props.setMyMess(message);
        setMessage("");
        convertMsg="";

    }
    // @ts-ignore
    return (
        <div className="d-flex align-items-center send_msg">
            <div>
                <div ref={iconsRef}>
                    {<FontAwesomeIcon icon={far.faFaceSmile} className={"iconsRef"}/>}
                </div>

                <div ref={emojiPickerRef} id={"emojiContainer"}>
                    {<EmojiPicker open={openEmoji} className={"list-icon-block"}
                                  onEmojiClick={onEmojiClick}/>}
                </div>

            </div>
            <FormControl type="text" placeholder="Type a message..."
                         value={message}
                         className="flex-grow-1 mr-3 input_msg" id="inputMsg" onChange={handleMessageChange}
            />
            <Button onClick={clickSendMessage} variant="primary" id="btnSend"
                    className={showButtonSend() ? "" : "disabled "}><FontAwesomeIcon icon={faPaperPlane}/></Button>
        </div>
    )
}
function convertIcon(url:string){
    return '<img src="'+url+'" alt="My Image" className="icon">'
}
