import React, {useContext} from 'react';
import Modal from "react-bootstrap/Modal";
import {UserChatsContext} from "../../../App";
import Figure from "react-bootstrap/Figure";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ProfileChangeForm from "./Forms/ProfileChangeForm";
import NotificationsForm from "./Forms/NotificationsForm";

function MyAccountModal({show,handleClose,UpdateUserData}) {

    const {user} = useContext(UserChatsContext);
    return (
        <>
            <Modal show={show} onHide={handleClose} centered >
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
                                        <div><ProfileChangeForm UpdateUserData={UpdateUserData} type={'image'}/></div>
                                    </Figure>
                                    : <span className='ma2'> You have no pic<div><ProfileChangeForm UpdateUserData={UpdateUserData} type={'image'}/></div></span>
                            }
                        </Tab>
                        <Tab eventKey="Name" title="Name">
                            <div className='ma2 '>
                                <h6>Your current name is <strong>{user.userName}</strong></h6>
                                <ProfileChangeForm UpdateUserData={UpdateUserData} type={'name'}/>
                            </div>
                        </Tab>
                        <Tab eventKey="Notifications" title="Notifications">
                            <div className='ma2 '>
                                <NotificationsForm UpdateUserData={UpdateUserData}/>
                            </div>
                        </Tab>
                    </Tabs>
                    <Button style = {{float:'right'}} onClick = {()=>handleClose()}>Close</Button>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default MyAccountModal;