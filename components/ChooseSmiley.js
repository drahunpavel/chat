import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './ChooseSmiley.scss';


let allSmilies = require("../src/allSmilies.json");

class ChooseSmiley extends React.Component {

    static propTypes = {
        // this.props.selectionWindowSmile - true/false - окно открыто\закрыто
        //sendMessageUpdate //состояние true при отправки сообщения
    };

    state = {
        allSmiliesArr: allSmilies,
    }
    //получает ID смайла и передает его родителю
    chooseSmile=(EO)=>{
        if(EO.target.title){
            console.log(EO.target.title)
            let smileID=EO.target.title;
            this.setState({
            },()=>this.props.cbсonvertSmile(smileID))//в родительский компонент попадет уже обновленный setState
        }
    }

    render() {
        return (
            <div
                className={this.props.selectionWindowSmile ? "WindowSmilies" : "WindowSmiliesNone"}
                style={{ backgroundColor: "white" }}
                onClick={(EO)=>{this.chooseSmile(EO)}}>
                {this.state.allSmiliesArr.map(v =>
                    <div className="Emoji_Smile" emoji={v.title} key={v.code}>
                        <div>
                            <i className={v.className} title={v.title}></i>
                        </div>
                    </div>
                )}
            </div>
        )
    }

};
export default ChooseSmiley;
