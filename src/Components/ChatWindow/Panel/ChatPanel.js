import React, {useEffect} from 'react';
import {ScrollChatToBottom} from "../../../Helpers/Scroller";

function ChatPanel({messages}) {

    useEffect(()=>{
        ScrollChatToBottom();
        },[]);

    return (
        <ul className={'chat-panel'}>
            {
            messages.map((message,i)=>(
                <li key ={i} className= {message.id === 0 ? 'me' : 'him' }> <div className={'messsage-text'}>{message.message}</div></li>
            ))
        }
        </ul>
    );


}
export default ChatPanel;