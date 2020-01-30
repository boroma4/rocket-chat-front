import React, {useEffect, useState} from "react";

export default function ReconnectFail({isLast,nextTime}) {

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