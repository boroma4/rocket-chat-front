import React, {useState} from 'react';
import MainAppWindow from "./Components/MainAppWindow/MainAppWindow";
import {
    HashRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import './App.css';
import WelcomePage from "./Components/Welcome/WelcomePage";
import {Message} from "react-chat-ui";
import {GetAllChatsByUserId, SetUserOffline, TryLoginOrRegister} from "./Helper/ApiFetcher";
import {ProcessChats} from "./Helper/ProcessData";


export const UserChatsContext = React.createContext({user:{},chats:[]});


function App() {

    const[user,setUser] = useState(null);
    const [chats,setChats] = useState([]);
    const[hubConnection,setHubConnection] = useState(null);


    /**********IN DEVELOPMENT***********/

    // A function to load chats with last message, to be used on login
    //Determines what is going to be displayed on the left side of main chat window
    // Check every chat data received from the backed and renders accordingly
    async function GetChats(userId)  {
        try {
            let chats = await GetAllChatsByUserId(userId);
            const chatsToState = ProcessChats(chats,userId);
            setChats(chatsToState);
            return 'ok';
        }
        catch(err){
            alert('error loading chats')
        }
    }



    const CreateNewChat = (chatId,chatName) => {

        hubConnection.invoke('ChatWithUserWasCreated',user.userId,chatId,{chatId,chatName:user.userName});
        setChats(prevState => {
            let updatedChat = Object.assign([],prevState);
            updatedChat.push({id:chatId,name:chatName,msg:[]});
            return Object.assign([],updatedChat);
        })
    };

    //Function that tries to log in or register based on parameter
    //if successful, starts socket communication and invokes GetChats method defined above
    async function loginOrRegister (loginData,endpoint){
        try {
            let result = await TryLoginOrRegister(loginData,endpoint);
            if (result) {
                const newUser = result;
                if(newUser.isOnline){
                    return 'duplicate';
                }
                 setUser(newUser);
                //might need to be outside of current try/catch to separate from login error
                await GetChats(newUser.userId);
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
        let l_chatId = chatId;
        //invoke 'sendMessage' with chatId most likely
        return function (msgText) {
            hubConnection.invoke('SendDirectMessage',user.userId,l_chatId,msgText).catch(err=>console.log(err));
            setChats(prevState => {
                let updatedChats = Object.assign([],prevState);
                const neededChat = updatedChats[l_chatIndex];
                neededChat.msg.push(new Message({id:0,message:msgText}));

                updatedChats.splice(l_chatIndex, 1);
                updatedChats.unshift(neededChat);
                return updatedChats;
            });
        };
    };

    const logout = () => {
        setUser(null);
        hubConnection.invoke('UserWentOfflineOrOnline',false,user.userId)
            .then(()=>hubConnection.stop())
            .catch(err=>console.log(err));
        setHubConnection(null);
    };

    //when tab closes
    window.addEventListener("beforeunload", function (e) {
        SetUserOffline(user.userId);
    });

    return (
            <Router className = {'rocket'}>
                <Switch>
                    <Route path="/app">
                        <UserChatsContext.Provider value={{user,chats}}>
                            <MainAppWindow setHubConnection={setHubConnection} setUser={setUser} setChats={setChats} SendMessage={SendMessage} logout={()=>logout()} createNewChat = {CreateNewChat}/>
                        </UserChatsContext.Provider>
                    </Route>
                    <Route path="/register">
                        <WelcomePage path={'/register'}  loginOrRegister={loginOrRegister}/>
                    </Route>
                    <Route path="/faq">
                        <WelcomePage path={'/faq'}/>
                    </Route>
                    <Route path="/release">
                        <WelcomePage path={'/release'}/>
                    </Route>
                    <Route>
                        <WelcomePage path={'/login'}  loginOrRegister={loginOrRegister}/>
                    </Route>
                </Switch>
            </Router>
        );
}
export default App;