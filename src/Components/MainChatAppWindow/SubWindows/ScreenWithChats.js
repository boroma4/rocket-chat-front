import React, {useContext} from 'react';
import ChatWindow from "../../ChatWindow/ChatWindow";
import {MainChatWindowContext} from "../MainChatAppWindow";
import {UserChatsContext} from "../../../App";

export default function ChatSide({setChats,LoadTenMessages,SendMessage,GoBack}) {

    const {chats} = useContext(UserChatsContext);
    const {chatIndex,isMobile} = useContext(MainChatWindowContext);

    return (
        <div className={ isMobile ? 'right-side col-12' :'right-side col-8 col-sm-8 col-md-8 col-lg-10 col-xl-10 '}>
            <div className='overflow-hidden'>
                <div className="container">
                    <div className="row">
                        {chatIndex === -1
                            ?
                                chats.length !== 0
                                    ?
                                    <div className='tc center col align-self-center'
                                       id={'idle-msg'}>{'Click on a chat to start messaging!'}
                                    </div>
                                    :
                                    <div className='tc center col align-self-center'
                                         id={'idle-msg'}>{'Click on a button in top left corner and add someone!'}
                                    </div>
                            : <div className='col'>
                                <ChatWindow setChats={setChats} loadTen={LoadTenMessages} chatData={chats[chatIndex]} onSend={SendMessage} GoBack = {GoBack}/>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
