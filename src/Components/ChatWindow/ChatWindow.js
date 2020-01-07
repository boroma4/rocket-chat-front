import React from 'react';
import Input from "../InputField/Input";
import { ThemeProvider,MessageGroup,MessageList,MessageMedia,Message,MessageText,MessageTitle,MessageButtons,Row}
    from '@livechat/ui-kit';

function ChatWindow() {
    return (
        <ThemeProvider>
            <MessageGroup
                avatar="https://livechat.s3.amazonaws.com/default/avatars/male_8.jpg"
                onlyFirstWithMeta
            >
                <Message authorName="Jon Smith" date="21:37">
                    <MessageText>Hey my friend!</MessageText>
                </Message>
                <Message authorName="Jon Smith" date="21:37">
                    <MessageText>Hi!</MessageText>
                </Message>
                <Message authorName="Jon Smith" date="21:37">
                    <MessageText>Hello, are you there?</MessageText>
                </Message>
            </MessageGroup>
            <Input/>
        </ThemeProvider>
    );
}
export default ChatWindow;