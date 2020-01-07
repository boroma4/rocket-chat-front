import React,{useState} from 'react';
import Friends from "./Components/Friends/Friends";
import Settings from "./Components/Settings/Settings";
import ChatWindow from './Components/ChatWindow/ChatWindow'
import SettingsArea from "./Components/SettingsArea/SettingsArea";

import './App.css';

const SvgPath ="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm7-7H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-1.75 9c0 .23-.02.46-.05.68l1.48 1.16c.13.11.17.3.08.45l-1.4 2.42c-.09.15-.27.21-.43.15l-1.74-.7c-.36.28-.76.51-1.18.69l-.26 1.85c-.03.17-.18.3-.35.3h-2.8c-.17 0-.32-.13-.35-.29l-.26-1.85c-.43-.18-.82-.41-1.18-.69l-1.74.7c-.16.06-.34 0-.43-.15l-1.4-2.42c-.09-.15-.05-.34.08-.45l1.48-1.16c-.03-.23-.05-.46-.05-.69 0-.23.02-.46.05-.68l-1.48-1.16c-.13-.11-.17-.3-.08-.45l1.4-2.42c.09-.15.27-.21.43-.15l1.74.7c.36-.28.76-.51 1.18-.69l.26-1.85c.03-.17.18-.3.35-.3h2.8c.17 0 .32.13.35.29l.26 1.85c.43.18.82.41 1.18.69l1.74-.7c.16-.06.34 0 .43.15l1.4 2.42c.09.15.05.34-.08.45l-1.48 1.16c.03.23.05.46.05.69z";
function App() {
    const [leftIsFriendList,setLeft] = useState(true);
    const [rightSideContent,setRight] = useState('chat');
    const feed = [{name:'John',msg:'luv u',online:3},{name:'wew',msg:'wew',online:5},{name:'Lol',msg:'kek',online:23}];

    const changeLeftSide = () =>{
         setLeft(!leftIsFriendList);
         if(leftIsFriendList){
             setRight('chat');
         }
    };
    const changeRightSide = (content) =>{
        setRight(content);
    };
    return (
      <div className="row">
        <div className='left-side col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2'>
            <div onClick={changeLeftSide} id={'btn-sett'} style={{width:20}}>

                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" >
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d={SvgPath}/>
                </svg>
            </div>
            <div className={'left-content'}>
            {leftIsFriendList
                ? <Friends friends={feed}/>
                : <Settings onSelectOpt={changeRightSide}/>
            }
            </div>
        </div>
        <div className='right-side col-8 col-sm-8 col-md-8 col-lg-10 col-xl-10 '>
            {rightSideContent === 'chat'
                ? <ChatWindow/>
                : <SettingsArea />
            }
         </div>
      </div>
  );
}

export default App;
