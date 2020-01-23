import React, {useContext, useState} from 'react';
import Input from "../InputField/Input";
import './Chat.css';
import { ChatFeed } from 'react-chat-ui'
import {ChatIdIndexContext} from "../ChatMainWindow/ChatMainWindow";
//import Picker from "emoji-picker-react";



function ChatWindow({chatData,onSend,loadTen}) {
    const [emojiSeen,showEmoji] = useState(false);

    const {chatId,chatIndex} = useContext(ChatIdIndexContext);

    const LoadMoreMessages = (event) => {
        loadTen(chatId,chatIndex,false);
    };

    return (
        <div>
            <h4 className='white tc ' onClick={LoadMoreMessages}>
                Click to load more messages
            </h4>
            <ChatFeed
                ClassName ={'feed'}
                showSenderName
                messages = {chatData.msg}
            />
            {/*emojiSeen
                ?<Picker/>
                : <></>
            */}
            <footer className={'footer'}>
                <Input onSendClick={onSend} showEmoji={showEmoji} emojiSeen={emojiSeen}/>
            </footer>
        </div>
    );


}
export default ChatWindow;