import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Alert from "react-bootstrap/Alert";
import Nav from "react-bootstrap/Nav";
import Login from "./Submodules/Login";
import Register from "./Submodules/Register";
import './welcome.css';
import FAQorReleaseInfo from "./Submodules/FAQorReleaseInfo";

function WelcomePage({loginOrRegister,path}) {

    return (
        <div className={path === '/faq'|| path === '/release'? 'welcome-page overflow-hidden' : 'welcome-page overflow-auto'} >
                <Navbar bg="dark" variant={'dark'} expand="lg">
                    <Navbar.Brand href = {'/rocket-chat-front/#/login'} >Rocket-Chat v0.2 BETA</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto ">
                            <Nav.Link href = {'/rocket-chat-front/#/faq'}>FAQ</Nav.Link>
                            <Nav.Link href = {'/rocket-chat-front/#/release'}>Release notes</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href = {'/rocket-chat-front/#/login'}>Sign in</Nav.Link>
                            <Nav.Link href = {'/rocket-chat-front/#/register'}>Register</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            <Alert  variant={'warning'} className={'tc ma0'}>
                During the beta, please don't use your real email and don't send important messages over the chat!<br/>
               <strong>If you had an account before, please create a new one,thanks!<br/>
               Make sure to check out our <a href={'/rocket-chat-front/#/release'}>release notes</a>!
               </strong>
            </Alert>
            {
                {
                    '/login': <Login loginOrRegister={loginOrRegister}/>,
                    '/register': <Register loginOrRegister={loginOrRegister}/>,
                    '/faq':<FAQorReleaseInfo isFAQ={true}/>,
                    '/release':<FAQorReleaseInfo isFAQ={false}/>
                }[path]
            }

            <img src={'https://dramarocket.com/wp-content/uploads/2018/01/icon-redrocket-2.png'} alt={'logo'} className={'center'}/>
            </div>
    );
}
export default WelcomePage;