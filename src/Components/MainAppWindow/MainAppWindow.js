import React,{useState,useEffect,useContext} from 'react';
import {Redirect } from "react-router-dom";
import {UserChatsContext} from "../../App";
import SwitchToMobileModal from "./SwitchToMobileModal";

import '../../App.css';
import witcher from '../../lol.mp3';
import drStone from '../../dr_stone_ending.mp3';
import {AddTenMessagesToState} from "../../Helper/ProcessData";
import useMobileDetect from 'use-mobile-detect-hook';
import LeftPart from "./ScreenWithFriends";
import RightPart from "./ScreenWithChats";



export const MainChatWindowContext = React.createContext({chatId:null,chatIndex:null,isMobile:false});



function MainAppWindow({setChats,SendMessage,logout,createNewChat,setNotification}) {

    const {user,chats} = useContext(UserChatsContext);
    const detectMobile = useMobileDetect();

    const[chatId,setChatId] = useState(-1);
    const[chatIndex,setChatIndex] = useState(-1);
    const[song,setSong] = useState(null);
    const[redirect,setRedirect] = useState(false);
    const[isMobile,setIsMobile] = useState(false);
    const[partToShow,setPartToShow] = useState('left');


    const setSongMP3 = (songname) =>{
        switch (songname) {
            case 'witcher':
                return witcher;
            case 'drStone':
                return drStone;
            default:
                return;
        }
    };

    //Fetches the messages and updates the state of chats
    const LoadTenMessages = (id,index,shouldSetChatId) =>{

        // if should set chat id => method was called when clicking on a chat on the left, else from a chat itself
        if(shouldSetChatId) setChatId(id);

        let currentChatsState = Object.assign([],chats);
        // works as a pointer (e.g changing this object will change it in the array as well)
        let currentChat = currentChatsState[index];

        //if there are more than 10 messages in the chat already, don't load new on first click
        if(!currentChat.lastMessagesAreFetched && currentChat.msg.length >= 10){
            currentChat.lastMessagesAreFetched = true;
        }

        //fetch only if it is first click on chat or when more messages are requested from chat + chat has more than 10 messages already
        if(!currentChat.lastMessagesAreFetched || (!shouldSetChatId && currentChat.msg.length > 10)) {
            AddTenMessagesToState(id,user,currentChat)
                .then(newState => {
                    currentChat = newState;
                    setChats(currentChatsState);
                })
                .then( something=>{
                    const chatWindow = document.getElementsByClassName("chat-history")[0];
                    chatWindow.scrollTop = 0;
                })
                .catch(err => {
                    console.log(err);
                    alert('error loading messages');
                });
        }
    };

    const updAudio = (enable) => {
        const a = document.getElementsByTagName("audio")[0];
        enable ? a.play() : a.pause();
    };

    const setChatOnMobile = (index) =>{
        setChatIndex(index);
        setPartToShow('right');
    };

    useEffect(()=>{
        if(!user){
            setRedirect(true);
        };
    }, [detectMobile, user]);

    return (
        <>
            <MainChatWindowContext.Provider value = {{chatId,chatIndex,isMobile}} >

                {detectMobile.isMobile()
                    ?<SwitchToMobileModal setIsMobile={setIsMobile}/>
                    :<div/>}
                {redirect
                    ? <Redirect to ={'/'}/>
                    : <div className="row">
                        <audio src={setSongMP3(song)} preload={'true'} loop/>
                        {isMobile
                            ?
                            partToShow === 'left'
                                ?<LeftPart LoadTenMessages={LoadTenMessages} createNewChat={createNewChat} logout={logout} setChatIndex={setChatOnMobile} setSong={setSong} updAudio={updAudio} setNotification={setNotification}/>
                                :<RightPart setNotification={setNotification} LoadTenMessages={LoadTenMessages} SendMessage={SendMessage} GoBack = {setPartToShow} />
                            : <>
                                <LeftPart LoadTenMessages={LoadTenMessages} createNewChat={createNewChat} logout={logout} setChatIndex={setChatIndex} setSong={setSong} updAudio={updAudio}/>
                                <RightPart setNotification={setNotification} LoadTenMessages={LoadTenMessages} SendMessage={SendMessage} />
                            </>
                        }
                    </div>
                }
            </MainChatWindowContext.Provider>
        </>
    );
}
export default MainAppWindow;
