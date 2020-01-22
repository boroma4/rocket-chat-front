import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import './Login.css';
import FormLabel from "react-bootstrap/FormLabel";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

import {
Redirect
} from "react-router-dom";

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
        setIsConnecting(true);
        setTimeout(()=>console.log(),1000);
        try {
            await loginOrRegister({email, password}, 'login');
            await (setSuccess(true));
        }
        catch(error) {
            console.log(error);
            setTimeout(() => {
                setIsConnecting(false);
                setError('Invalid email or password');
                }, 1000);
        }
    }

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
                            ? <FormGroup className='tc'>
                                <div className='tc dark-red'>{error}</div>
                            </FormGroup>
                            : <></>
                        }

                        <FormGroup className='tc'>
                            <a className='tc' href={'/register'}>Not signed up yet?</a>
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