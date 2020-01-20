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
                endpoint === 'login'? setUser(result[0]): setUser(result);
                setHubConnection(HubConnection(GetMessage));
            }
            return 'ok';
        }
        catch(err) {
            console.log(err);
            throw err;
        }
    }

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
                    <WelcomePage path={'/login'} loginOrRegister={loginOrRegister}/>
                </Route>
            </Switch>
        </Router>
        );
}
export default App;