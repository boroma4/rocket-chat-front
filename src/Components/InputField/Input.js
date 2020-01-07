import React from 'react';
import {TextComposer,Row,IconButton,AddIcon,TextInput,EmojiIcon,SendButton}
    from '@livechat/ui-kit';

function Input() {
    return (
            <TextComposer>
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
    );
}
export default Input;