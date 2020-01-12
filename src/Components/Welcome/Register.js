import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import './Login.css';
import FormLabel from "react-bootstrap/FormLabel";
import Card from "react-bootstrap/Card";

export default function Register({signIn}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        signIn(true);
    }

    return (
        <Card className="Login">
            <Card.Header> Register </Card.Header>
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
                    <Button block bsSize="large" disabled={!validateForm()} type="submit">
                        Register
                    </Button>
                </form>
            </Card.Body>
        </Card>
    );
}