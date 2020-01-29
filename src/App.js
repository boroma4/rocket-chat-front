import React, {useState} from 'react';
import MainAppWindow from "./Components/MainAppWindow/MainAppWindow";
import {
    HashRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import './App.css';
import WelcomePage from "./Components/Welcome/WelcomePage";
import {createHubConnection} from "./Helper/HubConnection";
import {Message} from "react-chat-ui";
import {GetAllChatsByUserId, SetUserOffline, TryLoginOrRegister} from "./Helper/ApiFetcher";
import {ProcessChats} from "./Helper/ProcessData";
import {useToasts} from 'react-toast-notifications'


export const UserChatsContext = React.createContext({user:{},chats:[]});

function App() {

    const[user,setUser] = useState(null);
    const[hubConnection,setHubConnection] = useState(null);
    const { addToast } = useToasts();


    //CHATS STATE USED TO BE LIKE DIS
    // {id:100,name:'John',msg:[new Message({id:0,message:'lol'}),new Message({id:1,message:'lol!',senderName:'John'})]},
    //         {id:99,name:'Donn',msg:[new Message({id:0,message:'lol'}),new Message({id:1,message:'KEK!',senderName:'Donn'})]}
    const [chats,setChats] = useState([]);

    //A delegate(eto function pls) to return the total number of chats user has.
    // Chats are dispayed on the left, determine <Friend> elements.
    /**********IN DEVELOPMENT***********/

    //TODO refactor this component to creased the amount of lines(maybe)

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

    const PopUpNotification = (content,appearance) =>{
        addToast(content, {
            appearance: appearance,
            autoDismiss: true,
        });
    };

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
        let hub = await createHubConnection(setUser,setChats,PopUpNotification);
         setHubConnection(hub);
    };

    //Function that uses a closure(google it)
    //after determining chat data, renders a new message + sends it to the server on the next invoke
    const SendMessage = (chatId,chatIndex) => {
        let l_chatIndex = chatIndex;
        let l_chatId= chatId;
        //invoke 'sendMessage' with chatId most likely
        return function (msgText) {
            hubConnection.invoke('SendDirectMessage',user.userId,l_chatId,msgText).catch(err=>console.log(err));
            setChats(prevState => {
                let updatedChat = Object.assign([],prevState[l_chatIndex]);
                updatedChat.msg.push(new Message({id:0,message:msgText}));
                return Object.assign([],prevState,updatedChat);
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
                                <MainAppWindow setChats={setChats} SendMessage={SendMessage} logout={()=>logout()} createNewChat = {CreateNewChat}/>
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