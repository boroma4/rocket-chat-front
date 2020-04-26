import React, {useContext} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Login from "./Submodules/Login";
import Register from "./Submodules/Register";
import './welcome.css';
import LoadingOverlay from 'react-loading-overlay';
import FAQorReleaseInfo from "./Submodules/FAQorReleaseInfo";
import {EmailedVerified} from "./Submodules/EmailVerification";
import {UserChatsContext} from "../../App";
import swal from "sweetalert";
import useMobileDetect from "use-mobile-detect-hook";
import {RELEASEDATA} from "../../Constants/Const";

function WelcomePage({loginOrRegister,path}) {

    const {isLoading} = useContext(UserChatsContext);
    const detectMobile = useMobileDetect();

    const handleAddToHomescreenClick = () =>{
        swal(`
    1. Open Share menu on iOS or browser settings on Android
    2. Tap on "Add to Home Screen" button`);
    };

    return (
        <>
            <LoadingOverlay
                active={isLoading}
                spinner
                text='Loading your data'
            >
                <div className='welcome-page overflow-y-auto overflow-x-hidden' >
                    <Navbar bg="dark" variant={'dark'} expand="lg">
                        <Navbar.Brand href = {'/rocket-chat-front/#/login'} >Rocket-Chat {RELEASEDATA[0].version}</Navbar.Brand>
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
                    {
                        detectMobile.isMobile()
                            ?<div onClick={handleAddToHomescreenClick} style={{marginBottom:'10px'}} className='bg-light-silver tc shadow-5 text-dark'><span className='underline'>Add to home screen</span> for best experience!</div>
                            :<div/>
                    }
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