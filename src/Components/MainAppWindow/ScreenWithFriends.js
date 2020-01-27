import React, {useContext} from 'react';
import {MainChatWindowContext} from "./MainAppWindow";
import Settings from "../Settings/Settings";
import Friends from "../Friends/Friends";
import {NotificationContext} from "../../App";
import Alert from "react-bootstrap/Alert";

export default function LeftPart({createNewChat,LoadTenMessages,updAudio,setSong,logout,setChatIndex,setNotification}) {


    const {notificationBody,notificationHeader} = useContext(NotificationContext);
    const {isMobile} = useContext(MainChatWindowContext);

    return (
        <div className={ isMobile ? 'left-side col-12' : 'left-side col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2'}>
            <Settings createNewChat={createNewChat} updateAudio={updAudio} chooseSong={setSong} logout={()=>logout()}/>
            <div className={'left-content'}>
                {
                    notificationHeader && isMobile
                        ? < Alert variant="dark" onClose={() => setNotification({}) } dismissible>
                            {`${notificationHeader}!  ${notificationBody}`}
                        </Alert>
                        : <div/>
                }
                <Friends clickOnChat={LoadTenMessages} setChatIndex = {setChatIndex}/>
            </div>
        </div>
    );
}
