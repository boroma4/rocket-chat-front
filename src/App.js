import React,{useState} from 'react';
import Friends from "./Components/Friends/Friends";
import Settings from "./Components/Settings/Settings";
import ChatWindow from './Components/ChatWindow/ChatWindow'
import {Message} from 'react-chat-ui';
import SettingsArea from "./Components/SettingsArea/SettingsArea";

import './App.css';

function App() {
    const [feed,updateFeed] = useState([{name:'John',msg:[new Message({id:0,message:'lol'}),new Message({id:1,message:'lol!',senderName:'John'})]},
        {name:'Donn',msg:[new Message({id:0,message:'lol'}),new Message({id:1,message:'KEK!',senderName:'Donn'})]}]);
    const[chat,setChat] = useState(-1);
    return (
      <div className="row">
        <div className='left-side col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2'>
            <Settings/>
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
                            :<div className='col'><ChatWindow chatData={feed[chat]}/></div>
                        }
                    </div>
                </div>
            </div>

         </div>
      </div>
  );

}

export default App;
