export const ScrollChatToBottom = () =>{
    const chatWindow = document.getElementsByClassName("chat-panel")[0];
    const scrollHeight = chatWindow.scrollHeight;
    const height = chatWindow.clientHeight;
    const maxScrollTop = scrollHeight - height;
    chatWindow.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
};

export const CalculateScrollDistance  =  ()  =>  {
    const win = document.getElementsByClassName("chat-panel")[0];
    let h = win,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';

    return ((h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100);
};
