import React, {useEffect, useState} from 'react';
import ChatMain from "./ChatMain";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import './App.css';
import WelcomePage from "./Components/Welcome/WelcomePage";
import {createHubConnection} from "./Helper/HubConnection";
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
             console.log(chats);
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
             updateChats(chatsToState);
            console.log('SET STATE OF CHATS',chatsToState);
            return 'ok';
        }
        catch(err){
            console.log(err);
            alert('error loading chats')
        }
    }

    //Sends a request to the server and returns an array of messages received from there
    async function fetchLastMessages(chatId) {
        let messagesToState = [];
        try {
            let messages = await fetch(`https://localhost:5001/api/getlastmessages?chatId=${chatId}`);
            messages = await messages.json();
            await console.log(messages);
            await messages.forEach(message =>{
                let msgDisplayId = message.userId === user.userId ? 0 : 1;
                messagesToState.push(new Message({id:msgDisplayId,message:message.messageText}));
            });
            console.log(messagesToState);
            return messagesToState;
        }
        catch (error) {
            console.log(error);
            alert('error loading messages');
            throw error;
        }
    }

    const CreateNewChat = (chatId,chatName) => {
        updateChats(prevState => {
            let updatedChat = Object.assign([],prevState);
            updatedChat.push({id:chatId,name:chatName,msg:[]});
            return Object.assign([],updatedChat);
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
            if (result) {
                 endpoint === 'login'? setUser(result[0]): setUser(result);
                //might need to be outside of current try/catch to separate from login error
                await GetChats(endpoint === 'login'?result[0].userId : result.userId);
                await ConnectAndSetHubToState();
            }
            return 'ok';
        }
        catch(err) {
            console.log(err);
            throw err;
        }
    }

    const ConnectAndSetHubToState = async () =>{
        let hub = await createHubConnection(setUser,updateChats);
        await setHubConnection(hub);
    };

    //Function that uses a closure(google it)
    //after determining chat data, renders a new message + sends it to the server on the next invoke
    const SendMessage = (chatId,chatIndex) => {
        let l_chatIndex = chatIndex;
        let l_chatId= chatId;
        //invoke 'sendMessage' with chatId most likely
        return function (msgText) {
            updateChats(prevState => {
            let updatedChat = Object.assign([],prevState[l_chatIndex]);
            hubConnection.invoke('SendDirectMessage',user.userId,l_chatId,msgText).catch(err=>console.log(err));
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
                    <ChatMain setChats={updateChats} chats={chats} SendMessage={SendMessage} logout={()=>logout()} user={user} createNewChat = {CreateNewChat} fetchLastMessages={fetchLastMessages}/>
                </Route>
                <Route path="/register">
                    <WelcomePage path={'/register'}  loginOrRegister={loginOrRegister}/>
                </Route>
                <Route>
                    <WelcomePage path={'/login'}  loginOrRegister={loginOrRegister}/>
                </Route>
            </Switch>
        </Router>
        );
}
export default App;