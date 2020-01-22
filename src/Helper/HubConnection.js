import {HubConnectionBuilder} from "@aspnet/signalr";
import {Message} from "react-chat-ui";

//very very hacky
export  async function createHubConnection (setUser,updateChats) {
    // Build new Hub Connection, url is currently hard coded.
    const hubConnect = new HubConnectionBuilder()
        .withUrl('https://localhost:5001/chat')
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

        hubConnect.on('sendToAll', (userId,chatId,messageText)=>{
            //can't move the insides of to a different method -> it crashes
            updateChats(prevState => {
                // index where the chat is located for current client
                const neededChatIndex = FindChatIndexByChatId(chatId,prevState);
                // update state if the user has chat with this id and didnt send the message himself
                if(neededChatIndex !== -1 && loc_user.userId != userId){
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


//loop until u find chat with ID equal to given, return index
const FindChatIndexByChatId = (chatId,chatData) =>{
    let i = 0;
    for(let chat of chatData){
        if(chat.id === chatId) {
            return i;
        }
        i++;
    }
    return -1;
};
