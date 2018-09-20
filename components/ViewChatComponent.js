﻿import React from 'react';
import ReactDOM from "react-dom";
//import PropTypes from 'prop-types';

import './styleComponents.scss';

// import { DragSource ,DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';

import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time


class ViewChatComponent extends React.Component {

  static propTypes = {

  };
  state = {
    //состояния ошибок полей с именем, номером
    nameIsEmpty: true,
    numberIsEmpty: true,

    sizeY:372,
    sizeX:321,
  }

  WindowButtonStartChat = (EO) => {
    EO.preventDefault();
    let fieldName = ReactDOM.findDOMNode(this.refs.fieldName).value;
    let fieldNumber = ReactDOM.findDOMNode(this.refs.fieldNumber).value;
    console.log("Click start chat------------")
    console.log("fieldName: " + fieldName);
    console.log("fieldNumber: " + fieldNumber);
  }

  //функция проверки полей воода
  onFieldChange = (fieldInput, EO) => {

    if (fieldInput=="nameIsEmpty" && EO.target.value.trim().length > 0 && EO.target.value.trim().length < 20) {
      this.setState({ ["" + fieldInput]: false });
    }
    else if(fieldInput=="numberIsEmpty" && EO.target.value.match(/^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/) ){
      this.setState({ ["" + fieldInput]: false });
    } else {
      this.setState({ ["" + fieldInput]: true });
    }
  }

  myMouse=(EO)=>{
    //console.log(EO)






    let startX = EO.clientX;
    let startY = EO.clientY;
    console.log("clickpoint: " + startX + "*" +startY )
    console.log("--------------------------");
    this.setState({
      sizeX:this.state.startWidth,
      sizeY:this.state.startHeight,
    })
  }


  doResize=(EO)=> {
      let width = startWidth + EO.clientX - startX;
      width < 20 && (width = 20);
      let height = startHeight + EO.clientY - startY;
      height < 20 && (height = 20);
      cropBlock.style.width = width + "px";
      cropBlock.style.height = height + "px";
  }
  


  //Объявляем
  componentDidMount() {
    let {myMouse} = this;//деструктуризация
    window.addEventListener('mousedown', ()=>myMouse('down'));
    //window.addEventListener('mousemove', ()=>myMouse('move'));
    window.addEventListener('mouseup', ()=>myMouse('up'));
   }
 //Удаляем
   componentWillUnmount() {
    window.removeEventListener('mousedown',this.myMouse);
    //window.removeEventListener('mousemove',this.myMouse);
    window.removeEventListener('mouseup', this.myMouse);
   }

  render() {

    let nameIsEmpty = this.state.nameIsEmpty,
      numberIsEmpty = this.state.numberIsEmpty;

    return (

        <div style={{width:this.state.sizeX+"px", height:this.state.sizeY+"px"}} className="Window">
          <div  id="DndWindow" className="cursor">
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
                onChange={this.onFieldChange.bind(this, "nameIsEmpty")} />
            </div>
            <div className={this.state.nameIsEmpty ? "WindowFieldError" : "WindowFieldError-display-none"}>Введите свое имя</div>
          </div>

          <div className="WindowFieldLabel">Номер телефона:
          <div className="WindowFieldControlFrame">
              <input
                className="WindowFieldEdit"
                type="text"

                ref="fieldNumber"
                onChange={this.onFieldChange.bind(this, "numberIsEmpty")} />
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
              disabled={nameIsEmpty || numberIsEmpty}
            >
              Начать чат
            </button>
          </div>


          <div className="resizeBtn"  onClick={this.myMouse} ></div>
          <div className="ResizeBtn-Left" id="ResizeBtnLeft" onClick={this.initResizeL}></div>

        </div>


    )

  }

}

export default ViewChatComponent;
