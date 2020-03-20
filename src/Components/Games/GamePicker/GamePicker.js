import React from "react";
import Figure from "react-bootstrap/Figure";
import './GamePicker.css';
import {GAMES} from '../GamesList';
import {GAMECODE} from "../../../Constants/Const";

export  default function GamePicker({sendMessage}) {

    const onGameClick = (name) =>{
        // true marks that this message is a game invite and it is not saved to database or shown in senders chats
        // GAMECODE is being removed on render time
        sendMessage(`Let's fight to death in a game of ${GAMECODE +' '+ name}`, true)
    };
    return (
        <div>
            <div className={'pick-header'}>
                <h3 className='border-bottom border-dark pa3 shadow-5 header-text '>
                    Pick a game
                </h3>
            </div>
            <div> {/*TODO add flexbox*/}
                {
                    GAMES.map(game=>(
                        <Figure className = 'pa2' key = {game.name}>
                            <Figure.Image alt="Tic tac toe icon" className='ic' src={game.icon} onClick={()=>onGameClick(game.name)}/>
                            <Figure.Caption>
                                {game.name}
                            </Figure.Caption>
                        </Figure>
                    ))
                }
            </div>

        </div>
    );
}