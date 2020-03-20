import React, {useContext} from 'react';
import Square from "./Util/Square";
import winnerCalc from "@bit/joshk.tic-tac-toe-game.utils.winner-calc";
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
            game.winner = winnerCalc(game.board, 3, 3, 3, lastRow, lastCol);
            game.currentPlayer = game.currentPlayer === 'X'?'O':'X';
            return newChats;
        });
        const game  = chats[chatIndex].game;
        inGameAction(GAMEACTIONS[2],game);
        if(game.winner) inGameAction(GAMEACTIONS[1],{});
    };

    const createBoard = () => {
        let matrix = [...chats[chatIndex].game.board];
        let board = [];

        for (let r = 0; r < 3; r++) {
            let row = [];
            for (let c = 0; c < 3; c++) {
                row.push(<Square row={r} col={c} key={r + c} setValue={handleSetValue} value={matrix[r][c]}
                                 disable={ chats[chatIndex].game.currentPlayer === chats[chatIndex].game.myMark
                                 || Boolean(chats[chatIndex].game.winner)
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
            text += 'The winner: ';
            text += game.currentPlayer === game.myMark ? user.userName : chats[chatIndex].name;
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
