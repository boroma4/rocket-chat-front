import React, {useState} from 'react';
import Square from '@bit/joshk.tic-tac-toe-game.square';
import winnerCalc from "@bit/joshk.tic-tac-toe-game.utils.winner-calc";

export default function TicTacToeBoard(){
    const[board,setBoard] = useState([
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]);
    const [turn,setTurn ] = useState('X');
    const [winner,setWinner ] = useState('');

    const handleSetValue = (lastRow, lastCol) => {
        let b = Object.assign([],board);
        b[lastRow][lastCol] = turn;
        const winner = winnerCalc(board, 3, 3, 3, lastRow, lastCol);
        setBoard(b);
        setTurn(turn === 'X' ? 'O' : 'X');
        setWinner(winner);
    };

    const createBoard = () => {
        let matrix = [...board];

        for (let r = 0; r < 3; r++) {
            let row = [];
            for (let c = 0; c < 3; c++) {
                row.push(<Square row={r} col={c} key={r + c} setValue={handleSetValue} value={matrix[r][c]} disable={winner === 'X' || winner === 'O'} />);
            }
            matrix.push(<div className="board-row" key={"row" + r}>{row}</div>);
        }
        return <div className="rows-holder" style={{ width: 3 * 56 }} >{matrix}</div>
    };

    return(
        <div className="board">
            <div className="status tc">{turn}</div>
            {createBoard()}
        </div>
    )
}
