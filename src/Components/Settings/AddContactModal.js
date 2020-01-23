import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {FormGroup} from "react-bootstrap";
import {UserChatsContext} from "../../App";
import {SendNewChatData} from "../../Helper/ApiFetcher";



function AddContactModal({show,handleClose,createNewChat}) {

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const {user} = useContext(UserChatsContext);
    const userId = user? user.userId : 0;

    const handleSubmit = (event) => {
        event.preventDefault();
        SendNewChatData(userId,email)
            .then(res=>{
                if(res){
                    console.log(res);
                    createNewChat(res.chatId,res.userName,res.email);
                    handleClose();
                }
            })
            .catch(err=>{
                console.log(err);
                setError('Failed to add a contact, does this person even exist?');
            });
    };
        //if no error add a new chat in main window
    const validateForm = () => {
        return email.length > 0;
    };
    return (
        <>
            <Modal show={show} onHide={handleClose} >
                <Modal.Body>
                    <h3>Add contact </h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(event)=>setEmail(event.target.value)} />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        {error
                            ? <FormGroup className='tc'>
                                <div className='tc dark-red'>{error}</div>
                            </FormGroup>
                            : <></>
                        }
                        <Button variant="primary" type="submit" disabled={!validateForm()}>
                            Add friend
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default AddContactModal;