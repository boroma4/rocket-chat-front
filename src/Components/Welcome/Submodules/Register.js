import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import '../Login.css';
import FormLabel from "react-bootstrap/FormLabel";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import {Redirect} from "react-router-dom";
import {PasswordStrLevels} from "../../../Constants/Const";

export default function Register({loginOrRegister}) {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState("");
    const [success,setSuccess] = useState(false);
    const [passwordStrength,setPasswordStrength] = useState(0);


    function validateForm() {
        return email.length > 0 && passwordStrength > 1 && name.length;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsConnecting(true);
        setTimeout(()=>console.log(),1000);
        try {
            await loginOrRegister({username:name,email, password}, 'register');
            await (setSuccess(true));
        }
        catch(error) {
            setTimeout(() => {
                setIsConnecting(false);
                if(error.toString().includes('Failed to fetch')){
                    setError('No response from the server')
                }else {
                    setError(error.message);
                }
            }, 500);
        }
    }
    const checkPassWordStrength = (event) =>{
        let currentStr = 0;
        let input = event.target.value;

        if(input.length > 3) currentStr++;
        if(input.length > 5) currentStr++;
        //if has a number
        if(input.match(/\d+/g)) currentStr++;

        setPasswordStrength(currentStr);
        setPassword(input);

    };
    return (
        <>
            {success
                ? <Redirect to={'/app'}/>
                : <Card className="Login">
                    <Card.Header> Register </Card.Header>
                    <Card.Body>
                        <form onSubmit={handleSubmit}>
                            <FormGroup controlId='name'>
                                <FormLabel>Name</FormLabel>
                                <FormControl
                                    autoFocus
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup controlId="email">
                                <FormLabel>Email</FormLabel>
                                <FormControl
                                    autoFocus
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup controlId="password" >
                                <FormLabel>Password</FormLabel>
                                <FormControl
                                    style = {{borderBottom: `3px solid ${PasswordStrLevels[passwordStrength].color}`}}
                                    value={password}
                                    onChange={checkPassWordStrength}
                                    type="password"
                                />
                            </FormGroup>
                            {error
                                ? <FormGroup>
                                    <div className='tc dark-red'>{error}</div>
                                </FormGroup>
                                : <></>
                            }
                                <Button block variant={!validateForm() ? 'secondary' : "primary"}
                                        disabled={!validateForm() || isConnecting} type="submit">
                                    {!isConnecting
                                        ? 'Register'
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