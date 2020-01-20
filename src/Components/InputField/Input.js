import React,{useState} from 'react';
import {ThemeProvider,TextComposer,Row,IconButton,AddIcon,TextInput,EmojiIcon,SendButton}
    from '@livechat/ui-kit';
import {HubConnectionBuilder} from "@aspnet/signalr";
//import OverlayTrigger from "react-bootstrap/OverlayTrigger";
//import Popover from "react-bootstrap/Popover";
//import Picker from 'emoji-picker-react';


function Input({onSendClick,showEmoji,emojiSeen}) {
    const[input,inputChange] = useState('');
    //const [chosenEmoji, setChosenEmoji] = useState(null);

    const Hub = new HubConnectionBuilder().withUrl('https://localhost:5001/chat').build();

    const updField = (event) =>{
        if(event.type === 'change'){
            inputChange(event.target.value);
        }
      console.log(input)
    };

    const onEmojiClick = (event, emojiObject) => {
        if(emojiObject){
             inputChange(prevState => prevState + emojiObject.emoji)
        }

    };
    const SendMessageToDatabaseAndScreen = (input) => {
        onSendClick(input);
        /*console.log("All good");
        Hub.start().catch(err => console.log('Error while establishing connection :('));
        console.log("All good");
        Hub.invoke('sendToAll', 1, 1, input).catch(err => console.error(err));*/
    };

    return (
        <>

        <ThemeProvider>
            <TextComposer onSend={()=>SendMessageToDatabaseAndScreen(input)}
             onChange={updField}>
                <Row align="center">
                    <IconButton fit>
                        <AddIcon />
                    </IconButton>
                    <TextInput fill = 'true'  />
                    <SendButton fit />
                </Row>

                <Row verticalAlign="center" justify="left">
                    <IconButton fit>
                            <EmojiIcon onClick = {()=>showEmoji(!emojiSeen)}/>
                    </IconButton>
                </Row>
            </TextComposer>
        </ThemeProvider>
            </>
    );
}
export default Input;