import React,{useState} from 'react';
import Friends from "./Components/Friends/Friends";
import Settings from "./Components/Settings/Settings";
import ChatWindow from './Components/ChatWindow/ChatWindow'
import {Message} from 'react-chat-ui';
import face_mp3 from './lol.mp3';
import './App.css';

function App() {
    const [feed,updateFeed] = useState([{name:'John',msg:[new Message({id:0,message:'lol'}),new Message({id:1,message:'lol!',senderName:'John'})]},
        {name:'Donn',msg:[new Message({id:0,message:'lol'}),new Message({id:1,message:'KEK!',senderName:'Donn'})]}]);

    const[chat,setChat] = useState(-1);

    const SendMessage = (msgText) => {
        updateFeed(prevState => {
            let updatedChat = Object.assign([],prevState[chat]);
            updatedChat.msg.push(new Message({id:0,message:msgText}));
          return Object.assign([],prevState,updatedChat);
      })
    };

    const updAudio = (enable) => {
        const a = document.getElementsByTagName("audio")[0];
        enable ? a.play() : a.pause();
    };
    return (
      <div className="row">
          <audio src={face_mp3} preload loop/>
          <div className='left-side col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2'>
            <Settings updateAudio ={updAudio}/>
            <div className={'left-content'}>
                <Friends friends={feed} clickFriend = {setChat}/>
            </div>
        </div>
        <div className='right-side col-8 col-sm-8 col-md-8 col-lg-10 col-xl-10 '>
            <div>
                <div className="container">
                    <div className="row">
                        {chat === -1
                            ?<div className='tc text-capitalize center col align-self-center' id={'idle-msg'}>Click on chat to start messaging</div>
                            :<div className='col'><ChatWindow chatData={feed[chat]} onSend={SendMessage}/></div>
                        }
                    </div>
                </div>
            </div>
         </div>
      </div>
  );

}

export default App;
