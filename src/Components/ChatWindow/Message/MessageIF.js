export class MessageIF {
    constructor({dbId,id,message,dateTime}) {
        this.dbId = dbId;
        this.id = id;
        this.message = message;
        this.dateTime = dateTime;
    }
}