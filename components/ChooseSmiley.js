import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './ChooseSmiley.scss';

class ChooseSmiley extends React.Component {

    render() {
        return (
            <div
                className={this.props.selectionWindowSmile ? "WindowSmilies" : "WindowSmiliesNone"}
                style={{ backgroundColor: "white" }}>
            </div>
        )
    }

};
export default ChooseSmiley
