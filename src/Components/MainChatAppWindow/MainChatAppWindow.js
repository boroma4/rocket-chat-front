import React,{useState,useEffect,useContext} from 'react';
import {Redirect } from "react-router-dom";
import {UserChatsContext} from "../../App";
import SwitchToMobileModal from "./Modals/SwitchToMobileModal";
import '../../App.css';
import witcher from '../../sounds/lol.mp3';
import drStone from '../../sounds/dr_stone_ending.mp3';
import {AddTenMessagesToState} from "../../Helpers/ProcessData";
import useMobileDetect from 'use-mobile-detect-hook';
import FriendsSide from "./SubWindows/ScreenWithFriends";
import ChatSide from "./SubWindows/ScreenWithChats";
import {CreateMainHubConnection} from "../../Helpers/HubConnection";
import {useToasts} from "react-toast-notifications";
import {useCookies} from 'react-cookie';
import {ScrollChatToBottom} from "../../Helpers/Scroller";
import {GameInviteSent} from "../Notifications/Notifications";
import {gapi} from "gapi-script";
import {AESIV, AESKEY} from "../../Constants/Const";
import {MessageIF} from "../ChatWindow/Message/MessageIF";
import {GAMEACTIONS} from "../Games/GamesList";

const CryptoJS = require("crypto-js");

export const MainChatWindowContext = React.createContext({chatId:null,chatIndex:null,isMobile:false});

