import React,{useState} from 'react';
import {ThemeProvider,TextComposer,Row,IconButton,AddIcon,TextInput,EmojiIcon,SendButton}
    from '@livechat/ui-kit';

function Input({onSendClick}) {
    const[input,inputChange] = useState('');

    const updField = (event) =>{
      inputChange(event.target.value);
    };
    return (
        <ThemeProvider>
            <TextComposer onSend={()=>onSendClick(input)} onChange={updField}>
                <Row align="center">
                    <IconButton fit>
                        <AddIcon />
                    </IconButton>
                    <TextInput fill = 'true' />
                    <SendButton fit />
                </Row>

                <Row verticalAlign="center" justify="right">
                    <IconButton fit>
                        <EmojiIcon />
                    </IconButton>
                </Row>
            </TextComposer>
        </ThemeProvider>
    );
}
export default Input;