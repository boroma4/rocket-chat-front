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
        let result = await fetch(`${BackendLink}/api/${endpoint}`, {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(loginData)
        });
        let status = result.status;
        result = await result.json();
        CheckForResponseCodeAndThrow(status,result.text);
        console.log(result);
        return result;
    } catch (e) {
        throw e;
    }
}

export async function SendNewChatData (userId,email) {
    try {
        let res = await fetch(`${BackendLink}/api/addchat?curUserId=${userId}&emailToAdd=${email}`);
        let status = res.status;
        res = await res.json();
        CheckForResponseCodeAndThrow(status,res.text);
        return res;

    } catch (e) {
        throw e;
    }
}

export function SetUserOffline(userId) {
    fetch(`${BackendLink}/api/disconnect?userId=${userId}`)
        .then(res=>{
            if(res.status === 404){
                console.log('Couldnt find a user');
            }
        });
}

function CheckForResponseCodeAndThrow(code,error){
    switch (code) {
        case 400:
            throw new Error(error);
        case 500 :
            throw new Error('Server error,try again later');
        case 404 :
            throw new Error('Server error,try again later');
        default:
            break;
    }
}