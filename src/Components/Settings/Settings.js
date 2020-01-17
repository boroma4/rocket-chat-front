import React,{useState} from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import AudioSettingsModal from "./AudioSettingsModal";

const SettingsList = ['Audio','Logout'];


function Settings({updateAudio,logout}) {
    const [modal, setModal] = useState({type:'',seen:false});

    const handleClose = () => setModal({type:'',seen:false});
    const handleShow = (type) => setModal({type:type,seen:true});

    return (
        <>
        <Dropdown>
            <Dropdown.Toggle variant="secondary" size={'sm'} id="dropdown-basic">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/>
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                </svg>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                    <Dropdown.Item onClick = {()=>handleShow(SettingsList[0])} >{SettingsList[0]}</Dropdown.Item>
                <Dropdown.Item onClick = {logout}>{SettingsList[1]}</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
            {modal.type === 'Audio'
                ? <AudioSettingsModal show = {modal.seen} handleClose = {handleClose} updateAudio={updateAudio}/>
                :<div/>
            }

           </>

    );
}
export default Settings;