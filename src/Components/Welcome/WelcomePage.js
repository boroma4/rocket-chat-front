import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Alert from "react-bootstrap/Alert";
import Nav from "react-bootstrap/Nav";
import Login from "./Login";
import Register from "./Register";
import './welcome.css';

function WelcomePage({loginOrRegister,path}) {

    return (
        <div >
                <Navbar bg="dark" variant={'dark'} expand="lg">
                    <Navbar.Brand >Rocket-Chat v0.1 BETA</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href = {'/rocket-chat-front/#/login'}>Sign in</Nav.Link>
                            <Nav.Link href = {'/rocket-chat-front/#/register'}>Register</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            <Alert  variant={'warning'} className={'tc'}>
                During the beta, please don't use your real email and don't send important messages over the chat!
            </Alert>
                {path==='/login'
                    ?<Login  loginOrRegister={loginOrRegister}/>
                    :<Register loginOrRegister={loginOrRegister} />
                }

            <img src={'https://dramarocket.com/wp-content/uploads/2018/01/icon-redrocket-2.png'} alt={'logo'} className={'center'}/>
            </div>
    );
}
export default WelcomePage;