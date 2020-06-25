import User from './user.model';

export default interface Message {
    text: string;
    timestamp: string;
    user: User;
}