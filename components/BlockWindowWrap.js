import React from 'react';
import ReactDOM from 'react-dom';
import Fragment from 'render-fragment';
import PropTypes from 'prop-types';

import ViewChatComponent from './ViewChatComponent';
import ViewRequestCallComponent from "./ViewRequestCallComponent";
import ViewAskQuestionComponent from "./ViewAskQuestionComponent";



import './BlockWindowWrap.scss';

class BlockWindowWrap extends React.Component {

    static propTypes = {
        btn: PropTypes.string, //Имя кнопки компонента
    };

    static defaultProps = {
        btn: "Кнопка"
    }


    state = {
        //состояния ошибок полей с именем, номером
        nameIsEmpty: true,
        numberIsEmpty: true,

        sizeY: 372,
        sizeX: 321,
    }

    WindowButtonStartChat = (EO) => {
        EO.preventDefault();
        let fieldName = ReactDOM.findDOMNode(this.refs.fieldName).value;
        let fieldNumber = ReactDOM.findDOMNode(this.refs.fieldNumber).value;
        console.log("Click start chat------------")
        console.log("fieldName: " + fieldName);
        console.log("fieldNumber: " + fieldNumber);
    }

    //функция проверки полей воода
    onFieldChange = (fieldInput, EO) => {

        if (fieldInput == "nameIsEmpty" && EO.target.value.trim().length > 0 && EO.target.value.trim().length < 20) {
            this.setState({ ["" + fieldInput]: false });
        }
        else if (fieldInput == "numberIsEmpty" && EO.target.value.match(/^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/)) {
            this.setState({ ["" + fieldInput]: false });
        } else {
            this.setState({ ["" + fieldInput]: true });
        }
    }

    myResize = (click) => {
        if(click==="click1"){
            console.log("click1")
            this.setState({
                begin:true,
            })
        }
        if(click==="click2"){
            console.log("click2")
            this.setState({
                begin:false,
            })
        }
    
    
    };


    
    // doResize = (EO) => {
    //     let width = startWidth + EO.clientX - startX;
    //     width < 20 && (width = 20);
    //     let height = startHeight + EO.clientY - startY;
    //     height < 20 && (height = 20);
    //     cropBlock.style.width = width + "px";
    //     cropBlock.style.height = height + "px";
    // }


    mouseMove=(EO)=>{
        //console.log(this.state.begin)
        if(this.state.begin===true){
            
            //console.log(EO.clientX+'|'+EO.clientX)
            // this.setState({
            //     startX:EO.clientX,
            //     startY:EO.clientY,
            // })
            
            let startX=EO.clientX;
            let startY=EO.clientY;


        
        }
    }



    forceMouseUp=()=>{
        console.log('force mouseUp')//this.setstate {begin = false}
    }

    //Объявляем
    componentDidMount() {
        //let { myMouse } = this;//деструктуризация
        window.addEventListener('mouseup', this.forceMouseUp);
        window.addEventListener('mousemove', this.mouseMove);

    }
    //Удаляем
    componentWillUnmount() {
        window.removeEventListener('onmouseup', this.forceMouseUp);
        window.removeEventListener('mousemove',this.mouseMove);

    }

    render() {
        let { btn, code } = this.props;
        return (

            <div style={{ width: this.state.sizeX + "px", height: this.state.sizeY + "px" }} className="BlockWindowWrap">

                <div className="header"></div>

                <div className="main"></div>
                <div className="footer">
                    {/* <button>
                        {btn}
                    </button> */}
                </div>

                <div className="resizeBtn" onMouseDown={() => this.myResize('click1')} onMouseUp={() => this.myResize('click2')} ></div>
            </div>


        )

    }

}

export default BlockWindowWrap;