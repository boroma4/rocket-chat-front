import React,{useState} from 'react';
import Modal from "react-bootstrap/Modal";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Dropdown from "react-bootstrap/Dropdown";
import {SongList} from "../../Constants/Const";


// TODO use gloabl state instead of local
function AudioSettingsModal({show,handleClose,updateAudio,chooseSong}) {
    const [value, setValue] = useState(0);
    const [song, setSong] = useState('');

    const handleChange = (val) => {
        setValue(val);
        if(val && song){
            updateAudio(true);
        }
        else if(!val) {
            updateAudio(false);
        }
    };

    const changeRadioColor = (isOn) =>{
        return isOn ? 'primary' : 'secondary';
    };
    const changeSong = (item) =>{
        setValue(0);
        chooseSong(item);
        setSong(item);
    };
    return (
        <>
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Body>
                <h3>Audio settings</h3>
                <h5>Current song</h5>
                <Dropdown >
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {song
                            ? <>{song}</>
                            :<>Choose song </>
                        }
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {SongList.map((item)=>(
                                <Dropdown.Item key = {item} onClick = {()=>changeSong(item)}>{item}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                <h4> Playback </h4>
                    <ToggleButtonGroup type="radio" name="options" value={value} onChange={handleChange}>
                        <ToggleButton variant ={changeRadioColor(Boolean(value))} value={1} >On</ToggleButton>
                        <ToggleButton variant ={changeRadioColor(!Boolean(value))}  value={0}>Off</ToggleButton>
                    </ToggleButtonGroup>
            </Modal.Body>
        </Modal>
        </>
    );
}
export default AudioSettingsModal;