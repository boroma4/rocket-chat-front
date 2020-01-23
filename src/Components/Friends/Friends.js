import React, {useContext} from 'react';
import './Friends.css'
import {ThemeProvider,Avatar,Row,ChatList,ChatListItem,Column,Title,Subtitle}
    from '@livechat/ui-kit'

import {UserChatsContext} from "../../App";
import {ChatIdIndexContext} from "../ChatMainWindow/ChatMainWindow";

function Friends({clickOnChat,setChatIndex}) {

    const {chats} = useContext(UserChatsContext);
    const {chatIndex} = useContext(ChatIdIndexContext);

    const unSelected = {
        border: '2px solid black',
        margin: '2px',
        backgroundColor: 'lightgrey'
};
    const selected = {
        border: '2px solid red',
        margin: '2px',
        backgroundColor: 'lightgrey'
    };

    const handleClick = (id,index) => {
        clickOnChat(id,index,true);
        setChatIndex(index);
    };
    return (
        <ThemeProvider>
            <ChatList>
            {chats.map((chat,index) =>(
                <div onClick={()=>handleClick(chat.id,index)} key = {chat.id} >
                    <ChatListItem style = {index === chatIndex? selected :unSelected } >
                        <Avatar letter= {chat.name.charAt(0)} />
                        <Column>
                            <Row justify>
                                <Title ellipsis>{chat.name}</Title>
                            </Row>
                            <Subtitle ellipsis>{
                                chat.msg.length > 0
                                    ? chat.msg[chat.msg.length-1].message
                                    : 'Say something '
                                }
                            </Subtitle>
                        </Column>
                    </ChatListItem>
                </div>
            ) )}
            </ChatList>
        </ThemeProvider>
    );
}
export default Friends;