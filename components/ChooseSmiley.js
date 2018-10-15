import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './ChooseSmiley.scss';
//import './BlockWindowWrap.scss';

let allSmilies = require("../src/allSmilies.json");

class ChooseSmiley extends React.Component {

    static propTypes = {
        // this.props.selectionWindowSmile - true/false - окно открыто\закрыто
    };

    state={
        allSmiliesArr:allSmilies,
    }

    render() {
        return (
            <div
            className={this.props.selectionWindowSmile ? "WindowSmilies" : "WindowSmiliesNone"}
                style={{ backgroundColor: "white" }}>

            {this.state.allSmiliesArr.map(v=>
                <div key={v.code}
                    className={v.className}
                    title={v.title}
                >

                </div>
            )}

            </div>
        )
    }

};
export default ChooseSmiley;
