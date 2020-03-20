import React, {useEffect, useState} from 'react';
import MainChatAppWindow from "./Components/MainChatAppWindow/MainChatAppWindow";
import { HashRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import './App.css';
import WelcomePage from "./Components/Welcome/WelcomePage";
import {GetAllChatsByUserId, TryLoginOrRegister} from "./Helpers/ApiFetcher";
import {ProcessChats} from "./Helpers/ProcessData";
import {ToastProvider} from "react-toast-notifications";
import {ROUTES} from "./Constants/Const";
import {ValidateToken} from "./Helpers/TokenValidation";
import {useCookies} from "react-cookie"

export const UserChatsContext = React.createContext({user:{},chats:[],isLoading:false});

function App() {

    const[user,setUser] = useState(null);
    const [chats,setChats] = useState([]);
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

    return (
        <ToastProvider>
            <Router className = {'rocket'}>
                <Switch>
                        <Route path="/app">
                            <UserChatsContext.Provider value={{user,chats,isLoading}}>
                                <MainChatAppWindow setUser={setUser} setChats={setChats}/>
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