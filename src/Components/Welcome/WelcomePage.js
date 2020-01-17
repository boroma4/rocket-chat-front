import React,{useState} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Login from "./Login";
import Register from "./Register";
import './welcome.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";



function WelcomePage({loginOrRegister}) {

    return (
        <div >
            <Router className = {'rocket'}>
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
                        <Login loginOrRegister={loginOrRegister}/>
                    </Route>
                    <Route path="/register">
                        <Register loginOrRegister={loginOrRegister} />
                    </Route>
                    <Route path="/">
                        <Login loginOrRegister={loginOrRegister}/>
                    </Route>
                    <Route>
                        <div className='tc pa3'>
                            <h3>Sorry, page not found!</h3>
                        </div>
                    </Route>
                </Switch>
            </Router>
            <img src={'https://dramarocket.com/wp-content/uploads/2018/01/icon-redrocket-2.png'} alt={'logo'} className={'center'}/>
            </div>
    );
}
export default WelcomePage;