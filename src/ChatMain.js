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

function ChatMain({user,feed,SendMessage,logout}) {

    const[chat,setChat] = useState(-1);
    const[song,setSong] = useState(null);
    const[redirect,setRedirect] = useState(false);



    const setSongMP3 = (songname) =>{
      switch (songname) {
          case 'witcher':
              return witcher;
          case 'drStone':
              return drStone;
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
    });

    return (
        <>
            {redirect
                ? <Redirect to ={'/'}/>
                : <div className="row">
                    <audio src={setSongMP3(song)} preload loop/>
                    <div className='left-side col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2'>
                        <Settings updateAudio={updAudio} chooseSong={setSong} logout={()=>logout()}/>
                        <div className={'left-content'}>
                            <Friends friends={feed} clickFriend={setChat}/>
                        </div>
                    </div>
                    <div className='right-side col-8 col-sm-8 col-md-8 col-lg-10 col-xl-10 '>
                        <div>
                            <div className="container">
                                <div className="row">
                                    {chat === -1
                                        ? <div className='tc center col align-self-center'
                                               id={'idle-msg'}>{'Chat is being developed,stay tuned.'}</div>
                                        : <div className='col'><ChatWindow chatData={feed[chat]} onSend={SendMessage(chat)}/>
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
