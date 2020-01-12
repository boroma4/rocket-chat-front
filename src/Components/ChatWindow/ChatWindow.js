import React from 'react';
import Input from "../InputField/Input";
import './Chat.css';
import { ChatFeed } from 'react-chat-ui'



function ChatWindow({chatData,onSend}) {
    return (

        <div>
            <ChatFeed
                ClassName ={'feed'}
                showSenderName
                messages = {chatData.msg}

            />
            <footer className={'footer'}>
                <Input onSendClick={onSend}/>
            </footer>
        </div>
    );


}
export default ChatWindow;