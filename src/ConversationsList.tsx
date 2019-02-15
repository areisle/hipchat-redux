import React from 'react';
import { connect } from 'react-redux';
import { conversationsSelector } from './redux/selectors';
import { uuid } from './types.d';
import { changeConversation } from './redux/actions';

const Group = ({ items, label, onClick }: {
    label: string,
    items: { uuid: uuid, label: string, active?: boolean, unread: number }[],
    onClick: any,
}) => {

    const listItems = items.map((item) => (
        <li
            key={item.uuid}
            onClick={() => !item.active && onClick(item.uuid)}
            className={`group__item ${item.active ? 'group__item--active' : ''}`}
        >
            {item.label}
            {!!item.unread && (
                <span className='bubble bubble--notification'>{item.unread}</span>
            )}
        </li>
    ));

    return (
        <>
            <h3 className='group__label'>{label}</h3>
            <ul>{listItems}</ul>
        </>
    );

}

interface Props extends ReturnType<typeof conversationsSelector> {
    selectConversation: typeof changeConversation,
}

const ConversationsListBase = (props: Props) => {
    return (
        <div className="conversations-nav">
            <Group
                label='Rooms'
                items={props.rooms}
                onClick={props.selectConversation}
            />
            <Group
                label='People'
                items={props.people}
                onClick={props.selectConversation}
            />
        </div>
    );
}

const ConversationsList = connect(
    conversationsSelector,
    { selectConversation: changeConversation }
)(ConversationsListBase);
export default ConversationsList;