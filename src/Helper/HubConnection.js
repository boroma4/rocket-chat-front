import {HubConnectionBuilder} from "@aspnet/signalr";

export default async function createHubConnection ({setMessages}) {
    // Build new Hub Connection, url is currently hard coded.
    const hubConnect = new HubConnectionBuilder()
        .withUrl('https://localhost:5001/chat')
        .build();
    try {
        await hubConnect.start();
        console.log('Connection successful!');
        hubConnect.on('sendMessage', setMessages);
    }
    catch (err) {
        alert(err);
    }
    return hubConnect;
}