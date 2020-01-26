import {HubConnectionBuilder} from "@aspnet/signalr";
import {Message} from "react-chat-ui";
import {FindChatIndexByChatId} from "./ProcessData";
import {BackendLink} from "../Constants/Const";
import {SetUserOffline} from "./ApiFetcher";

//very very hacky
export  async function createHubConnection (setUser,updateChats,setNotification) {
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


        //after socket dies, it sends a request to put user offline in the db
        hubConnect.onclose(() => {
            console.log('I lef');
            SetUserOffline(loc_user.userId);
        });

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
                setNotification({notificationHeader: 'New Chat',notificationBody: `${chat.chatName} created a chat with you!`})
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
    catch (err) {
        alert(err);
    }
    return hubConnect;
}



