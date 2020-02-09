import React, {useEffect, useState} from "react";
import '../Login.css';
import Card from "react-bootstrap/Card";
import {Redirect} from "react-router-dom";

export  function EmailedVerified({success}) {

    const [redirect,setRedirect] = useState({done:false,time:4});

    useEffect(()=>{
        const interval = setInterval(() => {
            let newVal = {...redirect};
            if(redirect.time < 2){
                newVal.done = true
            }
            newVal.time -=1;
            setRedirect(newVal)
        }, 1000);
        return function cleanup() {
            clearInterval(interval);
        }},[redirect]
    );

    return (
        <>
            {redirect.done
                ? <Redirect to={'/login'}/>
                : <Card className="Login">
                    <Card.Header>Email verification</Card.Header>
                    <Card.Body>
                        {
                            success
                                ? <div>Your email was verified <span
                                    className={'green'}>successfully</span> :)<br/> Redirecting you in {redirect.time}</div>
                                : <div>Email verification <span className={'red'}>failed</span> :( <br/> Redirecting you
                                    in {redirect.time} </div>
                        }
                    </Card.Body>
                </Card>
            }
        </>
    );
};
