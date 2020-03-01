import React, {useEffect, useState} from 'react';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import SentimentVeryDissatisfiedSharpIcon from '@material-ui/icons/SentimentVeryDissatisfiedSharp';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import 'emoji-mart/css/emoji-mart.css'
import {Picker} from "emoji-mart";
import {ScrollChatToBottom} from "../../Helpers/Scroller";

const useStyles = makeStyles(theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        wordWrap:'break-word'
    },
    iconButton: {
        padding: 10,
        height:'100%'
    },
    divider: {
        margin: 4,
        height:'100%'
    },
}));

export default function Input({onSendClick}) {
    const classes = useStyles();
    const[input,setInput] = useState('');


    const onEmojiClick = (emoji) => {
        const text = `${input}${emoji.native}`;
        setInput(text);
    };
    const SendMessageToDatabaseAndScreen = (event) => {
        event.preventDefault();
        onSendClick(input);
        setInput('');
        setTimeout(()=>{
            ScrollChatToBottom();
        },20);

    };
    const onTyping = (event)=>{
        setInput(event.target.value);
        ScrollChatToBottom();
    };
    const submitIsValid = () => {
        return input.trim().length > 0;
    };

    return (
        <Paper component="form" className={classes.root} onSubmit={SendMessageToDatabaseAndScreen}>
            <OverlayTrigger trigger="click" placement="top" overlay={
                <Popover id="popover-basic">
                    <Picker title={'Emoji v2'} showPreview={false} set='emojione' onSelect={onEmojiClick} />
                </Popover>
            }>
                <IconButton className={classes.iconButton} aria-label="emoji">
                    <SentimentVeryDissatisfiedSharpIcon />
                </IconButton>
            </OverlayTrigger>

            <InputBase
                onChange={onTyping}
                value={input}
                rowsMax={8}
                multiline={true}
                className={classes.input}
                placeholder="write smth"
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton className={classes.iconButton} aria-label="upload">
                <CloudUploadIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton type='submit' color={submitIsValid() ? 'primary' : 'secondary'} disabled={!submitIsValid()} className={classes.iconButton} aria-label="send">
                <SendIcon />
            </IconButton>
        </Paper>
    );
}
