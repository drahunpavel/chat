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

componentDidMount() {
    console.log("componentDidMount")
    //let { myMouse } = this;
    //this.refs.ChatWindowDisplayMessages.scrollTop=90000;  
    //console.log(this.refs.bla.offsetWidth) // второй способ через ref
    //this.refs.mesList.scrollTo(999999,999999);
    {this.refs.mesList.scrollTo(999999,999999)}


}

    render(){
        return(
            <div className={this.state.dialogueCompleted ? "ChatWindowDisplayMessagesNone" : "ChatWindowDisplayMessages"} 
            ref="mesList"
            >
                <div  >
                    <ul className="message-list">
                        {this.state.messageList.map(v =>
                            <li key={v.code}
                                className="message"
                            >
                                {v.id === "operator" &&
                                    <div className="messageContent" >


                                        {/* <div 
                                    style={{backgroundColor:"#eeeff2",textAlign:"left" }}
                                    className="message-text">
                                    {v.message}
                                </div> */}
                                        <div className="message-author" style={{ backgroundImage: v.image }}></div>
                                        <div className="message-text" style={{ backgroundColor: "#eeeff2", textAlign: "left" }}>{v.message}</div>

                                    </div>
                                }
                                {v.id === "user" &&
                                    <div className="messageContent">
                                        <div className=""></div>
                                        <div
                                            style={{ backgroundColor: "#c3efb3", textAlign: "right" }}
                                            className="message-text">
                                            {v.message}
                                        </div>
                                    </div>
                                }
                            </li>
                        )}
                    </ul>
                </div>

            </div>
    )}

};

export default MessageList;