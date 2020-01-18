import React,{useState} from 'react';
import Modal from "react-bootstrap/Modal";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Dropdown from "react-bootstrap/Dropdown";
import {SettingsList, SongList} from "../../Constants/Const";



function AudioSettingsModal({show,handleClose,updateAudio,chooseSong}) {
    const [value, setValue] = useState(0);
    const handleChange = (val) => {
        setValue(val);
        val === 1? updateAudio(true) : updateAudio(false);
    };
    const changeSong = (item) =>{
        setValue(0);
        chooseSong(item);
    };
    return (
        <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                <h3>Audio settings</h3>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Choose song
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {SongList.map((item)=>(
                                <Dropdown.Item key = {item} onClick = {()=>changeSong(item)}>{item}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                <h4> Playback </h4>
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