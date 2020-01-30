import {HubConnectionBuilder} from "@aspnet/signalr";
import {Message} from "react-chat-ui";
import {FindChatIndexByChatId} from "./ProcessData";
import {BackendLink} from "../Constants/Const";
import {SetUserOffline} from "./ApiFetcher";
import NewChat from "../Components/Notifications/NewChat";
import OnlineOrOffline from "../Components/Notifications/OnlineOrOffline";
import React from "react";
import ReconnectionFailed from "../Components/Notifications/ReconnectionFailed";

//very very hacky
export async function createHubConnection (setUser,updateChats,setHub,PopupNotification) {
    // Build new Hub Connection, url is currently hard coded.
    const hubConnect = new HubConnectionBuilder()
        .withUrl(`${BackendLink}/chat`)
        .build();
    try {
        await hubConnect.start();
        console.log('Connection successful!');
        // my fav hack
        let loc_user;
        setUser(prev=>{
            loc_user = prev;
            return prev;
        });
        //show others u went online
        await hubConnect.invoke('UserWentOfflineOrOnline',true,loc_user.userId);
        PopupNotification(<OnlineOrOffline online = {true}/>,'success',3000);

        //after socket dies, it sends a request to put user offline in the db
        hubConnect.onclose(() => {
            SetUserOffline(loc_user.userId);
            // need to use this hack again :((
            let l_user;
            setUser(prev=>{
                l_user = prev;
                return prev;});
            // if user still exists -> show notification that he is offline else he logged out and try to reconnect
            //TODO load messages if any were missed
                if (l_user) {
                    PopupNotification(<OnlineOrOffline online={false}/>, 'warning', 3000);
                    Reconnect(1,hubConnect,setHub,PopupNotification);
                }}
                );

        //check if user who came online is not you -> update state
        hubConnect.on('UserWentOfflineOrOnline',(online,userId,chatIds)=> {
            updateChats(prev=>{
                let updatedChat = Object.assign([],prev);
                if(userId !== loc_user.userId){
                    // nested loop to check if any chat id matches
                    prev.forEach(chat=>{
                        chatIds.forEach(chatid=>{
                            if(chat.id === chatid){
                                let index = FindChatIndexByChatId(chat.id,prev);
                                //put user online/offline depending on that invoke parameter
                                updatedChat[index].isOnline = online;
                                return updatedChat;
                            }
                        })
                        }
                    )}
                return updatedChat;
            })
        });

        //when getCHat is received, if you are needed user, add an empty chat
        //TODO add some notification for a receiver
        hubConnect.on('getChat', (userId,chat)=>{
            if(loc_user.userId === userId){
                updateChats(prev=>{
                    let updatedChat = Object.assign([],prev);
                    updatedChat.push({id:chat.chatId,isOnline:true,name:chat.chatName,msg:[]});
                    return Object.assign([],updatedChat);
                });
                PopupNotification(<NewChat name={chat.chatName}/>,'info',5000);
            }
        });

        hubConnect.on('sendToAll', (userId,chatId,messageText)=>{
            //can't move the insides of to a different method -> it crashes
            updateChats(prevState => {
                // index where the chat is located for current client
                const neededChatIndex = FindChatIndexByChatId(chatId,prevState);
                // update state if the user has chat with this id and didnt send the message himself
                if(neededChatIndex !== -1 && loc_user.userId !== userId){
                    let updatedChats = Object.assign([],prevState);
                    updatedChats[neededChatIndex].msg.push(new Message({id:1,message:messageText}));
                    return updatedChats;
                }
                else{
                    return prevState;
                }
            })
        });
    }
    // if user logged in but didnt connect to webSocket after
    catch (err) {
        PopupNotification(<OnlineOrOffline online={false}/>, 'warning', 3000);
        Reconnect(1,hubConnect,setHub,PopupNotification);
    }
    return hubConnect;
}
// function that tries to connect to socket every x,2x,3x,4x seconds after which it stops
function Reconnect (time,hubConnect,setHub,PopupNotification) {
    let timeout = 3000;
    setTimeout(()=>{
        hubConnect.start()
            .then(res=>{
                setHub(hubConnect);
                PopupNotification(<OnlineOrOffline online = {true}/>,'success',4000);
            })
            .catch(err=>{
                if(time < 4) {
                    PopupNotification(<ReconnectionFailed nextTime={timeout * (time+1) / 1000} isLast={false}/>,'warning',timeout * (time+1));
                    Reconnect(time+1,hubConnect,setHub,PopupNotification);
                }
                else PopupNotification(<ReconnectionFailed isLast={true}/>,'error',70000);
            });
    },timeout * time);
}



