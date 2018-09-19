"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import Fragment from 'render-fragment';

import ViewChatComponent from './components/ViewChatComponent';
import ViewRequestCallComponent from "./components/ViewRequestCallComponent";
import ViewAskQuestionComponent from "./components/ViewAskQuestionComponent";

class App extends React.Component {
  render() {

    return (
      <Fragment>
      <ViewChatComponent />
      {/* <ViewRequestCallComponent/>
      <ViewAskQuestionComponent/> */}
      </Fragment>
      )
  }
}

// export default DragDropContext(HTML5Backend)(App);
export default App;

ReactDOM.render(<App />,
  document.getElementById('container')
);
