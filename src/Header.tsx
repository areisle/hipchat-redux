import React from 'react';
import { connect } from 'react-redux';
import { unreadSelector } from './redux/selectors';

const HeaderBase = (props: any) => {
    return (
        <div className="header">
            unread messages: <span className='bubble bubble--notification'>{props.unread}</span>
        </div>
    );
}

const Header = connect(unreadSelector)(HeaderBase);
export default Header;