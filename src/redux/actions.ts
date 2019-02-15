import { uuid } from '../types.d';

enum ACTION_TYPES {
    SEND_MESSAGE = 'SEND_MESSAGE',
    CHANGE_ACTIVE_CONVERSATION = 'CHANGE_ACTIVE_CONVERSATION',
    // ... and a lot more
}

// action creators
const sendMessage = (content: string, id: uuid, date: Date) => ({
    type: ACTION_TYPES.SEND_MESSAGE,
    payload: { content, id, date },
});

const changeConversation = (conversation: uuid) => ({
    type: ACTION_TYPES.CHANGE_ACTIVE_CONVERSATION,
    payload: conversation,
});

export {
    sendMessage, changeConversation,
    ACTION_TYPES,
};