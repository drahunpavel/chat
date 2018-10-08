import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


//import './MessageList.scss';
import './BlockWindowWrap.scss';

let messageList=require("../src/messageList.json");

class MessageList extends React.Component{

state={
    messageList:messageList,
};

    render(){
        return(
            <div className={this.state.dialogueCompleted ? "ChatWindowDisplayMessagesNone" : "ChatWindowDisplayMessages"}>
                <div>
                    {this.state.messageList.map(v=>
                        <div key={v.code}
                        >
                            <p>{v.message}</p>
                        </div>
                        )}
                </div>
                {/* Сообщение 1
                <br />
                Сообщение 2
                <br />
                Сообщение 3
                <br />
                Сообщение 4
                <br />
                Сообщение 5 */}
            </div>
    )}

};

export default MessageList;