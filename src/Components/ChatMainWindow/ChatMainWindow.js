import React,{useState,useEffect,useContext} from 'react';
import Friends from "../Friends/Friends";
import Settings from "../Settings/Settings";
import ChatWindow from '../ChatWindow/ChatWindow'
import {Redirect } from "react-router-dom";
import {NotificationContext, UserChatsContext} from "../../App";
import Alert from "react-bootstrap/Alert";
import SwitchToMobileModal from "./SwitchToMobileModal";
import '../../App.css';
import witcher from '../../lol.mp3';
import drStone from '../../dr_stone_ending.mp3';
import {AddTenMessagesToState} from "../../Helper/ProcessData";
import useMobileDetect from 'use-mobile-detect-hook';



export const ChatIdIndexContext = React.createContext({chatId:null,chatIndex:null});
export const IsMobileContext = React.createContext(false);



function ChatMainWindow({setChats,SendMessage,logout,createNewChat,setNotification}) {

    const {user,chats} = useContext(UserChatsContext);
    const {notificationBody,notificationHeader} = useContext(NotificationContext);
    const detectMobile = useMobileDetect();

    const[chatId,setChatId] = useState(-1);
    const[chatIndex,setChatIndex] = useState(-1);
    const[song,setSong] = useState(null);
    const[redirect,setRedirect] = useState(false);
    const[isMobile,setIsMobile] = useState(false);




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

    useEffect(()=>{
       if(!user){
           setRedirect(true);
       };
    }, [detectMobile, user]);

    return (
        <>
            {detectMobile.isMobile()
            ?<SwitchToMobileModal setIsMobile={setIsMobile}/>
                :<div/>}
            {redirect
                ? <Redirect to ={'/'}/>
                : <div className="row">
                    <audio src={setSongMP3(song)} preload loop/>
                    <div className='left-side col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2'>
                        <Settings createNewChat={createNewChat} updateAudio={updAudio} chooseSong={setSong} logout={()=>logout()}/>
                        <div className={'left-content'}>
                        <ChatIdIndexContext.Provider value = {{chatId,chatIndex}}>
                            <Friends clickOnChat={LoadTenMessages} setChatIndex = {setChatIndex}/>
                        </ChatIdIndexContext.Provider>

                </div>
                    </div>
                    <div className='right-side col-8 col-sm-8 col-md-8 col-lg-10 col-xl-10 '>
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
                                    {chatId === -1
                                        ? <div className='tc center col align-self-center'
                                               id={'idle-msg'}>{'Click on a chat to start messaging!'}</div>
                                        : <div className='col'>
                                            <ChatIdIndexContext.Provider value = {{chatId,chatIndex}} >
                                                <ChatWindow loadTen={LoadTenMessages} chatData={chats[chatIndex]} onSend={SendMessage(chatId,chatIndex)}/>
                                            </ChatIdIndexContext.Provider>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
  );
}
export default ChatMainWindow;
