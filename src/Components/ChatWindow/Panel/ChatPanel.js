import React, {useContext, useEffect, useState} from 'react';
import {ScrollChatToBottom} from "../../../Helpers/Scroller";
import {CheckForInvite} from "../../../Helpers/ProcessData";
import {MainChatWindowContext} from "../../MainChatAppWindow/MainChatAppWindow";
import {Paper} from "@material-ui/core";
import TicTacToeGame from "../../Games/TicTacToe/TicTacToeGame";
import Button from "react-bootstrap/Button";


function ChatPanel({chatData,setChats}) {

    const {chatIndex} = useContext(MainChatWindowContext);

    const acceptGame = (message,indexToRemove)=> {
        const gameName = CheckForInvite(message.message).gameName;
        //delete invitation message
        setChats(oldchats => {
            let newChats = [...oldchats];
            // if there is currently no game
            if(!newChats[chatIndex].game){
                newChats[chatIndex].msg.splice(indexToRemove, 1);
                newChats[chatIndex].game = gameName;
            }
            return newChats;
        })
    };
    const finishGame = ()=>{
        setChats(oldchats => {
            let newChats = [...oldchats];
            newChats[chatIndex].game = '';
            return newChats;
        })
    };
    useEffect(()=>{
        ScrollChatToBottom();
        },[]);

    return (
        <div className='overflow-hidden flex flex-column'>
            {chatData.game ?
                <Paper className={'game-window pa3 shadow-5'} >
                    <h3>{chatData.game}</h3>
                    <div>
                        {
                            {
                                'Tic-Tac-Toe': <TicTacToeGame/>,
                            }[chatData.game.trim()]
                        }
                    </div>
                    <Button className={'tc'} variant={'danger'} onClick={()=>finishGame()}>SURRENDER</Button>
                </Paper>
                :<div/>
            }
            <ul className={'chat-panel'}>
                {
                    chatData.msg.map((message,i)=>(
                    <li key ={i} className= {message.id === 0 ? 'me' : 'him' }>
                        <div className={'messsage-text'}>
                            {CheckForInvite(message.message).text}
                            <span className='underline pointer blue' onClick={()=>acceptGame(message,i)}>{CheckForInvite(message.message).gameName}</span>
                         </div>
                    </li>
                ))
            }
            </ul>
        </div>
    );


}
export default ChatPanel;