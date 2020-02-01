import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {UserChatsContext} from "../../../App";
import Figure from "react-bootstrap/Figure";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ProfileChangeForm from "./Forms/ProfileChangeForm";

function MyAccountModal({show,handleClose,setUser}) {

    const {user} = useContext(UserChatsContext);
    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Body>
                    <h3>My Account</h3>
                    <Tabs defaultActiveKey="Picture" id="uncontrolled-tab-example">
                        <Tab eventKey="Picture" title="Picture">
                            {
                                user.imageUrl
                                    ? <Figure >
                                        <Figure.Image
                                            roundedCircle = {true}
                                            width={100}
                                            height={120}
                                            alt="profile picc"
                                            src={user.imageUrl}
                                        />
                                        <Figure.Caption>
                                            Your profile picture.
                                        </Figure.Caption>
                                        <div><ProfileChangeForm setUser={setUser} type={'image'}/></div>
                                    </Figure>
                                    : <span className='ma2'> You have no pic<div><ProfileChangeForm setUser={setUser} type={'image'}/></div></span>
                            }
                        </Tab>
                        <Tab eventKey="Name" title="Name">
                            <div className='ma2 '>
                                <h6>You current name is <strong>{user.userName}</strong></h6>
                                <ProfileChangeForm setUser={setUser} type={'name'}/>
                            </div>
                        </Tab>
                    </Tabs>
                    <Button onClick = {()=>handleClose()}>Close</Button>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default MyAccountModal;