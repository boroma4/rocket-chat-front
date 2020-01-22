import React,{useState,useEffect} from 'react';
import Friends from "./Components/Friends/Friends";
import Settings from "./Components/Settings/Settings";
import ChatWindow from './Components/ChatWindow/ChatWindow'
import {Redirect } from "react-router-dom";

import './App.css';
import witcher from './lol.mp3';
import drStone from './dr_stone_ending.mp3';

//feed model is -> array of object with chatid,person name,array of msgs
//if msg is sent by client -> msg id has to be 0 (third party UI library works this way)

function ChatMain({user,chats,setChats,SendMessage,logout,createNewChat,fetchLastMessages}) {

    const[chatId,setChatId] = useState(-1);
    const[chatIndex,setChatIndex] = useState(0);
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
    const loadLastMessagesAndSetChatId = (id,index) =>{
        setChatId(id);
        let currentChatsState = Object.assign([],chats);
        // works as a pointer (e.g changing this object will change it in the array as well)
        let currentChat = currentChatsState[index];

        // if there was a preloaded last message remove it
        // also mark this non-empty! chat as fetched
        if(currentChat.msg.length === 1){
            currentChat.msg.pop();
        }
        if(!currentChat.lastMessagesAreFetched) {
            fetchLastMessages(id)
                .then(messages => {
                    messages.forEach((msg, i) => {
                        currentChat.msg.push(msg);
                    });
                    currentChat.lastMessagesAreFetched = true;
                    console.log(currentChatsState);
                    setChats(currentChatsState);
                })
                .catch(err => console.log(err));
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
                        <Settings createNewChat={createNewChat} userId={user ? user.userId : 0} updateAudio={updAudio} chooseSong={setSong} logout={()=>logout()}/>
                        <div className={'left-content'}>
                            <Friends chats={chats} clickOnChat={loadLastMessagesAndSetChatId} setChatIndex = {setChatIndex}/>
                        </div>
                    </div>
                    <div className='right-side col-8 col-sm-8 col-md-8 col-lg-10 col-xl-10 '>
                        <div>
                            <div className="container">
                                <div className="row">
                                    {chatId === -1
                                        ? <div className='tc center col align-self-center'
                                               id={'idle-msg'}>{'Chat is being developed,stay tuned.'}</div>
                                        : <div className='col'><ChatWindow chatData={chats[chatIndex]} onSend={SendMessage(chatId,chatIndex)}/>
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
export default ChatMain;
