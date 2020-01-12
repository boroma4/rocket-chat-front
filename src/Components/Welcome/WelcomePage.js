import React,{useState} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Login from "./Login";
import Register from "./Register";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import App from "../../App";



function WelcomePage({signIn}) {

    return (
        <Router>
            <Navbar bg="dark" variant={'dark'} expand="lg">
                <Navbar.Brand >Rocket-Chat</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href = {'/login'}>Sign in</Nav.Link>
                        <Nav.Link href = {'/register'}>Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Switch>
                <Route path="/login">
                    <Login signIn={signIn}/>
                </Route>
                <Route path="/register">
                    <Register signIn={signIn} />
                </Route>
                <Route path="/">
                    <App/>
                </Route>
                <Route>
                    <div className='tc pa3'>
                        <h3>Sorry, page not found!</h3>
                    </div>
                </Route>
            </Switch>
        </Router>

    );
}
export default WelcomePage;