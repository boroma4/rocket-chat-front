import React,{useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";



function AddContactModal({show,handleClose}) {

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        //TODO fetch api/addchat with current userId and entered email
        //if no error add a new chat in main window
    };
    const validateForm = () => {
        return email.length > 0;
    };
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <h3>Add contact </h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(event)=>setEmail(event.target.value)} />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
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