import React from 'react';
import ReactDOM from "react-dom";
//import PropTypes from 'prop-types';

import './styleComponents.css';

// import { DragSource ,DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';

import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time


class ViewRequestCallComponent extends React.Component {

  static propTypes = {

  };
  state = {
    //состояния ошибок полей с именем, номером
    nameIsEmpty: true,
    numberIsEmpty: true,

    zindex: "",
  }

  WindowButtonStartChat = (EO) => {
    EO.preventDefault();
    let fieldName = ReactDOM.findDOMNode(this.refs.fieldName).value;
    let fieldNumber = ReactDOM.findDOMNode(this.refs.fieldNumber).value;
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

  handleChange = (EO) => {
    console.log("X: " + EO.pageX + " Y: " + EO.pageY);
    console.log("--------------------------");

    let startX = EO.pageX;
    let startY = EO.pageY;

    let cropBlock = document.getElementById('Window');
    let startWidth = cropBlock.offsetWidth;
    let startHeight = cropBlock.offsetHeight;

    console.log(".offsetWidth: " + startWidth);
    console.log(".offsetHeight: " + startHeight);
    console.log("--------------------------");

    console.log("WindowX: " + screen.width)
    console.log("WindowY: " + screen.height)
    console.log("--------------------------");

    console.log("browser windowX: " + document.body.clientWidth);
    console.log("browser windowY: " + document.body.clientHeight);
    console.log("--------------------------");




    let left = startWidth + EO.pageX - screen.width;
    console.log(left)
    // left < 0 && (left=0);
    // left + cropBlock.offsetWidth > border.offsetLeft + border.offsetWidth  && (left = border.offsetLeft + border.offsetWidth - cropBlock.offsetWidth - 8);
    // let top =  startTop + e.clientY - startY;
    // top < 0 && (top=0);
    // top + cropBlock.offsetHeight > border.offsetTop + border.offsetHeight  && (top = border.offsetTop + border.offsetHeight - cropBlock.offsetHeight - 8);
    // cropBlock.style.top = top + 'px';
    // cropBlock.style.left = left  + 'px';
    // cropBlock.style.backgroundPosition = '-' + cropBlock.style.left + ' -' + cropBlock.style.top






    var box = EO.target.getBoundingClientRect();

    console.log(box)

  }

  // Bounds=(params)=> {
  //   let dd=params.dd;
  //   let bounds = params.bounds;
  //   let bb=document.getElementById(bounds).getBoundingClientRect();
  //   let target = document.getElementById(params.target).getBoundingClientRect();
  //   let partQ = (params.partQ === undefined) ? .5: params.partQ ;
  //   let left = (params.left === undefined) ? -target.width * partQ : params.left;
  //   let top = (params.top === undefined) ? -target.height * partQ : params.top;
  //   let offsetRight = (params.offsetRight === undefined) ? -target.width * partQ : params.offsetRight;
  //   let offsetBottom = (params.offsetBottom === undefined) ? -target.height * partQ : params.offsetBottom;

  //   console.log(partQ)
  //   dd.applyBounds({
  //     top: top,
  //     left: left,
  //     width: bb.width - offsetRight - left,
  //     height: bb.height - offsetBottom - top
  //   });

  // };


  render() {

    let nameIsEmpty = this.state.nameIsEmpty,
      numberIsEmpty = this.state.numberIsEmpty;

    //         const window=document.getElementById('WindowHeadDrag');
    // console.log(window)
    //const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    return (
      <Draggable
        handle="#DndWindow"

      //  bounds="parent"
      >
        <div id="Window" className="Window">
          <div id="DndWindow" className="cursor" onMouseDown={this.handleChange}>
            <div className="WindowHead">Заказать звонок</div>
            {/* <div className="WindowClose">-dddddddddddddddddd</div> */}
          </div>

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

          <div className="WindowFieldLabel">Ваш телефон:
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

          <div className="WindowFieldLabel">Тема обращения:
          <div className="WindowFieldControlFrame">
              {/* <input
                className="WindowFieldEdit"
                type="text" /> */}
              <select
              className="WindowFieldEdit">
                <option value="volvo">Депозиты</option>
                <option value="saab">Кредитование юридических лиц</option>
                <option value="vw">Кредитование</option>
                <option value="audi">Услуги БПС Сбербанка</option>
              </select>
            </div>
          </div>

          <div className="WindowFieldLabel">Укажите удобное время звонка
          <div className="WindowFieldControlFrame">
              {/* <input 
              className="WindowFieldEdit"
              type="text"/> */}
              <select
              className="WindowFieldEdit">
                <option value="volvo">С 9:00 до 10:00</option>
                <option value="saab">С 11:00 до 12:00</option>
                <option value="vw">С 12:00 до 13:00</option>
                <option value="audi">С 13:00 до 14:00</option>
              </select>
            </div>
          </div>

          <div className="WindowFieldLabel">График работы контакт-центра:&nbsp;<strong className="strong-style">Круглосуточно</strong>
          </div>

          <div className="WindowFieldButton">
            <div className="WindowButton-call">
              <button
                className="WindowFormSendingButton"
                onClick={this.WindowButtonStartChat}
                disabled={nameIsEmpty || numberIsEmpty}
              >
                Начать чат
            </button>
            </div>
          </div>

          <div className="modification-right"></div>
          <div className="modification-left"></div>

        </div>
      </Draggable>


    )

  }

}

export default ViewRequestCallComponent;
//export default ViewChatComponent;
