import { State, uuid } from '../types.d';

/** get count of all unread messages */
const unreadSelector = ({ conversations }: State) => ({
    unread: Object.values(conversations)
        .reduce(
            (sum, next) => sum + next.unread.size,
            0
        )
});

/** get details for the currently active conversation */
const activeConversationSelector = (state: State) => {
    const {
        conversations, activeConversation,
        messages, people, user,
    } = state;
    if (!activeConversation || !user) {
        return {
            messages: [],
            people: [],
        };
    }

    const conversation = conversations[activeConversation];

    return {
        uuid: activeConversation,
        messages: conversation.messages.map((id) => ({
            ...messages[id],
            unread: conversation.unread.has(id),
            name: people[messages[id].person].name,
            uuid: id,
            active: messages[id].person === user,
        })),
        people: [...conversation.people.map((id) => ({
            ...people[id],
            uuid: id,
        })), { ...people[user], uuid: user }],
    };
};

const conversationsSelector = (state: State) => {

    type conversation = { uuid: uuid, label: string, active: boolean, unread: number };
    const rooms: conversation[] = [];
    const people: conversation[] = [];

    for (const [uuid, conversation] of Object.entries(state.conversations)) {
        const active = (uuid === state.activeConversation);
        const unread = conversation.unread.size;
        if (conversation.private) {
            people.push({
                uuid,
                label: state.people[conversation.people[0]].name,
                active,
                unread,
            })
        } else {
            rooms.push({
                uuid,
                label: conversation.title,
                active,
                unread,
            })
        }
    }

    return {
        rooms,
        people,
    };
}

export {
    activeConversationSelector,
    unreadSelector,
    conversationsSelector,
};