import React,{useState} from 'react';
import Modal from "react-bootstrap/Modal";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";



function AudioSettingsModal({show,handleClose,updateAudio}) {
    const [value, setValue] = useState(0);
    const handleChange = (val) => {
        setValue(val);
        val === 1? updateAudio(true) : updateAudio(false);
    };

    return (
        <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Audio settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4> EarGasm </h4>
                    <ToggleButtonGroup type="radio" name="options" value={value} onChange={handleChange}>
                        <ToggleButton value={1}>On</ToggleButton>
                        <ToggleButton variant ={'secondary'}  value={2}>Off</ToggleButton>
                    </ToggleButtonGroup>
            </Modal.Body>
        </Modal>
        </>
    );
}
export default AudioSettingsModal;