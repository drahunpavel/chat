import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Message extends React.Component{
    

    state = {
        allSmiliesArr: this.props.allSmiliesArr,
        messageList:this.props.messageList
    }


    cbkeyPressEnterMes=(EO)=>{
        if (EO.keyCode === 13) {
            //console.log(EO.keyCode)

            EO.preventDefault();
            this.props.cbkeyPressEnter()
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
        this.refs.List.scrollTo(999999, 999999)
        document.addEventListener('keydown', this.cbkeyPressEnterMes)
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.cbkeyPressEnterMes)
    }

render(){
    console.log(this.refs.List)
    return (
        <div >
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
                        <div  className=""></div>
                        <div ref="List"
                            style={{ backgroundColor: "#c3efb3", textAlign: "right" }}
                            className="message-text">
                            {this.transformationMessage(v.message)}
                        </div>
                    </div>
                }
            </li>
        )}
        </div>
        )
}

}
export default Message;