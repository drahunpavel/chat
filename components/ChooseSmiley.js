import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './ChooseSmiley.scss';
//import './BlockWindowWrap.scss';

let allSmilies = require("../src/allSmilies.json");

class ChooseSmiley extends React.Component {

    static propTypes = {
        // this.props.selectionWindowSmile - true/false - окно открыто\закрыто
        //sendMessageUpdate //состояние true при отправки сообщения
    };

    state = {
        allSmiliesArr: allSmilies,
        smileArr:[]
    }

    chooseSmile=(smileTitle)=>{
        //console.log(smileTitle)
        //let newSmile=smileTitle;
        //let addSmile=this.state.smileArr.concat(newSmile)
        this.setState({
            //smileArr: addSmile,
        },()=>this.props.cbсonvertSmile(smileTitle))//в родительский компонент попадет уже обновленный setState

        // if(this.props.sendMessageUpdate){
        //     this.setState({
        //         smileArr:[]
        //     })
        // }
    }



    render() {
        // console.log(this.props.sendMessageUpdate)
        return (
            <div
                className={this.props.selectionWindowSmile ? "WindowSmilies" : "WindowSmiliesNone"}
                style={{ backgroundColor: "white" }}>
                {this.state.allSmiliesArr.map(v =>
                    <div key={v.code}
                        className={v.className}
                        title={v.title}
                        onClick={()=>this.chooseSmile(v.title)}
                    >
                    </div>
                )}
            </div>
        )
    }

};
export default ChooseSmiley;
