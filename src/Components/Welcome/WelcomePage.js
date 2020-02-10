import React, {useContext} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Alert from "react-bootstrap/Alert";
import Nav from "react-bootstrap/Nav";
import Login from "./Submodules/Login";
import Register from "./Submodules/Register";
import './welcome.css';
import LoadingOverlay from 'react-loading-overlay';
import FAQorReleaseInfo from "./Submodules/FAQorReleaseInfo";
import {EmailedVerified} from "./Submodules/EmailVerification";
import {UserChatsContext} from "../../App";

function WelcomePage({loginOrRegister,path}) {

    const {isLoading} = useContext(UserChatsContext);

    return (
        <>
            <LoadingOverlay
                active={isLoading}
                spinner
                text='Loading your data'
            >
                <div className='welcome-page overflow-y-auto overflow-x-hidden' >
                    <Navbar bg="dark" variant={'dark'} expand="lg">
                        <Navbar.Brand href = {'/rocket-chat-front/#/login'} >Rocket-Chat v0.3 BETA</Navbar.Brand>
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
                        <strong>99.9% sure your account won't be deleted again!!<br/>
                        Only login with Google is available at the moment, sorry! <br/>
                            Make sure to check out our <a href={'/rocket-chat-front/#/release'}>release notes</a>!
                        </strong>
                    </Alert>
                    {
                        {
                            '/login': <Login loginOrRegister={loginOrRegister}/>,
                            '/register': <Register loginOrRegister={loginOrRegister}/>,
                            '/faq':<FAQorReleaseInfo isFAQ={true}/>,
                            '/release':<FAQorReleaseInfo isFAQ={false}/>,
                            '/vsuccess':<EmailedVerified success={true}/>,
                            '/vfailed':<EmailedVerified success={false}/>
                        }[path]
                    }
                    {path === '/login' || path === '/register'
                        ? <img src={'https://dramarocket.com/wp-content/uploads/2018/01/icon-redrocket-2.png'} alt={'logo'}
                               className={'center'}/>
                        : <div/>
                    }
                </div>
            </LoadingOverlay>
        </>
    );
}
export default WelcomePage;