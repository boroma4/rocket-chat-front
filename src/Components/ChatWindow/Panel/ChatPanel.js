import React, {useContext, useEffect, useState} from 'react';
import {ScrollChatToBottom} from "../../../Helpers/Scroller";
import {CheckForInvite} from "../../../Helpers/ProcessData";
import {MainChatWindowContext} from "../../MainChatAppWindow/MainChatAppWindow";
import {Paper} from "@material-ui/core";
import TicTacToeGame from "../../Games/TicTacToe/TicTacToeGame";
import Button from "react-bootstrap/Button";
import {GAMEACTIONS,GAMES} from "../../Games/GamesList";
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import {useToasts} from "react-toast-notifications";



function ChatPanel({InGameAction,chatData,setChats}) {

    const {chatIndex} = useContext(MainChatWindowContext);
    const { width, height } = useWindowSize();
    const[showConfetti,setShowConfetti] = useState(false);
    const {addToast } = useToasts();


    const acceptGame = (message,indexToRemove)=> {
        const gameName = CheckForInvite(message.message).gameName.trim();
        //delete invitation message
        if(!chatData.game.name){
            setChats(oldchats => {
                let newChats = [...oldchats];
                newChats[chatIndex].msg.splice(indexToRemove, 1);
                let game = newChats[chatIndex].game;
                game.name = gameName;
                switch(gameName){
                    case GAMES[0].name:
                        game.board =  [  ['', '', ''], ['', '', ''], ['', '', '']];
                        game.currentPlayer = 'X';
                        game.myMark = 'O';
                        break;
                    default:
                        break;
                }
                game.winner = '';
                InGameAction(GAMEACTIONS[0],game);
                return newChats;
            });
        }
        else addToast('Close your current game!', {appearance: 'warning', autoDismiss: true});
    };
    const finishGame = (surrender)=>{
        if(surrender) InGameAction(GAMEACTIONS[1],{surrender});
        setChats(oldchats => {
            let newChats = [...oldchats];
            newChats[chatIndex].game = {};
            return newChats;
        })
    };
    useEffect(()=>{
        ScrollChatToBottom();
        },[]);
    
    useEffect(()=>{
        // different condition will be applied based on chatData.game
        if(chatData.game.winner && chatData.game.winner !== '-1'){
            if(chatData.game.currentPlayer === chatData.game.myMark) {
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 5000);
            }
        }
    },[chatData.game,chatData.game.winner]);
    
    return (
        <div className='overflow-hidden flex flex-column'>
            {chatData.game.name ?
                <Paper className={'game-window pa2 shadow-5 animated  fadeIn slow '} >
                    <h3>{chatData.game.name}</h3>
                    {showConfetti ?<Confetti width={width} height={height}/> :<div/>}
                    <div >
                        {
                            {
                                'Tic-Tac-Toe': <TicTacToeGame setChats={setChats} inGameAction={InGameAction}/>,
                            }[chatData.game.name.trim()]
                        }
                    </div>
                    {
                        chatData.game.winner
                            ?<Button className={'tc'} variant={'primary'} onClick={()=>finishGame(false)}>Close</Button>
                            :<Button className={'tc'} variant={'danger'} onClick={()=>finishGame(true)}>SURRENDER</Button>
                    }
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