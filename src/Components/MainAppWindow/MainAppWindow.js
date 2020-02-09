import React,{useState,useEffect,useContext} from 'react';
import {Redirect } from "react-router-dom";
import {UserChatsContext} from "../../App";
import SwitchToMobileModal from "./SwitchToMobileModal";
import '../../App.css';
import witcher from '../../sounds/lol.mp3';
import drStone from '../../sounds/dr_stone_ending.mp3';
import {AddTenMessagesToState} from "../../Helpers/ProcessData";
import useMobileDetect from 'use-mobile-detect-hook';
import LeftPart from "./SubWindows/ScreenWithFriends";
import RightPart from "./SubWindows/ScreenWithChats";
import {createHubConnection} from "../../Helpers/HubConnection";
import {useToasts} from "react-toast-notifications";

export const MainChatWindowContext = React.createContext({chatId:null,chatIndex:null,isMobile:false});

const MainAppWindow =({setChats,SendMessage,logout,createNewChat,setUser,setHubConnection})=> {

    const {user,chats} = useContext(UserChatsContext);
    const detectMobile = useMobileDetect();
    const {addToast,removeToast } = useToasts();

    const[chatId,setChatId] = useState(-1);
    const[chatIndex,setChatIndex] = useState(-1);
    const[song,setSong] = useState(null);
    const[redirect,setRedirect] = useState(false);
    const[isMobile,setIsMobile] = useState(false);
    const[partToShow,setPartToShow] = useState('left');


    useEffect( ()=>{
            createHubConnection(setUser,setChats,setHubConnection,PopUpNotification,setChatIndex,setChatId)
                .then(hub=>setHubConnection(hub));
    },[]);

    //Add toast with desired style and content, remove it after the timeout
    const PopUpNotification = (content,appearance,removeTimer) =>{
        addToast(content, {
                appearance: appearance,
                autoDismiss: false,
            },(id)=> {
                // if timer is more then a minute just keep it there forever, else destroy after timeout
                if (removeTimer < 60000) setTimeout(() => removeToast(id), removeTimer);
            }
        );
    };
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

    const UpdateUserData = (type,value) =>{
        //hack will be removed later, when Redux will be used
        let l_hub;
        setHubConnection(hub=>{
          l_hub = hub;
          return hub;
         });
      setUser(user=>{
          let newUser = {...user};
          switch (type) {
              case 'image':
                  newUser.imageUrl = value;
                  break;
              case 'name':
                  newUser.userName = value;
                  break;
              case 'notifications':
                  newUser.notificationSettings = value;
                  break;
              default:
                  break;
          }
          return newUser;
      });
      if(type !== 'notifications'){
          l_hub.invoke('UserDataChanged',user.userId,type,value);
      }
    };

    //Fetches the messages and updates the state of chats
    const LoadTenMessages = (id,index,shouldSetChatId) =>{

        // if should set chat id => method was called when clicking on a chat on the left, else from a chat itself
        if(shouldSetChatId) setChatId(id);

        let currentChatsState = [...chats];
        // works as a pointer (e.g changing this object will change it in the array as well)
        let currentChat = currentChatsState[index];

        //if there are more than 10 messages in the chat already, don't load new on first click
        if(!currentChat.lastMessagesAreFetched && currentChat.msg.length > 10) currentChat.lastMessagesAreFetched = true;

        //fetch only if it is first click on chat or when more messages are requested from chat + chat has more than 10 messages already
        if(!currentChat.lastMessagesAreFetched || (!shouldSetChatId && currentChat.msg.length > 10)) {
            const numberOfMessages = currentChat.msg.length;
            AddTenMessagesToState(id,user,currentChat)
                .then(newState => {
                    // if anything has changed, update and scroll
                    if(numberOfMessages !== newState.msg.length){
                        setChats(currentChatsState);
                        const chatWindow = document.getElementsByClassName("chat-history")[0];
                        chatWindow.scrollTop = 0;
                    }
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

    const SendMessageAndSetIndex = (text) =>{
      const SendMessageWithChatData = SendMessage(chatId,chatIndex);
      SendMessageWithChatData(text);
      setChatIndex(0);
    };

    useEffect(()=>{
        if(!user){
            setRedirect(true);
        }
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
                                ?<LeftPart LoadTenMessages={LoadTenMessages} createNewChat={createNewChat} logout={logout} setChatIndex={setChatOnMobile} setSong={setSong} updAudio={updAudio} UpdateUserData={UpdateUserData}/>
                                :<RightPart  LoadTenMessages={LoadTenMessages} SendMessage={SendMessageAndSetIndex} GoBack = {setPartToShow} />
                            : <>
                                <LeftPart LoadTenMessages={LoadTenMessages} createNewChat={createNewChat} logout={logout} setChatIndex={setChatIndex} setSong={setSong} updAudio={updAudio} UpdateUserData={UpdateUserData}/>
                                <RightPart LoadTenMessages={LoadTenMessages} SendMessage={SendMessageAndSetIndex} />
                            </>
                        }
                    </div>
                }
            </MainChatWindowContext.Provider>
        </>
    );
};
export default MainAppWindow;
