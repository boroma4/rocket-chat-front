import React, {useContext, useEffect} from 'react';
import Input from "../InputField/Input";
import './Chat.css';
import {MainChatWindowContext} from "../MainAppWindow/MainAppWindow";
import Button from "react-bootstrap/Button";
import ChatPanel from "./Panel/ChatPanel";



function ChatWindow({chatData,onSend,loadTen,GoBack}) {

    const {chatId,chatIndex,isMobile} = useContext(MainChatWindowContext);

    const LoadMoreMessages = (event) => {
        loadTen(chatId,chatIndex,false);
    };
    return (
            <div id = {'chat-side'}>
                {
                    isMobile
                        ?<div className="container" >
                            <div className="row header">
                                    <Button type="button" variant='secondary' className="col-2 arrow-back " onClick={()=>GoBack('left')}>
                                        <span className="btn-label">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path fill="none" d="M0 0h24v24H0V0z"/>
                                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                                            </svg>
                                        </span>
                                        Back
                                    </Button>
                                <div className='white tc col-10' style={{backgroundColor:'#6c757d'}}>
                                    <strong className='black'>{chatData.name}</strong> is<span className={chatData.isOnline?'dark-blue':'white'}> {chatData.isOnline ? ' online' : ' offline'}</span>

                                    <h5 className= 'hover-bg-white-40 pointer' onClick={LoadMoreMessages}>
                                        Load more messages
                                    </h5>
                                </div>
                            </div>
                        </div>
                        : <h4 className='white tc hover-bg-white-40 pointer col-10 flex-none' onClick={LoadMoreMessages}>
                            Load more
                        </h4>
                }

                {
                    <ChatPanel
                        messages={chatData.msg}>
                    </ChatPanel>
                }
                <footer className={'footer'}>
                    <Input onSendClick={onSend}/>
                </footer>
            </div>
    );


}
export default ChatWindow;