const MainChatAppWindow =({setChats,setUser})=> {

    const {user,chats} = useContext(UserChatsContext);
    const detectMobile = useMobileDetect();
    const {addToast,removeToast } = useToasts();

    const[hubConnection,setHubConnection] = useState(null);
    const[chatId,setChatId] = useState(-1);
    const[chatIndex,setChatIndex] = useState(-1);
    const[song,setSong] = useState(null);
    const[redirect,setRedirect] = useState(false);
    const[isMobile,setIsMobile] = useState(false);
    const[partToShow,setPartToShow] = useState('left');

    const [cookies,setCookie,removeCookie] = useCookies(['userToken']);


    useEffect( ()=>{
            CreateMainHubConnection(setUser,setChats,setHubConnection,PopUpNotification,setChatIndex,setChatId)
                .then(hub=> setHubConnection(hub));
    },[]);


    useEffect(()=>{
        if(!user) setRedirect(true);
    }, [detectMobile, user]);

    //Add toast with desired style and content, remove it after the timeout
    const PopUpNotification = (content,appearance,removeTimer) =>{
        addToast(content, {appearance: appearance, autoDismiss: false,}, (id)=> {
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


    const CreateNewChat = (chatId,chatName,friendImageUrl) => {
        hubConnection.invoke('ChatWithUserWasCreated',user.userId,chatId,{chatId,chatName:user.userName,image:user.imageUrl});
        setChats(prevState => {
            let updatedChat = Object.assign([],prevState);
            updatedChat.push({id:chatId,image:friendImageUrl,name:chatName,msg:[],game:{}});
            return updatedChat;
        })
    };

    const UpdateUserData = (type,value) =>{
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
          hubConnection.invoke('UserDataChanged',user.userId,type,value);
      }
      removeCookie('userToken');
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
            const shouldScrollUp = currentChat.lastMessagesAreFetched;
            const chatWindow = document.getElementsByClassName("chat-panel")[0];
            AddTenMessagesToState(id,user,currentChat)
                .then(newState => {
                    // if anything has changed, update and scroll
                    if(numberOfMessages !== newState.msg.length){
                        setChats(currentChatsState);
                        if(shouldScrollUp) chatWindow.scrollTop = 0;
                        else ScrollChatToBottom();
                    }
                })
                .catch(err => {
                    console.log(err);
                    alert('error loading messages');
                });
        }
    };

    //Function that uses a closure(google it)
    //after determining chat data, renders a new message + sends it to the server on the next invoke
    const SendMessage = (chatId,chatIndex) => {
        let l_chatIndex = chatIndex;
        let l_chatId = chatId;
        //invoke 'sendMessage' with chatId most likely
        return function (msgText,isInvite = false) {
            let ciphertext = CryptoJS.AES.encrypt(msgText,
                CryptoJS.enc.Base64.parse(AESKEY),
                {iv:CryptoJS.enc.Base64.parse(AESIV) }).toString();

            hubConnection.invoke('SendDirectMessage',user.userId,l_chatId,ciphertext,isInvite).catch(err=>console.log(err));

            if(!isInvite) {
                setChats(prevState => {
                    let updatedChats = Object.assign([], prevState);
                    const neededChat = updatedChats[l_chatIndex];
                    neededChat.msg.push(new MessageIF({id: 0, message: msgText, dateTime: new Date()}));

                    updatedChats.splice(l_chatIndex, 1);
                    updatedChats.unshift(neededChat);
                    return updatedChats;
                });
                setTimeout(()=>{
                    ScrollChatToBottom();
                },20);
            }

        };
    };
    const updAudio = (enable) => {
        const a = document.getElementsByTagName("audio")[0];
        enable ? a.play() : a.pause();
    };

    const setChatOnMobile = (index) =>{
        setChatIndex(index);
        setPartToShow('right');
    };

    const SendMessageAndSetIndex = (text,isInvite = false) =>{
        //triggering closure
      const SendMessageWithChatData = SendMessage(chatId,chatIndex);
      const gameExists = Boolean(chats[chatIndex].game.name);
      // if it is legal to send a message do it
      if(!isInvite || (isInvite && !gameExists))SendMessageWithChatData(text,isInvite);
      // if it is a game invite
      if(isInvite) {
          if(gameExists) PopUpNotification(<GameInviteSent failed ={true} sound={user.notificationSettings.sound}/>,'info',5000);
          else PopUpNotification(<GameInviteSent failed ={false} sound={user.notificationSettings.sound}/>,'info',5000);
      }else{
          setChatIndex(0);
      }
    };

    const logout = () => {
        setUser(null);
        hubConnection.stop();
        setHubConnection(null);
        TryToDoGoogleLogout();
        removeCookie('userToken');
    };

    const TryToDoGoogleLogout= () => {
        try{
            const auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(auth2.disconnect());
        }
        catch (e) {console.log('Not a googler!')}
    };

    const InGameAction = (action,data) => {
        switch (action) {
            //surrender
            case GAMEACTIONS[1]:
                if(data.surrender)PopUpNotification(`YOU LOST your game against  ${chats[chatIndex].name}! `,'error',5000);
                else PopUpNotification(`YOU WON your game against ${chats[chatIndex].name}!`,'success',5000);
                break;
            //start
            case GAMEACTIONS[0]:
                ScrollChatToBottom();
                break;
            default:
                break;
        }
        hubConnection.invoke(action,user.userId,chatId,data)
    };

    return (
        <>
            <MainChatWindowContext.Provider value = {{chatId,chatIndex,isMobile}} >
                {detectMobile.isMobile() ?<SwitchToMobileModal setIsMobile={setIsMobile}/> :<div/>}
                {redirect
                    ? <Redirect to ={'/'}/>
                    : <div className="row">
                        <audio src={setSongMP3(song)} preload={'true'} loop/>
                        {isMobile
                            ?
                            partToShow === 'left'
                                ?<FriendsSide LoadTenMessages={LoadTenMessages} createNewChat={CreateNewChat} logout={logout} setChatIndex={setChatOnMobile} setSong={setSong} updAudio={updAudio} UpdateUserData={UpdateUserData}/>
                                :<ChatSide InGameAction={InGameAction} setChats={setChats} LoadTenMessages={LoadTenMessages} SendMessage={SendMessageAndSetIndex} GoBack = {setPartToShow} />
                            : <>
                                <FriendsSide LoadTenMessages={LoadTenMessages} createNewChat={CreateNewChat} logout={logout} setChatIndex={setChatIndex} setSong={setSong} updAudio={updAudio} UpdateUserData={UpdateUserData}/>
                                <ChatSide InGameAction={InGameAction} setChats={setChats} LoadTenMessages={LoadTenMessages} SendMessage={SendMessageAndSetIndex} />
                            </>
                        }
                    </div>
                }
            </MainChatWindowContext.Provider>
        </>
    );
};
export default MainChatAppWindow;
