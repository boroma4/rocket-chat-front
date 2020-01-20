import {HubConnectionBuilder} from "@aspnet/signalr";

export default async function createHubConnection ({getMessage}) {
    // Build new Hub Connection, url is currently hard coded.
    const hubConnect = new HubConnectionBuilder()
        .withUrl('https://localhost:5001/chat')
        .build();
    try {
        console.log('Connection successful!');
        hubConnect.on('sendToAll', getMessage);
        await hubConnect.start();
    }
    catch (err) {
        alert(err);
    }
    return hubConnect;
}