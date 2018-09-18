import React from 'react';
import ReactDOM from "react-dom";
//import PropTypes from 'prop-types';

import './ViewChatComponent.css';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class ViewChatComponent extends React.Component {

  static propTypes = {

  };
  state={
    //состояния ошибок полей с именем, номером
    nameIsEmpty: true,
    numberIsEmpty: true,
  

  }

  WindowButtonStartChat=(EO)=>{
    EO.preventDefault();
    let fieldName=ReactDOM.findDOMNode(this.refs.fieldName).value;
    let fieldNumber=ReactDOM.findDOMNode(this.refs.fieldNumber).value;
    console.log("Click start chat------------")
    console.log("fieldName: " + fieldName);
    console.log("fieldNumber: " + fieldNumber);
  }

//функция проверки полей на отсутствие введеных символов  
  onFieldChange = (fieldInput, EO) => {
    if (EO.target.value.trim().length > 0) {
        this.setState({ ["" + fieldInput]: false });
    } else {
        this.setState({ ["" + fieldInput]: true });
    }
}

handleChange=(EO)=>{
  console.log(EO.pageX)
  let shiftX=EO.pageX;
  let shiftY=EO.pageY;
  
  var box = EO.target.getBoundingClientRect();

  console.log(box)

}



  render() {
    let nameIsEmpty=this.state.nameIsEmpty,
        numberIsEmpty=this.state.numberIsEmpty;

//         const window=document.getElementById('WindowHeadDrag');
// console.log(window)

    return (
      <div className="Window">
        <div id="WindowHeadDrag" onMouseDown={this.handleChange}>
          <div className="WindowHead">Чат с банком</div>
          {/* <div className="WindowClose">-dddddddddddddddddd</div> */}
        </div>
        <div className="WindowWelcome">Вас приветствует БПС-Сбербанк. Задайте интересующий вопрос.</div>
        
        <div className="WindowFieldLabel">Ваше имя:
          <div className="WindowFieldControlFrame">
            <input 
              className="WindowFieldEdit"
              type="text" 
              ref="fieldName"
              onChange={this.onFieldChange.bind(this, "nameIsEmpty")}/>
          </div>
          <div className={this.state.nameIsEmpty ? "WindowFieldError" : "WindowFieldError-display-none"}>Введите свое имя</div>
        </div>
        
        <div className="WindowFieldLabel">Номер телефона:
          <div className="WindowFieldControlFrame">
            <input 
              className="WindowFieldEdit"
              type="text"
               
              ref="fieldNumber"
              onChange={this.onFieldChange.bind(this, "numberIsEmpty")}/>
          </div>
          <div 
            className={this.state.numberIsEmpty ? "WindowFieldError" : "WindowFieldError-display-none"}>
              Введите номер телефона
          </div>
        </div>
        
        <div className="WindowFieldButton">
          <div className="WindowButton">
            <button 
              className="WindowFormSendingButton"
              onClick={this.WindowButtonStartChat}
              disabled={nameIsEmpty||numberIsEmpty}
            >
                Начать чат
            </button>
          </div>
        </div>
      
      <div className="modification-right"></div>
      <div className="modification-left"></div>

      </div>
    )

  }

}

export default DragDropContext(HTML5Backend)(ViewChatComponent);
//export default ViewChatComponent;
