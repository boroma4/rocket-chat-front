import React from 'react';
import Input from "../InputField/Input";
import './Chat.css';
import { ThemeProvider,MessageGroup,MessageList,MessageMedia,Message,MessageText,MessageTitle,MessageButtons,Row}
    from '@livechat/ui-kit';


function ChatWindow({chatData}) {
    return (
        <ThemeProvider>
            <MessageGroup id = 'group'
                avatarLetter={chatData.name.charAt(0)}
            >
                <Message authorName={chatData.name} date="21:37" deliveryStatus={'seen'}>
                    <MessageText>HBye</MessageText>
                </Message>
                <Message authorName={chatData.name} date="21:37">
                    <MessageText>Hi!</MessageText>
                </Message>
                <Message authorName={chatData.name} date="21:37">
                    <MessageText>Hello, are you there?</MessageText>
                </Message>
                <Message authorName='Me' date="21:37" isOwn={true}>
                    <MessageText>Yes blin</MessageText>
                </Message>
                <Message authorName={chatData.name} date="21:37">
                    <MessageText>Hello, are you there?</MessageText>
                </Message>
            </MessageGroup>
                <Input/>
        </ThemeProvider>
    );
}
export default ChatWindow;