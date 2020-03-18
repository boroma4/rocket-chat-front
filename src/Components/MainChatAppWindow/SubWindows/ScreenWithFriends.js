import React, {useContext} from 'react';
import {MainChatWindowContext} from "../MainChatAppWindow";
import Settings from "../../Settings/Settings";
import Friends from "../../Friends/Friends";

export default function FriendsSide({createNewChat,LoadTenMessages,updAudio,setSong,logout,setChatIndex,UpdateUserData}) {


    const {isMobile} = useContext(MainChatWindowContext);

    return (
        <div className={ isMobile ? 'left-side col-12' : 'left-side col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2'}>
            <Settings createNewChat={createNewChat} updateAudio={updAudio} chooseSong={setSong} logout={()=>logout()} UpdateUserData={UpdateUserData}/>
            <Friends clickOnChat={LoadTenMessages} setChatIndex = {setChatIndex}/>
        </div>
    );
}
