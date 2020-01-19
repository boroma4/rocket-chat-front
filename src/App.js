import React,{useState} from 'react';
import Friends from "./Components/Friends/Friends";
import Settings from "./Components/Settings/Settings";
import ChatWindow from './Components/ChatWindow/ChatWindow'
import {Message} from 'react-chat-ui';
import {SongList} from "./Constants/Const";


import './App.css';
import HubConnection from "./Helper/HubConnection";
import WelcomePage from "./Components/Welcome/WelcomePage";
import witcher from './lol.mp3';
import drStone from './dr_stone_ending.mp3';


function App() {
    const [feed,updateFeed] = useState([{name:'John',msg:[new Message({id:0,message:'lol'}),new Message({id:1,message:'lol!',senderName:'John'})]},
        {name:'Donn',msg:[new Message({id:0,message:'lol'}),new Message({id:1,message:'KEK!',senderName:'Donn'})]}]);

    const[chat,setChat] = useState(-1);
    const[signedIn,setSignInStatus] = useState(false);
    const[user,setUser] = useState(null);
    const[hubConnection,setHubConnection] = useState(null);
    const[song,setSong] = useState(null);


    const setSongMP3 = (songname) =>{
      switch (songname) {
          case 'witcher':
              return witcher;
          case 'drStone':
              return drStone;
      }
    };

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

    const logout = () => {
      setSignInStatus(false);
      setUser(null);
      setUser(null);
      setHubConnection(null);
    };

    const loginOrRegister = (creditentials,endpoint) => {
        let status;
        fetch(`https://localhost:5001/api/${endpoint}`,{
            method:'post',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify(creditentials)
        })
            .then(res =>res.json())
            .then(res=> {
                console.log(res[0]);
                if(res){
                    setSignInStatus(true);
                    setUser(res[0]);
                    setHubConnection(HubConnection());
                    status = 'resolve';
                }
            })
            .catch(err=> {
                console.log(err);
                status = 'reject';
            });
        return new Promise((res,rej)=>{
            status === 'resolve'? res(status):rej(status);
        })
    };
    return (
        <>
            {
                signedIn
                    ? <div className="row">
                    <audio src={setSongMP3(song)} preload loop/>
                    <div className='left-side col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2'>
                        <Settings updateAudio={updAudio} chooseSong={setSong}  logout={()=>logout()}/>
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
                                        : <div className='col'><ChatWindow chatData={feed[chat]} onSend={SendMessage}/>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    : <WelcomePage loginOrRegister={loginOrRegister}/>
            }
        </>
  );
}
export default App;
