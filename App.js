"use strict";

import React from 'react';
import ReactDOM from 'react-dom';




import BlockWindowWrap from "./components/BlockWindowWrap";


class App extends React.Component {
  render() {

    return (

      <BlockWindowWrap/>

      )
  }
}

// export default DragDropContext(HTML5Backend)(App);
export default App;

ReactDOM.render(<App />,
  document.getElementById('container')
);
