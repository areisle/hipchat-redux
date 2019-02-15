import { State, Action } from '../types.d';
import { sendMessage, changeConversation, ACTION_TYPES } from './actions';

/** adds a message to the active conversation */
const messageReducer = (
    state: State,
    { payload: { content, id, date } }: ReturnType<typeof sendMessage>,
): State => {
    const {
        user, activeConversation,
        conversations,
        messages,
    } = state;

    if (!activeConversation || !user) { return state; }

    const newMessage = {
        createdAt: date,
        person: user,
        content,
    };

    return {
        ...state,
        conversations: {
            ...conversations,
            [activeConversation]: {
                ...conversations[activeConversation],
                messages: [
                    ...conversations[activeConversation].messages,
                    id,
                ],
            },
        },
        messages: {
            ...messages,
            [id]: newMessage,
        },
    };
};

/** swaps the active conversation */
const conversationReducer = (state: State, { payload }: ReturnType<typeof changeConversation>): State => {

    const { conversations } = state;

    return {
        ...state,
        conversations: {
            ...conversations,
            [payload]: {
                ...conversations[payload],
                unread: new Set(),
            },
        },
        activeConversation: payload,
    };
};

const initialState: State = {
    conversations: {},
    messages: {},
    people: {},
    user: null,
    activeConversation: null,
};

const rootReducer = (state: State = initialState, action: Action): State => {
    if (action.type === ACTION_TYPES.SEND_MESSAGE) {
        return messageReducer(state, action);
    }
    if (action.type === ACTION_TYPES.CHANGE_ACTIVE_CONVERSATION) {
        return conversationReducer(state, action);
    }
    return state;
};

export { rootReducer };