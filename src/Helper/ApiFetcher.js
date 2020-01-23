import {Message} from "react-chat-ui";
import {BackendLink} from "../Constants/Const";

export async function GetAllChatsByUserId(userId) {
    try {
        let chats = await fetch(`${BackendLink}/api/getallchats?userId=${userId}`);
        chats = await chats.json();
        return chats;
    } catch (e) {
        throw e;
    }
}

//Sends a request to the server and returns an array of messages received from there
export async function FetchLastMessagesByChatId(chatId,user,totalMessages) {
    let messagesToState = [];
    try {
        let messages = await fetch(`${BackendLink}/api/getlastmessages?chatId=${chatId}&totalMessagesLoaded=${totalMessages}`);
        messages = await messages.json();
        await messages.forEach(message =>{
            let msgDisplayId = message.userId === user.userId ? 0 : 1;
            messagesToState.push(new Message({id:msgDisplayId,message:message.messageText}));
        });
        return messagesToState;
    }
    catch (error) {
        throw error;
    }
}

export async function TryLoginOrRegister (loginData,endpoint) {
    try {
        console.log(`${BackendLink}/api/${endpoint}`);
        let result = await fetch(`${BackendLink}/api/${endpoint}`, {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(loginData)
        });
        result = await result.json();
        return result;
    } catch (e) {
        throw e;
    }
}