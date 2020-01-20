import {HubConnectionBuilder} from "@aspnet/signalr";

export default async function createHubConnection ({setMessages}) {
    // Build new Hub Connection, url is currently hard coded.
    const hubConnect = new HubConnectionBuilder()
        .withUrl('https://localhost:5001/chat')
        .build();
    try {
        console.log(1,'Connection successful!');
        hubConnect.on('sendToAll', setMessages);
        await hubConnect.start();
    }
    catch (err) {
        alert(err);
    }
    console.log(2);
    return hubConnect;
}