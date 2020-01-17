import {HubConnectionBuilder} from "@aspnet/signalr";

export default async function createHubConnection () {
    // Build new Hub Connection, url is currently hard coded.
    const hubConnect = new HubConnectionBuilder()
        .withUrl('https://localhost:5001/chat')
        .build();
    try {
        await hubConnect.start();
        console.log('Connection successful!')
    }
    catch (err) {
        alert(err);
    }
    return hubConnect;
}