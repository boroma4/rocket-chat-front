import React, {useContext, useEffect, useState} from 'react';
import Input from "../InputField/Input";
import './Chat.css';
import {MainChatWindowContext} from "../MainChatAppWindow/MainChatAppWindow";
import {Button as BootstrapButton} from "react-bootstrap";
import ChatPanel from "./Panel/ChatPanel";
import {CalculateScrollDistance, ScrollChatToBottom} from "../../Helpers/Scroller";



function ChatWindow({InGameAction,setChats,chatData,onSend,loadTen,GoBack}) {

    const {chatId,chatIndex,isMobile,isIOS} = useContext(MainChatWindowContext);
    const[scrollPercentage,setScrollPercentage] = useState(100);

    useEffect(()=>{
        listenToScrollEvent();
    },[]);


    const LoadMoreMessages = (event) => {
        loadTen(chatId,chatIndex,false);
        setScrollPercentage(CalculateScrollDistance());
    };

    const listenToScrollEvent = () => {
        document.getElementsByClassName("chat-panel")[0].addEventListener("scroll", () => {
            requestAnimationFrame(() => {
                setScrollPercentage(CalculateScrollDistance());
            });
        });
    };
    return (
            <div id = {'chat-side'}>
                {
                    isMobile
                        ? <div className="container">
                            <div className="row header">
                                <BootstrapButton type="button" variant='secondary' className="col-2 arrow-back "
                                                 onClick={() => GoBack('left')}>
                                        <span className="btn-label">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24">
                                            <path fill="none" d="M0 0h24v24H0V0z"/>
                                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                                            </svg>
                                        </span>
                                    Back
                                </BootstrapButton>
                                <div className='white tc col-10' style={{backgroundColor: '#6c757d'}}>
                                    <strong className='black'>{chatData.name}</strong> is<span
                                    className={chatData.isOnline ? 'dark-blue' : 'white'}> {chatData.isOnline ? ' online' : ' offline'}</span>

                                    <h5 className='hover-bg-white-40 pointer' onClick={LoadMoreMessages}>
                                        Load more messages
                                    </h5>
                                </div>
                            </div>
                        </div>
                        :
                        <h4 className='white tc hover-bg-white-40 pointer col-10 flex-none align-self-center' onClick={LoadMoreMessages}>
                            Load more
                        </h4>
                }
                {
                    <ChatPanel
                        InGameAction = {InGameAction}
                        setChats={setChats}
                        chatData={chatData}>
                    </ChatPanel>
                }
                {(scrollPercentage <= 55)
                    ?<div>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className='down-btn' onClick={()=> ScrollChatToBottom()}>
                            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                            <path d="M0 0h24v24H0V0z" fill="none"/>
                        </svg>
                    </div>
                    :<div/>
                }
                <footer className={isIOS && !chatData.game.name ? 'footer-i':'footer-d' }>
                    <Input onSendClick={onSend}/>
                </footer>
            </div>
    );
}
export default ChatWindow;
