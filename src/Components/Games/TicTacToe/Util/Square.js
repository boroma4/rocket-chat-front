import React, {useEffect, useState} from 'react';

/**
 * @description
 * Square is a cell in the main 2d array, and can receive any value and optional color.
 * @example
 * import React from 'react';
 * import Square from '@bit/joshk.tic-tac-toe-game.square';
 *
 * export default (
 *   <Square value="O"/>
 * )
 */
export default function Square({disable,row,col,setValue,value}) {

    const[clicked,setClicked] = useState(false);

    useEffect(()=>{
        if(disable) setClicked(true);
        else setClicked(false);
    }, [disable]);

    const handleClick = (event) => {
        if (!clicked) {
            setClicked(true);
            setValue(row,col);
        }
    };
        return (
            <div className={`square ${value}`} onClick={handleClick}><span>{value}</span></div>
        )
}
