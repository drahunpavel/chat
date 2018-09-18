﻿import React from 'react';
import ReactDOM from "react-dom";
//import PropTypes from 'prop-types';

import './styleComponents.css';

// import { DragSource ,DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';

import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time


class ViewChatComponent extends React.Component {

  static propTypes = {

  };
  state={
    //состояния ошибок полей с именем, номером
    nameIsEmpty: true,
    numberIsEmpty: true,
  
    zindex:"",
  }

  initResizeR=(EO)=>{
    EO.preventDefault();

    console.log("init resize right------------")

    let ResizeBtnRight = document.getElementById('ResizeBtnRight');
    let border = document.getElementById('wrapper');

  };
  initResizeL=(EO)=>{
    EO.preventDefault();

    console.log("init resize left------------")


  };

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
  console.log("X: "+EO.pageX +" Y: "+ EO.pageY);
  console.log("--------------------------");

  let startX=EO.pageX;
  let startY=EO.pageY;
  
  let cropBlock = document.getElementById('Window');
  let startWidth = cropBlock.offsetWidth;
  let startHeight = cropBlock.offsetHeight;

  console.log(".offsetWidth: "+startWidth);
  console.log(".offsetHeight: "+startHeight);
  console.log("--------------------------");
  
  console.log("WindowX: " +screen.width)
  console.log("WindowY: " +screen.height)
  console.log("--------------------------");

  console.log("browser windowX: "+document.body.clientWidth);
  console.log("browser windowY: "+ document.body.clientHeight);
  console.log("--------------------------");




  let left = startWidth + EO.pageX - screen.width;
  console.log(left)


  var box = EO.target.getBoundingClientRect();

  console.log(box)

}


  render() {

    let nameIsEmpty=this.state.nameIsEmpty,
        numberIsEmpty=this.state.numberIsEmpty;

//         const window=document.getElementById('WindowHeadDrag');
// console.log(window)
//const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    return (
      <Draggable 
       handle="#DndWindow" 
       
      //  bounds="parent"
      >
      <div id="Window" className="Window">
        <div id="DndWindow" className="cursor"  onMouseDown={this.handleChange}>
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
        
        
          <div className="WindowButton-chat">
            <button 
              className="WindowFormSendingButton"
              onClick={this.WindowButtonStartChat}
              disabled={nameIsEmpty||numberIsEmpty}
            >
                Начать чат
            </button>
          </div>
        
      
      <div className="ResizeBtn-Right" id="ResizeBtnRight" onClick={this.initResizeR}></div>
      <div className="ResizeBtn-Left" id="ResizeBtnLeft" onClick={this.initResizeL}></div>

      </div>
      </Draggable>

    )

  }

}

export default ViewChatComponent;

