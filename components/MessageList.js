import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

let allSmilies = require("../src/allSmilies.json");



import './MessageList.scss';
//import './BlockWindowWrap.scss';
//import './ChooseSmiley.scss'

//let messageList=require("../src/messageList.json");

class MessageList extends React.Component {

    static propTypes = {
        //messageList
        //dialogueCompleted
        //sendMessageUpdate
    };
    state = {
        allSmiliesArr: allSmilies,
    }


    cbkeyPressEnter = (EO) => {

        if (EO.keyCode === 13) {
            //console.log(EO.keyCode)

            EO.preventDefault();
            this.props.cbkeyPressEnter()
        }
    }


    messageUpdate = () => {
        if (this.props.sendMessageUpdate) {

            //this.refs.mesList.scrollTo(999999, 999999)
            console.log("Обновление!")
            // this.props.cbClose(this.refs.mesList.scrollTo(999999, 999999));
        }
    }

    transformationMessage = (textMessage) => {

        let out = [];
        for (let i = 0; i < textMessage.length; i++) {

            if (textMessage[i] === ":" && textMessage[i + 5] === ":") {
                let smileyСode = textMessage[i] + textMessage[i + 1] + textMessage[i + 2] + textMessage[i + 3] + textMessage[i + 4] + textMessage[i + 5]
                //console.log(smileyСode)
                this.state.allSmiliesArr.map((v) => {
                    if (smileyСode === v.title) {
                        out.push(<img key={i} className={v.className2}></img>)
                        i += 5;
                    }
                }
                )
            } else {
                out.push(textMessage[i])
            }
        }
        // let reg=textMessage.replace( /[:]{1}[0-9]{2}[a-z]{2}[:]{1}/g )

        return out
    }

    componentDidMount() {
        this.refs.mesList.scrollTo(999999, 999999)
        document.addEventListener('keydown', this.cbkeyPressEnter)
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.cbkeyPressEnter)
    }

    render() {
        //console.log(this.refs.mesList)
        return (
            <div className={this.props.dialogueCompleted ? "ChatWindowDisplayMessagesNone" : "ChatWindowDisplayMessages"}
                 ref="mesList"
            >
                    <ul className="message-list">
                        {this.props.messageList.map(v =>
                            <li key={v.code}
                                className="message"
                                
                            >
                                {v.id === "operator" &&
                                    <div className="messageContent" >
                                        <div className="message-author" style={{ backgroundImage: v.image }}></div>
                                        <div className="message-text" style={{ backgroundColor: "#eeeff2", textAlign: "left" }}>{this.transformationMessage(v.message)}</div>
                                    </div>
                                }
                                {v.id === "user" &&
                                    <div className="messageContent">
                                        <div className=""></div>
                                        <div
                                            style={{ backgroundColor: "#c3efb3", textAlign: "right" }}
                                            className="message-text">
                                            {this.transformationMessage(v.message)}
                                        </div>
                                    </div>
                                }
                            </li>
                        )}
                    </ul>
            </div>
        )
    }

};

export default MessageList;