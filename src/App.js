import React, {useEffect, useState} from 'react';
import MainAppWindow from "./Components/MainAppWindow/MainAppWindow";
import { HashRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import './App.css';
import WelcomePage from "./Components/Welcome/WelcomePage";
import {Message} from "react-chat-ui";
import {GetAllChatsByUserId, SetUserOffline, TryLoginOrRegister} from "./Helpers/ApiFetcher";
import {ProcessChats} from "./Helpers/ProcessData";
import {ToastProvider} from "react-toast-notifications";
import {gapi} from "gapi-script";
import {ROUTES} from "./Constants/Const";
import {ValidateToken} from "./Helpers/TokenValidation";
import {useCookies} from "react-cookie";

export const UserChatsContext = React.createContext({user:{},chats:[],isLoading:false});

function App() {

    const[user,setUser] = useState(null);
    const [chats,setChats] = useState([]);
    const[hubConnection,setHubConnection] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['userToken']);
    const[isLoading,setIsLoading] = useState(false);
    const[isLoggedIn,setLoggedIn] = useState(false);

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
        catch(err){ alert('error loading chats') }
    }

    const CreateNewChat = (chatId,chatName,friendImageUrl) => {
        hubConnection.invoke('ChatWithUserWasCreated',user.userId,chatId,{chatId,chatName:user.userName,image:user.imageUrl});
        setChats(prevState => {
            let updatedChat = Object.assign([],prevState);
            updatedChat.push({id:chatId,image:friendImageUrl,name:chatName,msg:[]});
            return updatedChat;
        })
    };

    useEffect(()=>{
        const token = cookies.userToken;
        ValidateAndSetUser(token)
            .then((user)=> {
                setUser(user);
                setLoggedIn(true)
            })
            .catch(()=>console.log('No cookie :('));
    },[]);

    async function ValidateAndSetUser(token){
        try {
            let user = ValidateToken(token);
            user.notificationSettings = JSON.parse(user.notificationSettings);
            user.isOnline = user.isOnline === 'true';
            user.userId = parseInt(user.userId);
            if(user.isOnline){
                //TODO make proper two device logic
                //return 'duplicate';
            }
            setUser(user);
            setIsLoading(true);
            await GetChats(user.userId);
            setIsLoading(false);

            return user;
        }
        catch (e) {throw e;}
    }
    //Function that tries to log in or register based on parameter
    //if successful, starts socket communication and invokes GetChats method defined above
    async function loginOrRegister (loginData,endpoint){
        try {
            let result = await TryLoginOrRegister(loginData,endpoint);
            if (result) {
                // in case of registration
                if(result.text) return result.text;
                //expires in one day
                setCookie('userToken',result.userToken,{maxAge:86400});
                await ValidateAndSetUser(result.userToken);
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
        notifyAboutLogout();
        setHubConnection(null);
        TryToDoGoogleLogout();
        removeCookie('userToken');
    };

    //when tab closes
    window.addEventListener("beforeunload", function (e) {
        SetUserOffline(user.userId);
        notifyAboutLogout();
    });

    const notifyAboutLogout = () =>{
        hubConnection.invoke('UserWentOfflineOrOnline',false,user.userId)
            .then(()=>hubConnection.stop())
            .catch(err=>console.log(err));
    };

    const TryToDoGoogleLogout= () => {
        try{
            const auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(auth2.disconnect());
        }
        catch (e) {console.log('Not a googler!')};

    };

    return (
        <ToastProvider>
            <Router className = {'rocket'}>
                <Switch>
                        <Route path="/app">
                            <UserChatsContext.Provider value={{user,chats,isLoading}}>
                                <MainAppWindow setHubConnection={setHubConnection} setUser={setUser} setChats={setChats} SendMessage={SendMessage} logout={logout} createNewChat = {CreateNewChat}/>
                             </UserChatsContext.Provider>
                        </Route>
                        {
                            ROUTES.map(route => (
                                <Route path={route} key={route}>
                                    <UserChatsContext.Provider value={{user,chats,isLoading}}>
                                         <WelcomePage path={route}/>
                                    </UserChatsContext.Provider>
                                </Route>
                            ))
                        }
                        <Route path={'/register'}>
                            <UserChatsContext.Provider value={{user,chats,isLoading}}>
                                 <WelcomePage path={'/register'}  loginOrRegister={loginOrRegister}/>
                            </UserChatsContext.Provider>
                        </Route>
                        <Route>
                            <UserChatsContext.Provider value={{user,chats,isLoading}}>
                                <WelcomePage path={'/login'}  loginOrRegister={loginOrRegister}/>
                            </UserChatsContext.Provider>
                        </Route>
                </Switch>
                {isLoggedIn
                    ?<Redirect to={'/app'}/>
                    :<div/>
                }
            </Router>
        </ToastProvider>
        );
}
export default App;