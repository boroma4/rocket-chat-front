import React from 'react';
import './Friends.css'

function Friends({friends}) {
    return (
        <div className='friend-list'>
            {friends.map(friend =>(
                <div className="card mb-3 friend" key={friend.name} >
                    <div className=" no-gutters">
                        <div className="col-md-12" >
                            <div className="card-body">
                                <h5 className="card-title">{friend.name}</h5>
                                <p className="card-text">{friend.msg}</p>
                                <p className="card-text"><small className="text-muted">Last seen {friend.online} mins ago</small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) )}
        </div>
    );
}
export default Friends;