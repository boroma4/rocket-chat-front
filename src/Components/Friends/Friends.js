import React from 'react';
import './Friends.css'
import {ThemeProvider,Avatar,Row,ChatList,ChatListItem,Column,Title,Subtitle}
    from '@livechat/ui-kit'

function Friends({chats,clickOnChat,setChatIndex}) {

    const handleClick = (id,index) => {
        clickOnChat(id);
        setChatIndex(index);
    };
    return (
        <ThemeProvider>
            <ChatList>
            {chats.map((chat,index) =>(
                <div onClick={()=>handleClick(chat.id,index)} key = {chat.id} >
                    <ChatListItem className = {'friend'} >
                        <Avatar letter= {chat.name.charAt(0)} />
                        <Column>
                            <Row justify>
                                <Title ellipsis>{chat.name}</Title>
                            </Row>
                            <Subtitle ellipsis>{chat.msg[chat.msg.length-1].message}</Subtitle>
                        </Column>
                    </ChatListItem>
                </div>
            ) )}
            </ChatList>
        </ThemeProvider>
    );
}
export default Friends;