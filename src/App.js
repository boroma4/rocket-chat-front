import React,{useState} from 'react';
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
    const [feed,updateFeed] = useState([{id:2,name:'John',msg:[new Message({id:0,message:'lol'}),new Message({id:1,message:'lol!',senderName:'John'})]},
        {id:3,name:'Donn',msg:[new Message({id:0,message:'lol'}),new Message({id:1,message:'KEK!',senderName:'Donn'})]}]);

    const GetMessage = (chat,msgText) => {
        updateFeed(prevState => {
            let updatedChat = Object.assign([],prevState[chat]);
            updatedChat.msg.push(new Message({id:1,message:msgText}));
            return Object.assign([],prevState,updatedChat);
        })
    };

    const loginOrRegister = (loginData,endpoint) => {
        let status;
        fetch(`https://localhost:5001/api/${endpoint}`,{
            method:'post',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify(loginData)
        })
            .then(res =>res.json())
            .then(res=> {
                console.log(res[0]);
                if(res){
                    setUser(res[0]);
                    setHubConnection(HubConnection(GetMessage));
                    status = 'resolve';
                }
            })
            .catch(err=> {
                console.log(err);
                status = 'reject';
            });
        return new Promise((res,rej)=>{
            status === 'resolve'? res(status):rej(status);
        })
    };

    const SendMessage = (chat) => {
        let l_chat = chat;
        //invoke 'sendMessage' with chatId most likely
        return function (msgText) {
            updateFeed(prevState => {
            let updatedChat = Object.assign([],prevState[l_chat]);
            updatedChat.msg.push(new Message({id:0,message:msgText}));
            return Object.assign([],prevState,updatedChat);
        })};
    };

    const logout = () => {
        setUser(null);
        setUser(null);
        setHubConnection(null);
    };

    return (
        <Router className = {'rocket'}>
            <Switch>
                <Route path="/app">
                    <ChatMain feed={feed} SendMessage={SendMessage} logout={()=>logout()} user={user}/>
                </Route>
                <Route path="/register">
                    <WelcomePage path={'/register'} loginOrRegister={loginOrRegister}/>
                </Route>
                <Route>
                    <WelcomePage  path={'/login'} loginOrRegister={loginOrRegister}/>
                </Route>
            </Switch>
        </Router>

        );
}
export default App;