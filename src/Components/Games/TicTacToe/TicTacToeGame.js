import React, {useContext} from 'react';
import Square from "./Util/Square";
import {winnerCalc} from "./Util/WinnerCalc";
import {MainChatWindowContext} from "../../MainChatAppWindow/MainChatAppWindow";
import {UserChatsContext} from "../../../App";
import {GAMEACTIONS} from "../GamesList";
import './Util/Style.scss'

export default function TicTacToeBoard({setChats,inGameAction}){

    const {chatIndex} = useContext(MainChatWindowContext);
    const {chats,user} = useContext(UserChatsContext);


    const handleSetValue = (lastRow, lastCol) => {
        setChats(chats=>{
            let newChats = [...chats];
            let game = newChats[chatIndex].game;
            game.board[lastRow][lastCol] = game.currentPlayer;
            game.winner = winnerCalc(game.board);
            game.currentPlayer = game.currentPlayer === 'X'?'O':'X';
            return newChats;
        });
        const game  = chats[chatIndex].game;
        inGameAction(GAMEACTIONS[2],game);
        if(game.winner) inGameAction(GAMEACTIONS[1],{draw: game.winner === '-1'});
    };

    const createBoard = () => {
        let matrix = [...chats[chatIndex].game.board];
        let board = [];
        const game =chats[chatIndex].game;
        for (let r = 0; r < 3; r++) {
            let row = [];
            for (let c = 0; c < 3; c++) {
                row.push(<Square row={r} col={c} key={r + c} setValue={handleSetValue} value={matrix[r][c]}
                                 disable={game.currentPlayer === game.myMark
                                 || Boolean(game.winner)
                                 || Boolean(matrix[r][c])}/>);
            }
            board.push(<div className="board-row" key={"row" + r}>{row}</div>);
        }
        return <div className="rows-holder" style={{ width: 3 * 56 }} >{board}</div>
    };
    const getDescription = () => {
        const game = chats[chatIndex].game;
        let text = '';
        if(game.winner){
            if(game.winner !== '-1'){
                text += 'The winner: ';
                text += game.currentPlayer === game.myMark ? user.userName : chats[chatIndex].name;
            }
            else{
                text = 'DRAW'
            }
        }else{
            text += 'Current player: ';
            text += game.currentPlayer !== game.myMark ? user.userName : chats[chatIndex].name;
        }
        return <div className={'status tc'}>{text}</div>
    };
    return(
        <div className="board">
            {getDescription()}
            {createBoard()}
        </div>
    )
}
