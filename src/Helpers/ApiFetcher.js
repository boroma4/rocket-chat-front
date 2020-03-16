import {MessageIF} from "../Components/ChatWindow/Message/MessageIF";
import {BackendLink, TokenSignature} from "../Constants/Const";
import jwt from'jsonwebtoken';

export async function GetAllChatsByUserId(userId) {
    try {
        let token = jwt.sign({userId}, TokenSignature);
        let chats = await fetch(`${BackendLink}/api/getallchats`, {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({token})
        });
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
        let token = jwt.sign({chatId,totalMessages}, TokenSignature);
        let messages = await fetch(`${BackendLink}/api/getlastmessages`, {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({token})
        });
        messages = await messages.json();
        await messages.forEach(message =>{
            let msgDisplayId = message.userId === user.userId ? 0 : 1;
            messagesToState.push(new MessageIF({id:msgDisplayId,message:message.messageText,dateTime:message.createdDate}));
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
        return result;
    } catch (e) {
        throw e;
    }
}

export async function SendNewChatData (userId,emailToAdd) {
    try {
        let token = jwt.sign({userId,emailToAdd}, TokenSignature);
        let res = await fetch(`${BackendLink}/api/addchat`, {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({token})
        });

        let status = res.status;
        res = await res.json();
        CheckForResponseCodeAndThrow(status,res.text);
        return res;

    } catch (e) {
        throw e;
    }
}
export async function UpdateNotificationSettings (userId,sound,newchat,newmessage,connection) {
    try {
        let token = jwt.sign({userId,sound,newchat,newmessage,connection}, TokenSignature);
        let res = await fetch(`${BackendLink}/api/settingsapply`, {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({token})
        });
        let status = res.status;
        CheckForResponseCodeAndThrow(status,res.text);
        return 'ok';

    } catch (e) {
        throw e;
    }
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