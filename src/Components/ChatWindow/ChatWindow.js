import React, {useState} from 'react';
import Input from "../InputField/Input";
import './Chat.css';
import { ChatFeed } from 'react-chat-ui'
import Picker from "emoji-picker-react";



function ChatWindow({chatData,onSend}) {
    const [emojiSeen,showEmoji] = useState(false);

    return (

        <div>
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