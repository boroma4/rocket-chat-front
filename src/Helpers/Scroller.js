export const ScrollChatToBottom = () =>{
    const chatWindow = document.getElementsByClassName("chat-panel")[0];
    const scrollHeight = chatWindow.scrollHeight;
    const height = chatWindow.clientHeight;
    const maxScrollTop = scrollHeight - height;
    chatWindow.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
};