"use strict";

import React, { Fragment, Component } from "react";
import ReactDOM from "react-dom";

import "./components/App.scss";

import BlockWindowWrap from "./components/BlockWindowWrap";

let SocButtons = require('./src/socButtons.json')

class App extends React.Component {
  state = {
    //состояние общего меню
    menuOpen: false,

    SocButtonsArr: SocButtons,
  };


  //проверка состояния меню
  menuIsOpen = () => {
    console.log("click menuIsOpen");
    this.setState({
      menuOpen: !this.state.menuOpen,
    })
  };

  isSelected=(EO)=>{
    this.state.SocButtonsArr.map(v=>{
      if(v.code == EO.currentTarget.getAttribute("data-product-id"))
      return v;
    })
    console.log(EO.currentTarget.getAttribute("data-product-id"))
  }

  render() {
    //размеры окна
    let clientWidth = window.innerWidth;
    let clientHeight = window.innerHeight;

    return (
      <div>
        {/* CallBack-заказать звонок */}
        <BlockWindowWrap
          CallBack
          //startLeftChat, startTopChat - координаты стартового расположения полей
          startLeftChat={clientWidth-420}
          startTopChat={clientHeight-510}
        />
        {/* Mail-ответить email */}
        <BlockWindowWrap
          Mail
          startLeftChat={clientWidth-440}
          startTopChat={clientHeight-480}
        />
        {/* Chat-чат с оператором */}
        <BlockWindowWrap
          Chat
          startLeftChat={clientWidth-460}
          startTopChat={clientHeight-450}
        />

        <div onClick={this.menuIsOpen} className={this.state.menuOpen ? 'ISocMenuClose' : 'ISocMenu'}>
        </div>
        
        {/*Перебор с подготовленного JSON всех элементов меню с иконками*/}
        <div className='SocButtons'>
          {this.state.SocButtonsArr.map(v =>
            <div
              className={this.state.menuOpen ? "menuSelection" : "null"}
              onClick={this.isSelected}
              key={v.code}
              data-product-id={v.code}
              style={{ backgroundImage: v.image }}
            >



            </div>
          )}

        </div>
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("container"));
