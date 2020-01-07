import React from 'react';
import Input from "../InputField/Input";
import { ThemeProvider,MessageGroup,MessageList,MessageMedia,Message,MessageText,MessageTitle,MessageButtons,Row}
    from '@livechat/ui-kit';

function ChatWindow({chatData}) {
    return (
        <ThemeProvider>
            <MessageGroup
                avatarLetter={chatData.name.charAt(0)}
                onlyFirstWithMeta
            >
                <Message authorName={chatData.name} date="21:37">
                    <MessageText>Hey my friend!</MessageText>
                </Message>
                <Message authorName={chatData.name} date="21:37">
                    <MessageText>Hi!</MessageText>
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