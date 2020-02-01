import React, {useContext} from 'react';
import './Friends.css';
import {ThemeProvider,Avatar,Row,ChatList,ChatListItem,Column,Title,Subtitle}
    from '@livechat/ui-kit';
import 'status-indicator/styles.css'

import {UserChatsContext} from "../../App";
import {MainChatWindowContext} from "../MainAppWindow/MainAppWindow";

function Friends({clickOnChat,setChatIndex}) {

    const {chats} = useContext(UserChatsContext);
    const {chatIndex,isMobile} = useContext(MainChatWindowContext);


    const unSelected = {
        margin: '2px',
        backgroundColor: '#383838',
        color: 'white'
};
    const selected = {
        margin: '0px ',
        marginBottom: '5px ',
        marginTop: '5px ',
        backgroundColor: 'black',
        color: 'white'
    };

    const handleClick = (id,index) => {
        clickOnChat(id,index,true);
        setChatIndex(index);
    };
    return (
        <ThemeProvider>
            <ChatList className = {'scrollable'}>
            {chats.map((chat,index) =>(
                <div onClick={()=>handleClick(chat.id,index)} key = {chat.id} >
                    <ChatListItem style = {(index === chatIndex && !isMobile) ? selected :unSelected } >
                        {
                            chat.image
                                ?<Avatar imgUrl={chat.image}/>
                                :<Avatar letter= {chat.name.charAt(0)} style={{color: 'black !important'}}/>
                        }
                        <Column>
                            <Row justify>
                                <Title ellipsis>{chat.name}</Title>
                                <Subtitle >{chat.isOnline
                                    ? <status-indicator active ></status-indicator>
                                    :<div/>}
                                </Subtitle>
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