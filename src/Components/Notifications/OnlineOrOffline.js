import React from "react";

export default function OnlineNotification({online}) {


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