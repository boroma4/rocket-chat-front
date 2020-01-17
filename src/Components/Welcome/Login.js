import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import './Login.css';
import FormLabel from "react-bootstrap/FormLabel";
import Card from "react-bootstrap/Card";

export default function Login({signIn}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        signIn(email,password);
    }

    return (
        <Card className="Login">
            <Card.Header> Sign In </Card.Header>
            <Card.Body>
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <FormGroup className = 'tc'>
                    <a className='tc' href={'/register'}>Not signed up yet?</a>
                </FormGroup>
                <Button block  disabled={!validateForm()} type="submit">
                    Login
                </Button>
            </form>
            </Card.Body>
        </Card>
    );
}