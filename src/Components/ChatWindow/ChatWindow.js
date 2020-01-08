import React from 'react';
import Input from "../InputField/Input";
import './Chat.css';
import { ChatFeed } from 'react-chat-ui'



function ChatWindow({chatData,onSend}) {
    return (
        <div>
            <ChatFeed
                showSenderName
                messages = {chatData.msg}
            />
            <Input onSendClick={onSend}/>

        </div>
    );
}
export default ChatWindow;