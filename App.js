"use strict";

import React from "react";
import ReactDOM from "react-dom";

import "./components/App.scss";

import BlockWindowWrap from "./components/BlockWindowWrap";

let SocButtons=require('./src/socButtons.json')

class App extends React.Component {
  state = {
    menuOpen: false,

    SocButtonsArr:SocButtons,
  };


  
  menuIsOpen = () => {
    console.log("click menuIsOpen");
    this.setState({
      menuOpen:!this.state.menuOpen,
    })
  };

  render() {
    console.log(SocButtons)
    return (
      // <BlockWindowWrap/>
      <div>
      <div onClick={this.menuIsOpen} className={this.state.menuOpen ? 'ISocMenuClose':'ISocMenu'}>




      </div>
      <ul>
            {this.state.SocButtonsArr.map(v=>
            <li key={v.code}
              style={{backgroundImage:v.image, position: "absolute", width: 50+"px", height: 50+"px", backgroundSize: 100+"%"}}
            >
              {/* {v.hint} */}
            </li>
            )}
      </ul>
      </div>
    );
  }
}

// export default DragDropContext(HTML5Backend)(App);
export default App;

ReactDOM.render(<App />, document.getElementById("container"));
