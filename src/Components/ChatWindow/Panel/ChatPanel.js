import React, {useEffect} from 'react';

function ChatPanel({messages}) {

    useEffect(()=>{
        const chatWindow = document.getElementsByClassName("chat-panel")[0];
        chatWindow.scrollTop = chatWindow.scrollHeight;
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