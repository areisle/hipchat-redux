import { ACTION_TYPES } from "./redux/actions";

type uuid = string;

interface Action<T = any> {
    type: ACTION_TYPES,
    payload: T;
}

interface Conversation {
    /** whether conversation is a room ir a private chat */
    private: boolean;
    /** people who are part of the chat (excluding user) */
    people: uuid[];
    /** identifiers for messages belonging to the chat */
    messages: uuid[];
    /** identifier for messages the haven't been read yet */
    unread: Set<uuid>;
}

interface Room extends Conversation {
    private: false,
    /** name of the room */
    title: string;
    /** optional subtitle */
    subtitle?: string;
}

interface PrivateConversation extends Conversation {
    private: true,
}

interface Person {
    /** name of the user */
    name: string;
    /** optional handle the user can set */
    handle?: string;
}

interface Message {
    /** contents of the message */
    content: string;
    /** time the message was created */
    createdAt: Date;
    /** identifier for the person who created the message */
    person: uuid;
}

interface State {
    conversations: {
        [key: string]: PrivateConversation | Room,
    };
    people: {
        [key: string]: Person,
    };
    messages: {
        [key: string]: Message,
    };
    /** the conversation currently in view */
    activeConversation: uuid | null;
    /** the active user */
    user: uuid | null;
}

export { Conversation, State, Message, Person, uuid, Action, Room };