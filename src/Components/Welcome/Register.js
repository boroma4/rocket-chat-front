import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import './Login.css';
import FormLabel from "react-bootstrap/FormLabel";
import Card from "react-bootstrap/Card";

export default function Register({loginOrRegister}) {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0 && name.length;
    }

    function handleSubmit(event) {
        event.preventDefault();
        loginOrRegister({
            username:name,
            email:email,
            password:password
        }, 'register');
    }


    return (
        <Card className="Login">
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
                    <FormGroup controlId="password">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />
                    </FormGroup>
                    <Button block variant= {!validateForm()?'secondary':"primary"} disabled={!validateForm()} type="submit">
                        Register
                    </Button>
                </form>
            </Card.Body>
        </Card>
    );
}