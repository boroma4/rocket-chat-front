import React, {useEffect, useState} from 'react';
import ChatMain from "./ChatMain";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import './App.css';
import WelcomePage from "./Components/Welcome/WelcomePage";
import HubConnection from "./Helper/HubConnection";
import {Message} from "react-chat-ui";


function App() {

    const[user,setUser] = useState(null);
    const[hubConnection,setHubConnection] = useState(null);

    //CHATS STATE USED TO BE LIKE DIS
    // {id:100,name:'John',msg:[new Message({id:0,message:'lol'}),new Message({id:1,message:'lol!',senderName:'John'})]},
    //         {id:99,name:'Donn',msg:[new Message({id:0,message:'lol'}),new Message({id:1,message:'KEK!',senderName:'Donn'})]}
    const [chats,updateChats] = useState([]);

    //A delegate(eto function pls) to return the total number of chats user has.
    // Chats are dispayed on the left, determine <Friend> elements.
    /**********IN DEVELOPMENT***********/

    //TODO refactor this component to creased the amount of lines(maybe)

    // A function to load chats with last message, to be used on login
    //Determines what is going to be displayed on the left side of main chat window
    // Check every chat data received from the backed and renders accordingly

    //TODO pass Name from the backend as well
    async function GetChats(userId)  {
        let chatsToState = [];
        try {
            let chats = await fetch(`https://localhost:5001/api/getallchats?userId=${userId}`);
            chats = await chats.json();
            await console.log(chats);
            await chats.forEach(chat=>{
                let msgDisplayId,chatToAdd;

                if(chat.lastMessage) {
                    msgDisplayId = chat.lastMessage.userId === userId ? 0 : 1;
                     chatToAdd = {id:chat.chatId, name: 'hardcode',msg:[new Message({id:msgDisplayId,message:chat.lastMessage.messageText})]};
                }
                else{
                    chatToAdd = {id:chat.chatId, name: 'hardcode',msg:[]};
                }
                chatsToState.push(chatToAdd);
                console.log(chatsToState);
            });
            await updateChats(chatsToState);
            return 'ok';
        }
        catch(err){
            console.log(err);
            alert('error loading chats')
        }
    }

    async function fetchLastMessages(chatId) {
        let chatsToState = [];
        try {
            let messages = await fetch(`https://localhost:5001/api/getlastmessages?chatId=${chatId}`);
            await console.log(messages);
        }
        catch (error) {

        }
    }

    const CreateNewChat = (chatId,chatName) => {
        updateChats(prevState => {
            let updatedChat = Object.assign([],prevState);
            updatedChat.push({id:chatId,name:chatName,msg:[]});
            return Object.assign([],updatedChat);
        })
    };

    //Function (not finished) that is going to be invoked when signalR server sends a message
    const GetMessage = (chat,msgText) => {
        updateChats(prevState => {
            let updatedChat = Object.assign([],prevState[chat]);
            updatedChat.msg.push(new Message({id:1,message:msgText}));
            return Object.assign([],prevState,updatedChat);
        })
    };

    //Function that tries to log in or register based on parameter
    //if successful, starts socket communication and invokes GetChats method defined above
    async function loginOrRegister (loginData,endpoint){
        try {
            let result = await fetch(`https://localhost:5001/api/${endpoint}`, {
                method: 'post',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(loginData)
            });
            result = await result.json();
            console.log(result);
            if (result) {
                await endpoint === 'login'? setUser(result[0]): setUser(result);
                await setHubConnection(HubConnection(GetMessage));

                //might need to be outside of current try/catch to separate from login error
                await GetChats(endpoint === 'login'?result[0].userId : result.userId);
            }
            return 'ok';
        }
        catch(err) {
            console.log(err);
            throw err;
        }
    }

    //Function that uses a closure(google it)
    //after determining chat data, renders a new message + sends it to the server on the next invoke
    const SendMessage = (chatId,chatIndex) => {
        let l_chatIndex = chatIndex;
        let l_chatId= chatId;
        //invoke 'sendMessage' with chatId most likely
        return function (msgText) {
            updateChats(prevState => {
            let updatedChat = Object.assign([],prevState[l_chatIndex]);
             hubConnection.then(hubC=>{
                    hubC.invoke('SendDirectMessage',user.userId,l_chatId,msgText).catch(err=>console.log(err));
             });
            updatedChat.msg.push(new Message({id:0,message:msgText}));
            return Object.assign([],prevState,updatedChat);
        })
        };
    };

    //needed to fix a bug with logout
    const logout = () => {
        setUser(null);
        setUser(null);
        setHubConnection(null);
    };

    return (
        <Router className = {'rocket'}>
            <Switch>
                <Route path="/app">
                    <ChatMain chats={chats} SendMessage={SendMessage} logout={()=>logout()} user={user} createNewChat = {CreateNewChat} fetchLastMessages={fetchLastMessages}/>
                </Route>
                <Route path="/register">
                    <WelcomePage path={'/register'} loginOrRegister={loginOrRegister}/>
                </Route>
                <Route>
                    <WelcomePage path={'/login'} loginOrRegister={loginOrRegister}/>
                </Route>
            </Switch>
        </Router>
        );
}
export default App;