import React from 'react';
import ReactDOM from "react-dom";
//import PropTypes from 'prop-types';

import './styleComponents.scss';

// import { DragSource ,DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';

import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time


class ViewAskQuestionComponent extends React.Component {

  static propTypes = {

  };
  state={
    //состояния ошибок полей с именем, номером
    nameIsEmpty: true,
    numberIsEmpty: true,
  
    zindex:"",
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

  render() {

    let nameIsEmpty=this.state.nameIsEmpty,
        numberIsEmpty=this.state.numberIsEmpty;

    return (
      <Draggable 
       handle="#DndWindow" 
       
      //  bounds="parent"
      >
      <div id="Window" className="Window">
        <div id="DndWindow" className="cursor"  onMouseDown={this.handleChange}>
          <div className="WindowHead">Задать вопрос</div>
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
        
        <div className="WindowFieldLabel">Ваш E-mail:
          <div className="WindowFieldControlFrame">
            <input 
              className="WindowFieldEdit"
              type="text"
               
              ref="fieldNumber"
              onChange={this.onFieldChange.bind(this, "numberIsEmpty")}/>
          </div>
          <div 
            className={this.state.numberIsEmpty ? "WindowFieldError" : "WindowFieldError-display-none"}>
              Введите Ваш E-mail
          </div>
        </div>

        <div className="WindowFieldLabel">Вопрос:
          <div className="WindowFieldControlFrame">
            <textarea 
              className="WindowFieldEdit WindowFieldEdit-textarea"
              name="text"
              rows="4"
              ref="fieldNumber"
              onChange={this.onFieldChange.bind(this, "numberIsEmpty")}/>
          </div>
          <div 
            className={this.state.numberIsEmpty ? "WindowFieldError" : "WindowFieldError-display-none"}>
              Введите Ваш вопрос
          </div>
        </div>


          <div className="WindowButton-ask">
            <button 
              className="WindowFormSendingButton"
              onClick={this.WindowButtonStartChat}
              disabled={nameIsEmpty||numberIsEmpty}
            >
                Свяжитесь со мной
            </button>
          </div>

      
      <div className="modification-right"></div>
      <div className="modification-left"></div>

      </div>
      </Draggable>
    )

  }

}

export default ViewAskQuestionComponent;
//export default ViewChatComponent;
