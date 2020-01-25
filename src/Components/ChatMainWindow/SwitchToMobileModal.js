import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";




export default function SwitchToMobile({setIsMobile}) {

    const [visible, setVisible] = useState(true);

    const handleClick = (value) =>{
        console.log(value);
        setIsMobile((value));
        setVisible(false);
    };
    return (
        <>
            <Modal show={visible} onHide={()=>setVisible(false)} centered >
                <Modal.Body closeButton className={'tc'} >
                    <h3>Swtich to mobile version</h3>
                    <div >
                        <Button variant="primary" onClick = {()=>handleClick(true)}>Yes</Button>
                        <Button style = {{marginLeft:'10%'}} variant="secondary"  onClick = {()=>handleClick(true)}>No</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}