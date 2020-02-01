import React, {useContext} from 'react';
import {MainChatWindowContext} from "./MainAppWindow";
import Settings from "../Settings/Settings";
import Friends from "../Friends/Friends";

export default function LeftPart({createNewChat,LoadTenMessages,updAudio,setSong,logout,setChatIndex,setUser}) {


    const {isMobile} = useContext(MainChatWindowContext);

    return (
        <div className={ isMobile ? 'left-side col-12' : 'left-side col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2'}>
            <Settings createNewChat={createNewChat} updateAudio={updAudio} chooseSong={setSong} logout={()=>logout()} setUser={setUser}/>
            <Friends clickOnChat={LoadTenMessages} setChatIndex = {setChatIndex}/>
        </div>
    );
}
