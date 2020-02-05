import React, {useEffect, useState} from "react";

export  function NewChat({name}) {
    return (
        <div>
            <strong>New chat!</strong>
            <div>
                <strong>{name}</strong> created a chat with you!
            </div>
        </div>
    );
}

export  function OnlineOrOffline({online}) {

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
        </div>
    );
}
export  function ReconnectFail({isLast,nextTime}) {

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
        </div>
    );
}

