import React from 'react';
import './Friends.css'
import {ThemeProvider,Avatar,Row,ChatList,ChatListItem,Column,Title,Subtitle}
    from '@livechat/ui-kit'

function Friends({friends,clickFriend}) {
    return (
        <ThemeProvider>
            <ChatList>
            {friends.map((friend,index) =>(
                <div onClick={()=>clickFriend(index)} key = {index} >
                    <ChatListItem className = {'friend'} >
                        <Avatar letter= {friend.name.charAt(0)} />
                        <Column>
                            <Row justify>
                                <Title ellipsis>{friend.name}</Title>
                            </Row>
                            <Subtitle ellipsis>{friend.msg[friend.msg.length-1].message}</Subtitle>
                        </Column>
                    </ChatListItem>
                </div>
            ) )}
            </ChatList>
        </ThemeProvider>
    );
}
export default Friends;