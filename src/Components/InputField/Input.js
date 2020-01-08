import React from 'react';
import {ThemeProvider,TextComposer,Row,IconButton,AddIcon,TextInput,EmojiIcon,SendButton}
    from '@livechat/ui-kit';

function Input({onSendClick}) {
    return (
        <ThemeProvider>
            <TextComposer>
                <Row align="center">
                    <IconButton fit>
                        <AddIcon />
                    </IconButton>
                    <TextInput fill = 'true' />
                    <SendButton fit onClick = {onSendClick} />
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