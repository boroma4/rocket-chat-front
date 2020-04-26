import React, {useEffect, useState} from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import '../Login.css';
import FormLabel from "react-bootstrap/FormLabel";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";


import {
Redirect
} from "react-router-dom";
import jwt from "jsonwebtoken";
import {TokenSignature} from "../../../Constants/Const";

export default function Login({loginOrRegister}) {

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [isConnecting, setIsConnecting] = useState(false);
    const [success,setSuccess] = useState(false);


    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        await handleLogin('login');
    }

    async function handleLogin (endpoint,token){
        setIsConnecting(true);
        setTimeout(()=>console.log(),1000);
        try {
            const param = endpoint === 'login' ? {email, password} : {token};
            let loginStatus = await loginOrRegister(param,endpoint);
            if(loginStatus === 'duplicate'){
                throw new Error('Please finish another session before starting a new one.');
            }
            setSuccess(true);
        }
        catch(error) {
            setTimeout(() => {
                setIsConnecting(false);
                if(error.toString().includes('Failed to fetch')){
                    setError('No response from the server')
                }else {
                    setError(error.message);
                }
            }, 1000);
        }
    }
    useEffect(()=>{
        const pwaAuth = document.querySelector("pwa-auth");
        pwaAuth.addEventListener("signin-completed", ev => {
            const signIn = ev.detail;
            if (signIn.error) {
                setError(`Failed to login with ${signIn.provider}`);
            } else {
                console.log(signIn);
                let token = jwt.sign({email:signIn.email,name:signIn.name.split(' ')[0],imageUrl:signIn.imageUrl}, TokenSignature);
                handleLogin('google',token);
            }
        });
    },[]);
    return (
        <>
        {success
            ? <Redirect to={'/app'}/>
            : <Card className="Login">
                <Card.Header> Sign In </Card.Header>
                <Card.Body>
                    <form onSubmit={handleSubmit}>
                        <FormGroup controlId="email">
                            <FormLabel>Email</FormLabel>
                            <FormControl
                                autoFocus
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup controlId="password">
                            <FormLabel>Password</FormLabel>
                            <FormControl
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                            />
                        </FormGroup>
                        {error
                            ? <FormGroup>
                                <div className='tc dark-red'>{error}</div>
                            </FormGroup>
                            : <></>
                        }

                        <FormGroup className='tc'>
                            <a className='tc' href={'/rocket-chat-front/#/register'}>Not signed up yet?</a>
                            <div style={{marginTop:'15px'}}>
                                <pwa-auth appearance="list"
                                          credentialmode="prompt"
                                          microsoftkey= {process.env.REACT_APP_MICROSOFT_ID}
                                          googlekey={process.env.REACT_APP_GOOGLE_ID}
                                          facebookkey={process.env.REACT_APP_FB_ID}
                                >
                                </pwa-auth>

                            </div>
                        </FormGroup>
                        <Button block variant={!validateForm() ? 'secondary' : "primary"}
                                disabled={!validateForm() || isConnecting} type="submit">
                            {!isConnecting
                                ? 'Login'
                                : <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            }
                        </Button>
                    </form>
                </Card.Body>
            </Card>
        }
</>
    );
}