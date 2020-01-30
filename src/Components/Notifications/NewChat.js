import React from "react";

export default function content({name}) {
    return (
        <div>
            <strong>New chat!</strong>
            <div>
                <strong>{name}</strong> created a chat with you!
            </div>
        </div>
    );
}