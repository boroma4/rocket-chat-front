import React, { useState} from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import isImageUrl from 'is-image-url';

function ProfileChangeForm({type,setUser}) {

    const[input,setInput] = useState('');
    const[showAlert,setShowAlert] = useState({show:false,type:''});


    function handleSubmit(event) {
        event.preventDefault();
        setUser(user=>{
            let newUser = {...user};
            switch (type) {
                case 'image':
                    if(isImageUrl(input)){
                        newUser.imageUrl = input;
                        setShowAlert({show:true,type:'success'});
                    }
                    else {
                        setShowAlert({show:true,type:'danger'})
                    }
                    break;
                case 'name':
                    newUser.userName = input;
                    break;
                default:
                    break;
            }
            console.log(newUser);
            return newUser;
        });
    }

    function validateForm() {
        return input.length > 2;
    }

    return (
        <>
            <form onSubmit = {handleSubmit}>
                <Form.Row>
                    <Col>
                        <Form.Control placeholder={'new ' + type} value={input} onChange={e => setInput(e.target.value)}/>
                    </Col>
                    <Col>
                        <Button type="submit" variant={!validateForm() ? 'secondary' : "primary"}
                                disabled={!validateForm()}> Update!</Button>
                    </Col>
                    {showAlert.show
                        ?
                        <Alert variant={showAlert.type} onClose={() => setShowAlert({show:false,type:''})} dismissible className='ma2'>
                            {showAlert.type === 'danger'
                                ? `Your ${type} change failed with many errors!`
                                : 'Your ' + type + ' was changed successfully!'
                            }
                        </Alert>
                        :
                        <div/>
                    }

                </Form.Row>
            </form>
        </>
    );
}
export default ProfileChangeForm;