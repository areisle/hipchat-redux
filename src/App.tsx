import React from 'react';
import Header from './Header';
import ConversationsList from './ConversationsList';
import Conversation from './Conversation';
import './App.css';

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Header />
                <ConversationsList />
                <Conversation />
            </div>
        );
    }
}

export default App;
