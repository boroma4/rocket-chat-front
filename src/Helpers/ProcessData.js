import {FetchLastMessagesByChatId} from "./ApiFetcher";
import {MessageIF} from "../Components/ChatWindow/Message/MessageIF";

export function ProcessChats (chats,userId) {
    let chatsToState = [];

    chats.forEach(chat=>{
        let msgDisplayId,chatToAdd;
        if(chat.lastMessage) {
            msgDisplayId = chat.lastMessage.userId === userId ? 0 : 1;
            const message = chat.lastMessage;
            chatToAdd = {id:chat.chatId,image:chat.friendImageUrl,isOnline:chat.isOnline,lastMessagesAreFetched:false, name: chat.friendUserName,msg:[new MessageIF({id:msgDisplayId,message:message.messageText,dateTime:message.createdDate})]};
        }
        else{
            // lastMessagesAreFetched value doesn't matter in this case,as the chat is empty and must be updated live time anyway
            chatToAdd = {id:chat.chatId,image:chat.friendImageUrl,isOnline:chat.isOnline,lastMessagesAreFetched:false, name: chat.friendUserName,msg:[]};
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
        currentChat.msg.forEach((msg) => {
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

// O(n) function to find a match in 2 arrays
export const CheckIfChatIdMatchIsPresent = (chatList,chatIdList) =>{
    let cache = {};
    let output = {found:false};
    chatList.forEach(chat=>{
            const id = chat.id;
            //value doesnt matter here
            cache[id] = 1;
        }
    );
    for(let chatId of chatIdList){
        if(chatId in cache){
            output.found = true;
            output.id = chatId;
            break;
        }
    }
    return output;
};