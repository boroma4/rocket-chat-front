import React, {useContext} from 'react';
import Alert from "react-bootstrap/Alert";
import ChatWindow from "../ChatWindow/ChatWindow";
import {MainChatWindowContext} from "./ChatMainWindow";
import {NotificationContext, UserChatsContext} from "../../App";

export default function RightPart({setNotification,LoadTenMessages,SendMessage,GoBack}) {

    const {chats} = useContext(UserChatsContext);
    const {notificationBody,notificationHeader} = useContext(NotificationContext);
    const {chatIndex,isMobile} = useContext(MainChatWindowContext);

    return (
        <div className={ isMobile ? 'left-side col-12' :'right-side col-8 col-sm-8 col-md-8 col-lg-10 col-xl-10 '}>
            <div>
                <div className="container">
                    {
                        notificationHeader
                            ? < Alert variant="dark" onClose={() => setNotification({}) } dismissible>
                                {`${notificationHeader}!  ${notificationBody}`}
                            </Alert>
                            : <div/>
                    }
                    <div className="row">
                        {chatIndex === -1
                            ? <div className='tc center col align-self-center'
                                   id={'idle-msg'}>{'Click on a chat to start messaging!'}</div>
                            : <div className='col'>
                                <ChatWindow loadTen={LoadTenMessages} chatData={chats[chatIndex]} onSend={SendMessage(chatIndex,chatIndex)} GoBack = {GoBack}/>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
