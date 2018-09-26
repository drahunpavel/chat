"use strict";

import React, { Fragment, Component } from "react";
import ReactDOM from "react-dom";

import "./components/App.scss";

import BlockWindowWrap from "./components/BlockWindowWrap";

let SocButtons = require('./src/socButtons.json')

class App extends React.Component {
  state = {
    menuOpen: false,

    SocButtonsArr: SocButtons,
  };



  menuIsOpen = () => {
    console.log("click menuIsOpen");
    this.setState({
      menuOpen: !this.state.menuOpen,
    })
  };

  render() {
    //размеры окна
    let clientWidth = window.innerWidth;
    let clientHeight = window.innerHeight;

    return (
      <div>
        <BlockWindowWrap
          CallBack
          startLeftChat={clientWidth-420}
          startTopChat={clientHeight-510}
        />
        <BlockWindowWrap
          Mail
          startLeftChat={clientWidth-440}
          startTopChat={clientHeight-480}
        />
        <BlockWindowWrap
          Chat
          startLeftChat={clientWidth-460}
          startTopChat={clientHeight-450}
        />

        <div onClick={this.menuIsOpen} className={this.state.menuOpen ? 'ISocMenuClose' : 'ISocMenu'}>

        </div>

        <div className='SocButtons'>
          {this.state.SocButtonsArr.map(v =>
            <div
              className={this.state.menuOpen ? "menuSelection" : "null"}
              key={v.code}
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
