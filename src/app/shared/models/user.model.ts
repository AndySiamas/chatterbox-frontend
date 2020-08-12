import { Token } from './token.model';
import Chatroom from './chatroom.model';

export default class User {
    public constructor(public name: string,
                       public token: Token,
                       public socketId: string,
                       public currentRoom: Chatroom) {}
}