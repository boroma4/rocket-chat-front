import React from 'react';
import './Friends.css'
import { ThemeProvider,Avatar,Row,ChatList,ChatListItem,Column,Title,Subtitle}
    from '@livechat/ui-kit'

function Friends({friends}) {
    return (
        <ThemeProvider>
            <ChatList>
            {friends.map(friend =>(
                <ChatListItem className = {'friend'} key = {friend.name}>
                    <Avatar letter= {friend.name.charAt(0)} />
                    <Column>
                        <Row justify>
                            <Title ellipsis>{friend.name}</Title>
                        </Row>
                        <Subtitle ellipsis>{friend.msg}</Subtitle>
                    </Column>
                </ChatListItem>
            ) )}
            </ChatList>
        </ThemeProvider>
    );
}
export default Friends;