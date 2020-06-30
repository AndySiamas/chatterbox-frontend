export default class Message {
    public constructor(public text: string,
                       public timestamp: Date,
                       public username: string,
                       public roomId: string) {}
}