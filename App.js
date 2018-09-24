"use strict";

import React from "react";
import ReactDOM from "react-dom";

import "./components/App.scss";

import BlockWindowWrap from "./components/BlockWindowWrap";

let SocButtons=require('./src/socButtons.json')

class App extends React.Component {
  state = {
    menuOpen: false
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
      <div onClick={this.menuIsOpen} className={this.state.menuOpen ? 'ISocMenuClose':'ISocMenu'}>


      </div>
    );
  }
}

// export default DragDropContext(HTML5Backend)(App);
export default App;

ReactDOM.render(<App />, document.getElementById("container"));
