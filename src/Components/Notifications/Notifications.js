import React, {useEffect, useState} from "react";
import notification from '../../sounds/notification.mp3';
import Sound from 'react-sound';


export  function NewChat({name,sound}) {
    return (
        <div>
            <strong>New chat!</strong>
            <div>
                <strong>{name}</strong> created a chat with you!
            </div>
            {sound
                ?<Sound url= {notification} autoLoad={true} playStatus={Sound.status.PLAYING}/>
                :<div/>
            }
        </div>
    );
}
export  function NewMessage({name,body,sound}) {
    return (
        <div>
            <strong>{name}</strong>
            <div>
                {body}
            </div>
            {sound
                ?<Sound url= {notification} autoLoad={true} playStatus={Sound.status.PLAYING}/>
                :<div/>
            }
        </div>
    );
}
export  function GameInviteSent({failed,sound}) {
    return (
        <div>
            <strong>Game BOT</strong>
            <div>
                {failed
                    ?<div> Your invitation was <strong>NOT</strong> sent!<br/>
                        <strong>Please finish current game first!!1!</strong></div>
                    :<div>
                        Your invitation was sent!<br/>
                        <strong>If your friend is offline he won't get it!</strong>
                    </div>
                }

            </div>
            {sound
                ?<Sound url= {notification} autoLoad={true} playStatus={Sound.status.PLAYING}/>
                :<div/>
            }
        </div>
    );
}


export  function OnlineOrOffline({online,sound}) {

    return (
        <div>
            <strong>Connection status changed!</strong>
            <div>
                { online ? 'You are online now':'You went offline, your messages will not be sent!' }
            </div>
            {
                !online?
                    <div>
                        We will try to reconnect you!
                    </div>
                    :
                    <div/>
            }
            {sound
                ?<Sound url= {notification} autoLoad={true} playStatus={Sound.status.PLAYING}/>
                :<div/>
            }
        </div>
    );
}
export  function ReconnectFail({isLast,nextTime,sound}) {

    const[timer,setTimer] = useState(nextTime);


    useEffect(()=>{
        const interval = setInterval(() => setTimer(timer-1), 1000);
        return function cleanup() {
            clearInterval(interval);
        }},[timer]
    );
    return (
        <div>
            <strong>Reconnection failed!</strong>
            <div>
                { isLast ? 'Failed to reconnect, please reload the page or try again later.':`We will try again in ${timer} seconds.` }
            </div>
            {sound
                ? <Sound url= {notification} autoLoad={true} playStatus={Sound.status.PLAYING}/>
                :<div/>
            }

        </div>
    );
}

