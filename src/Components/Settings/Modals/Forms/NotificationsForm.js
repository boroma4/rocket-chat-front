import React, {useContext, useState} from 'react';
import ToggleSwitch from "./ToggleSwitch";
import Button from "react-bootstrap/Button";
import {UserChatsContext} from "../../../../App";
import Alert from "react-bootstrap/Alert";
import {UpdateNotificationSettings} from "../../../../Helpers/ApiFetcher";


function NotificationsForm({UpdateUserData,handleClose}) {

    const {user} = useContext(UserChatsContext);

    const[activeSwitches,setActiveSwitches] = useState(user.notificationSettings);
    const[showAlert,setShowAlert] = useState({show:false,type:''});


    function handleSubmit(event) {
        event.preventDefault();
        UpdateUserData('notifications',activeSwitches);
        const {sound,newChatReceived,newMessageReceived,connectionChanged} = activeSwitches;
        UpdateNotificationSettings(user.userId,sound,newChatReceived,newMessageReceived,connectionChanged)
            .then(()=>setShowAlert({show:true,type:'success'}))
            .catch(err=>{
                setShowAlert({show:true,type:'danger'});
                console.log(err);
            })

    }

    function handleChange(val){
        let newState = {...activeSwitches};
        newState[val] = !newState[val];
        setActiveSwitches(newState);
    }
    return (
        <>
            <form onSubmit = {handleSubmit}>
                <label>
                    <div className='container'>
                        <div className='row h-auto' style={{alignContent:'start'}}>
                            {
                                Object.keys(activeSwitches).map((key, index) => (
                                    index === 0
                                        ? <div key={key}/>
                                        : <ToggleSwitch handleChange={handleChange} activeSwitches={activeSwitches}
                                                        name={key} key={key}/>
                                ))
                            }
                        </div>
                    </div>
                </label>
                <br/>
                {showAlert.show
                    ?
                    <Alert variant={showAlert.type} onClose={() => setShowAlert({show:false,type:''})} dismissible className='ma2'>
                        {showAlert.type === 'danger'
                            ? `Failed to save notification settings!`
                            : 'Notification settings changed successfully!'
                        }
                    </Alert>
                    :<div/>
                }
                <br/> <Button type={'submit'}> Save </Button>
            </form>
        </>
    );
}
export default NotificationsForm;