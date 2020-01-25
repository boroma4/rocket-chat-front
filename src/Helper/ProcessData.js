import {Message} from "react-chat-ui";
import {FetchLastMessagesByChatId} from "./ApiFetcher";

export function ProcessChats (chats,userId) {
    let chatsToState = [];

    chats.forEach(chat=>{
        let msgDisplayId,chatToAdd;
        if(chat.lastMessage) {
            msgDisplayId = chat.lastMessage.userId === userId ? 0 : 1;
            chatToAdd = {id:chat.chatId,lastMessagesAreFetched:false, name: chat.friendUserName,msg:[new Message({id:msgDisplayId,message:chat.lastMessage.messageText})]};
        }
        else{
            // lastMessagesAreFetched value doesn't matter in this case,as the chat is empty and must be updated live time anyway
            chatToAdd = {id:chat.chatId,lastMessagesAreFetched:false, name: chat.friendUserName,msg:[]};
        }
        chatsToState.push(chatToAdd);
    });
    return chatsToState;
}

//loop until u find chat with ID equal to given, return index
export const FindChatIndexByChatId = (chatId,chatData) =>{
    let i = 0;
    for(let chat of chatData){
        if(chat.id === chatId) {
            return i;
        }
        i++;
    }
    return -1;
};

export const AddTenMessagesToState = async (id,user,currentChat)=>{
    try {
        let messages = await FetchLastMessagesByChatId(id, user, currentChat.msg.length);
        currentChat.msg.forEach((msg, i) => {
            messages.push(msg);
        });
        currentChat.lastMessagesAreFetched = true;
        currentChat.msg = [];
        currentChat.msg = [...messages];

        return currentChat;
    }
    catch (e) {
        throw e;
    }
};

/**
 * @return {boolean}
 */
 export function CheckLastMessagesForCertainText(messagesArray,textToFind){
     //check if there were any messages before, else no duplicate
     if(messagesArray.length > 0) {
         // if last msg is the same as the one passed to the function and was sent by current user
         const lastMessage = messagesArray[messagesArray.length - 1].message;

         if (lastMessage === textToFind && lastMessage.id === 0) {
             //if there is more than 1 message, check one before,else there is no duplicate
             if (messagesArray.length > 1) {
                 const preLastMessage = messagesArray[messagesArray.length - 2].message;
                 //if the user is spamming the same message, dont count duplicate
                 return lastMessage !== preLastMessage;
             }
             else {
                 return true;
             }
         }
     }
    return false;
}