import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { activeConversationSelector } from './redux/selectors';
import { sendMessage } from './redux/actions';
const uuid = require('uuid/v1');

const Message = ({ content, name, createdAt, active }) => {
    return (
        <li className={`message ${active ? 'message--active-user' : ''}`}>
            <div className='message__avatar'>
                <span className='bubble bubble--avatar'></span>
            </div>
            <div className='message__header'>
                <h6>{name}</h6>
                <time>{createdAt.toUTCString()}</time>
            </div>
            <p className='message__content'>{content}</p>
        </li>
    );
}

const Participant = ({ name }) => {
    return (
        <li>{name}</li>
    );
}

const ConversationBase = (props) => {

    const [inputValue, setInputValue] = useState('');
    const messagesEnd = useRef(null);

    const { people, messages, uuid: conversationId } = props;

    const messagesList = messages.map((message) => (
        <Message key={message.uuid} {...message} />
    ));

    const participants = people.map((person) => (
        <Participant key={person.uuid} {...person} />
    ));

    const scrollToBottom = () => {
        if (messagesEnd) {
            // @ts-ignore
            messagesEnd.current.scrollIntoView();
        }
    }

    useEffect(() => {
        scrollToBottom();
    }, [messagesEnd, conversationId, messages])

    const handleEnter = ({ keyCode }) => {
        if (keyCode === 13) {

            props.sendMessage(inputValue, uuid(), new Date())
            setInputValue('');
        }
    }

    return (
        <div className="conversation">
            <div className="conversation__header"></div>
            <ul
                className='conversation__messages'
            >
                {messagesList}
                {!messagesList.length && (
                    <Message
                        name='System'
                        content='no messages to display'
                        createdAt={new Date()}
                        active={false}
                    />
                )}
                <div ref={messagesEnd} />
            </ul>
            <ul className='conversation__participants'>{participants}</ul>
            <textarea
                rows={5}
                className='conversation__input'
                onChange={({ target: { value } }) => setInputValue(value)}
                onKeyDown={handleEnter}
                value={inputValue}
            />
        </div>
    );
}

const Conversation = connect(
    activeConversationSelector,
    { sendMessage }
)(ConversationBase)
export default Conversation;