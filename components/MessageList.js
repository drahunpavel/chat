import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


//import './MessageList.scss';
import './BlockWindowWrap.scss';

//let messageList=require("../src/messageList.json");

class MessageList extends React.Component {

    static propTypes = {
        //messageList
        //dialogueCompleted
        //sendMessageUpdate
    };


    cbkeyPressEnter=(EO)=>{
        
        if(EO.keyCode===13){
            //console.log(EO.keyCode)

            EO.preventDefault();
            this.props.cbkeyPressEnter()
        }
    }


    messageUpdate=()=>{
        if(this.props.sendMessageUpdate){
            
            this.refs.mesList.scrollTo(999999, 999999)
            console.log("Обновление!")
            // this.props.cbClose(this.refs.mesList.scrollTo(999999, 999999));
        }
    }

    componentDidMount() {
        this.refs.mesList.scrollTo(999999, 999999) 
        document.addEventListener('keydown',this.cbkeyPressEnter)
    }
    componentWillUnmount() {
        document.removeEventListener('keydown',this.cbkeyPressEnter)
    }

    render() {
       //console.log(this.refs.mesList)
        return (
            <div  className={this.props.dialogueCompleted ? "ChatWindowDisplayMessagesNone" : "ChatWindowDisplayMessages"}
                ref="mesList"
            >
                <div  >
                    <ul className="message-list">
                        {this.props.messageList.map(v =>
                            <li key={v.code}
                                className="message"
                            >
                                {v.id === "operator" &&
                                    <div className="messageContent" >
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
        )
    }

};

export default MessageList;