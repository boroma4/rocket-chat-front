import {HubConnectionBuilder} from "@aspnet/signalr";
import { FindChatIndexByChatId,CheckIfChatIdMatchIsPresent} from "./ProcessData";
import {AESKEY,AESIV, BackendLink} from "../Constants/Const";
import {SetUserOffline} from "./ApiFetcher";
import {ReconnectFail,OnlineOrOffline,NewChat,NewMessage} from "../Components/Notifications/Notifications";
import React from "react";
import {MessageIF} from "../Components/ChatWindow/Message/MessageIF";
const CryptoJS = require("crypto-js");

//very very hacky
export async function createHubConnection (setUser,setChats,setHub,PopupNotification,setChatIndex,setChatId) {

    const hubConnect = new HubConnectionBuilder()
        .withUrl(`${BackendLink}/chat`)
        .build();

    // my fav hack
    let loc_user;
    setUser(prev=>{
        loc_user = prev;
        return prev;
    });

    if(!loc_user) return;

    try {
        await hubConnect.start();

        //show others u went online
        await hubConnect.invoke('UserWentOfflineOrOnline',true,loc_user.userId);

        const {sound,connectionChanged} = loc_user.notificationSettings;

        if(connectionChanged) PopupNotification(<OnlineOrOffline online = {true} sound={sound}/>,'success',3000);

        //after socket dies, it sends a request to put user offline in the db
        hubConnect.onclose(() => {
            SetUserOffline(loc_user.userId);
            // need to use this hack again :((
            let l_user;
            setUser(prev=>{
                l_user = prev;
                return prev;});
            // if user still exists -> show notification that he is offline else he logged out and try to reconnect
                if (l_user) {
                    const {sound,connectionChanged} = l_user.notificationSettings;
                    if(connectionChanged) PopupNotification(<OnlineOrOffline sound={sound} online={false}/>, 'warning', 3000);
                    Reconnect(0,hubConnect,setHub,PopupNotification,l_user.notificationSettings)
                        .then(()=>{
                                //TODO load messages that were missed and add to state instead of discarding all
                                //discard all chats, load them on click
                                setChatIndex(-1);
                                setChats(oldChats=>{
                                    let newChats = [...oldChats];
                                    newChats.forEach(chat=>{
                                        chat.msg = [];
                                        chat.lastMessagesAreFetched = false;
                                    });
                                    return newChats;
                                })
                            })
                        .catch(err=>console.log(err));
                   }}
                );
        hubConnect.on('sendDirectMessage', (userId,chatId,messageText)=>{
            //can't move the insides of to a different method -> it crashes

            let decrypted =  CryptoJS.AES.decrypt(messageText,
                CryptoJS.enc.Base64.parse(AESKEY),
                {iv:CryptoJS.enc.Base64.parse(AESIV) });

            messageText = CryptoJS.enc.Utf8.stringify(decrypted);

            // need to use this hack again :((
            let l_user;
            setUser(prev=>{
                l_user = prev;
                return prev;});
            const {sound,newMessageReceived} = l_user.notificationSettings;
            setChats(prevState => {
                // index where the chat is located for current client
                const neededChatIndex = FindChatIndexByChatId(chatId,prevState);
                // update state if the user has chat with this id
                if(neededChatIndex !== -1 && l_user.userId !== userId){
                    let updatedChats = Object.assign([],prevState);
                    updatedChats[neededChatIndex].msg.push(new MessageIF({id:1,message:messageText}));
                    updatedChats[neededChatIndex].isOnline = true;

                    if (newMessageReceived) PopupNotification(<NewMessage sound={sound} name={ updatedChats[neededChatIndex].name} body={messageText}/>,'info',5000);

                    const neededChat = updatedChats[neededChatIndex];
                    updatedChats.splice(neededChatIndex, 1);
                    updatedChats.unshift(neededChat);
                    let id;
                    setChatId(prev=>{
                        id = prev;
                        return prev;
                    });
                    setChatIndex(()=>{
                        const currentChatIndex = FindChatIndexByChatId(id,updatedChats);
                        return currentChatIndex;
                    });
                    return updatedChats;
                }
                else{
                    return prevState;
                }
            })
        });

        //check if user who came online is not you -> update state
        hubConnect.on('UserWentOfflineOrOnline',(online,userId,chatIds)=> {
            setChats(chats=>{
                let updatedChats = Object.assign([],chats);
                if(userId !== loc_user.userId){
                    const checkMatch = CheckIfChatIdMatchIsPresent(chats,chatIds);
                    if(checkMatch.found){
                        let index = FindChatIndexByChatId(checkMatch.id,chats);
                        //put user online/offline depending on that invoke parameter
                        updatedChats[index].isOnline = online;
                    }
                }
                return updatedChats;
            })
        });

        hubConnect.on('UserDataChanged',(userId,userChatIds,type,value)=>{
           if(loc_user.userId !== userId){
               setChats(chats=> {
                   let updatedChats = [...chats];
                   const checkMatch = CheckIfChatIdMatchIsPresent(chats, userChatIds);
                   if (checkMatch.found) {
                       let index = FindChatIndexByChatId(checkMatch.id, chats);
                       const neededChat = updatedChats[index];
                       neededChat[type] = value;
                   }
               return updatedChats;
               });
           }
        });
        //when getCHat is received add an empty chat
        hubConnect.on('getChat', (userId,chat)=>{
            let l_user;
            setUser(prev=>{
                l_user = prev;
                return prev;});

            if(loc_user.userId === userId){
                setChats(prev=>{
                    let updatedChat = Object.assign([],prev);
                    updatedChat.push({id:chat.chatId,image:chat.image,isOnline:true,name:chat.chatName,msg:[]});
                    return Object.assign([],updatedChat);
                });
            const {sound,newChatReceived} = l_user.notificationSettings;
            if(newChatReceived) PopupNotification(<NewChat name={chat.chatName} sound={sound}/>,'info',5000);
        }});
    }
    // if user logged in but didnt connect to webSocket after
    catch (err) {
        console.log(err);
        PopupNotification(<OnlineOrOffline online={false}/>, 'warning', 3000);
        Reconnect(0,hubConnect,setHub,PopupNotification,loc_user.notificationSettings);
    }
    return hubConnect;
}
// function that tries to connect to socket every x,2x,3x,4x seconds after which it stops
async function Reconnect (time,hubConnect,setHub,PopupNotification,userNotificationSettings) {
    let timeout = 3000;
    const {sound,connectionChanged} = userNotificationSettings;
    setTimeout(()=>{
        hubConnect.start()
            .then(()=>{
                setHub(hubConnect);
                if(connectionChanged) PopupNotification(<OnlineOrOffline online = {true} sound={sound}/>,'success',4000);
                return new Promise((resolve,reject) => resolve(true));
            })
            .catch(()=>{
                if(time < 4) {
                    if(connectionChanged) PopupNotification(<ReconnectFail sound={sound} nextTime={timeout * (time+1) / 1000} isLast={false}/>,'warning',timeout * (time+1));
                    Reconnect(time+1,hubConnect,setHub,PopupNotification,userNotificationSettings);
                }
                else {
                    PopupNotification(<ReconnectFail isLast={true}/>,'error',70000);
                    return false;
                }
            });
    },timeout * time);
}




