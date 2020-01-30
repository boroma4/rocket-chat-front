import React, {useContext} from 'react';
import ChatWindow from "../ChatWindow/ChatWindow";
import {MainChatWindowContext} from "./MainAppWindow";
import {UserChatsContext} from "../../App";

export default function RightPart({LoadTenMessages,SendMessage,GoBack}) {

    const {chats} = useContext(UserChatsContext);
    const {chatIndex,isMobile} = useContext(MainChatWindowContext);

    return (
        <div className={ isMobile ? 'right-side col-12' :'right-side col-8 col-sm-8 col-md-8 col-lg-10 col-xl-10 '}>
            <div>
                <div className="container">
                    <div className="row">
                        {chatIndex === -1
                            ? <div className='tc center col align-self-center'
                                   id={'idle-msg'}>{'Click on a chat to start messaging!'}</div>
                            : <div className='col'>
                                <ChatWindow loadTen={LoadTenMessages} chatData={chats[chatIndex]} onSend={SendMessage} GoBack = {GoBack}/>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
