"use strict";

import React, { Fragment, Component } from "react";
import ReactDOM from "react-dom";

import "./components/App.scss";

import BlockWindowWrap from "./components/BlockWindowWrap";
import { runInThisContext } from "vm";

let SocButtons = require('./src/socButtons.json')

class App extends React.Component {
  state = {
    //состояние общего меню
    menuOpen: false,

    SocButtonsArr: SocButtons,

    //состояние открытия каждого из окон
    //начальное состояние false=закрыто
    //cht1=CallBack
    //cht2=Mail
    //cht3=Chat
    cht1: false,
    cht2: false,
    cht3: false,

    //счетчик zIndex
    counterZindex: 9000,
  };


  //проверка состояния меню
  menuIsOpen = () => {
    //console.log("click menuIsOpen");
    this.setState({
      menuOpen: !this.state.menuOpen,
    })
  };

  //функция выбранной иконки из меню
  //1=cht1=CallBack
  //2=cht2=Mail
  //3=cht3=Chat
  isSelected = (fieldNumber, EO) => {
    if (fieldNumber === 1) {

      let zzzzz = EO
      console.log(zzzzz)
      this.setState({
        cht1: !this.state.cht1,
      })
    }
    if (fieldNumber === 2) {
      this.setState({
        cht2: !this.state.cht2,
      })
    }
    if (fieldNumber === 3) {
      this.setState({
        cht3: !this.state.cht3,
      })
    }

    this.setState({
      menuOpen: false,
    })
  }

  //функция првоерки закрытого состояния
  //1=cht1=CallBack
  //2=cht2=Mail
  //3=cht3=Chat
  cbCloseStatus = (closedWindow) => {
    if (closedWindow === '1') {
      //console.log('closedWindow '+closedWindow)
      this.setState({
        cht1: !this.state.cht1,
      })
    }
    if (closedWindow === '2') {
      this.setState({
        cht2: !this.state.cht2,
      })
    }
    if (closedWindow === '3') {
      this.setState({
        cht3: !this.state.cht3,
      })
    }
  }
  //функция изменения Z-index
  cbZindex = (clickOnWindow) => {
    if (clickOnWindow) {
      this.setState({
        counterZindex: this.state.counterZindex + 1,
      })
    }
  }


  render() {
    //размеры окна
    let clientWidth = window.innerWidth;
    let clientHeight = window.innerHeight;
    // console.log(this.state.cht1)

    return (
      <div>

        {/* CallBack-заказать звонок */}
        <BlockWindowWrap
          CallBack
          isCallBack={this.state.cht1}
          cbClose={this.cbCloseStatus}

          cbchangeZIndex={this.cbZindex}
          counterZindex={this.state.counterZindex + 1}

          //startLeftChat, startTopChat - координаты стартового расположения полей
          startLeftChat={clientWidth - 420}
          startTopChat={clientHeight - 510}
        // startLeftChat={0}
        // startTopChat={0}
        />

        {/* Mail-ответить email */}
        <BlockWindowWrap
          Mail
          isMail={this.state.cht2}
          cbClose={this.cbCloseStatus}

          cbchangeZIndex={this.cbZindex}
          counterZindex={this.state.counterZindex + 1}

          startLeftChat={clientWidth - 440}
          startTopChat={clientHeight - 480}
        />

        {/* Chat-чат с оператором */}
        <BlockWindowWrap
          Chat
          isChat={this.state.cht3}
          cbClose={this.cbCloseStatus}

          cbchangeZIndex={this.cbZindex}
          counterZindex={this.state.counterZindex + 1}

          startLeftChat={clientWidth - 460}
          startTopChat={clientHeight - 450}
        />

        <a>

        </a>

        <div onClick={this.menuIsOpen} className={this.state.menuOpen ? 'ISocMenuClose' : 'ISocMenu'}>
        </div>

        {/*Перебор с подготовленного JSON всех элементов меню с иконками*/}
        <div className='SocButtons'>
          {this.state.SocButtonsArr.map(v =>
            <div key={v.code}>
              {/* Ниже выборка всех элементов без ссылок */}
              {v.way === '' &&

                <div
                  className={this.state.menuOpen ? "menuSelection" : "null"}
                  onClick={() => this.isSelected(v.code, v.hint)}//передача в isSelected номера выбранного элемента
                  data-product-id={v.code}
                  data-tooltip={v.hint}
                  style={{ backgroundImage: v.image }}
                >
                  <div className={this.state.menuOpen ? 'tooltip' : 'tooltip-none'}>{v.hint}</div>
                </div>

              }
              {/* Ниже выборка всех элементов с ссылками */}
              {v.way != '' &&
                <a target="_blank" href={v.way}>
                  <div
                    className={this.state.menuOpen ? "menuSelection" : "null"}
                    onClick={() => this.isSelected(v.code)}//передача в isSelected номера выбранного элемента
                    data-product-id={v.code}
                    data-tooltip={v.hint}
                    style={{ backgroundImage: v.image }}
                  >
                    <div className={this.state.menuOpen ? 'tooltip' : 'tooltip-none'}>{v.hint}</div>
                  </div>
                </a>
              }
            </div>
          )}

        </div>
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("container"));
