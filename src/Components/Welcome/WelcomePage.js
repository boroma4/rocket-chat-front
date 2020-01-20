import React,{useState} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Login from "./Login";
import Register from "./Register";
import './welcome.css';

function WelcomePage({loginOrRegister,path}) {

    return (
        <div >
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
                {path==='/login'
                    ?<Login loginOrRegister={loginOrRegister}/>
                    :<Register loginOrRegister={loginOrRegister} />
                }

            <img src={'https://dramarocket.com/wp-content/uploads/2018/01/icon-redrocket-2.png'} alt={'logo'} className={'center'}/>
            </div>
    );
}
export default WelcomePage;