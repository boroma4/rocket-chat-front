import React,{useState,useEffect,useContext} from 'react';
import Friends from "../Friends/Friends";
import Settings from "../Settings/Settings";
import ChatWindow from '../ChatWindow/ChatWindow'
import {Redirect } from "react-router-dom";
import {UserChatsContext} from "../../App";

import '../../App.css';
import witcher from '../../lol.mp3';
import drStone from '../../dr_stone_ending.mp3';
import {AddTenMessagesToState} from "../../Helper/ProcessData";


export const ChatIdIndexContext = React.createContext({chatId:null,chatIndex:null});


function ChatMainWindow({setChats,SendMessage,logout,createNewChat}) {

    const {user,chats} = useContext(UserChatsContext);


    const[chatId,setChatId] = useState(-1);
    const[chatIndex,setChatIndex] = useState(-1);
    const[song,setSong] = useState(null);
    const[redirect,setRedirect] = useState(false);



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
        if(!currentChat.lastMessagesAreFetched || !shouldSetChatId) {
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
       }
    }, [user]);

    return (
        <>
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
