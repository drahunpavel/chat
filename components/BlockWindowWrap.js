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
        btn: "Кнопка",
        title: "Название окна",
        welcome: "Приветствие"
    }


    state = {
        //состояния ошибок полей с именем, номером
        nameIsEmpty: true,
        numberIsEmpty: true,

        sizeY: 372,
        sizeX: 321,

        zindex: 1,//z-index выбранного окна
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
        if (click === "click1") {
            console.log("click1")

            this.setState({
                begin: true,
            })
        }
        if (click === "click2") {
            console.log("click2")
            this.setState({
                begin: false,
                isStarted: false
            })
        }
    };

    myResize2 = (click) => {
        if (click === "click1") {
            console.log("click1")

            this.setState({
                begin: true,
            })
        }
        if (click === "click2") {
            console.log("click2")
            this.setState({
                begin: false,
                isStarted: false
            })
        }
    };



    mouseMove = (EO) => {

        if (this.state.begin === true) {

            //создаем стартовую точку
            if (!this.state.isStarted) {

                this.setState({
                    startX: EO.clientX,
                    startY: EO.clientY,

                    startWidth: this.BlockWindowWrap.offsetWidth,
                    startHeight: this.BlockWindowWrap.offsetHeight,

                    startTop: this.BlockWindowWrap.offsetTop,
                    startLeft: this.BlockWindowWrap.offsetLeft,

                    isStarted: true
                })
            }



            let deltaX = EO.clientX - this.state.startX;
            let deltaY = EO.clientY - this.state.startY;

            console.log("Начальные ширина/высота: " + this.state.startWidth + ":" + this.state.startHeight);
            console.log("---------------");

            console.log("дельта смещения: " + deltaX + ":" + deltaY);
            console.log("---------------");

            let width = this.state.startWidth + deltaX;
            (width < 300 && (width = 300)) || (width > 800 && (width = 800)); //max size width
            let height = this.state.startHeight + deltaY;
            (height < 300 && (height = 300)) || (height > 627 && (height = 627));//max size height
            console.log("реальное изменение размера " + width + ":" + height);
            console.log("---------------");


            let left = this.state.startLeft + deltaX;
            let top = this.state.startTop + deltaY;



            this.setState({

                sizeX: width,
                sizeY: height,
                locationX: left,
                locationY: top,
            })

        }
    }



    forceMouseUp = () => {
        console.log('force mouseUp')//this.setstate {begin = false}
        this.setState({
            begin: false,
        })
    }

    //Объявляем
    componentDidMount() {
        //let { myMouse } = this;

        //console.log(this.refs.bla.offsetWidth) // второй способ через ref
        window.addEventListener('mousedown', this.onMouseDown);
        window.addEventListener('mouseup', this.forceMouseUp);
        window.addEventListener('mousemove', this.mouseMove);

    }
    //Удаляем
    componentWillUnmount() {
        window.removeEventListener('mousedown', this.onMouseDown);
        window.removeEventListener('onmouseup', this.forceMouseUp);
        window.removeEventListener('mousemove', this.mouseMove);

    }

    render() {
        let { btn, title, welcome } = this.props;//деструктуризация
        //console.log("startX/startY: "+ this.state.startX+"/"+this.state.startY)

        return (

            <div

                style={{ width: this.state.sizeX + "px", height: this.state.sizeY + "px" }}
                className="BlockWindowWrap"
                ref={BlockWindowWrap => { this.BlockWindowWrap = BlockWindowWrap }}
            //ref="bla" //второй способ через ref
            >

                <div className="header">
                    {title}
                </div>

                <div className="main"></div>
                {welcome}
                <div className="footer">
                    <button className="buttom">
                        {btn}
                    </button>
                </div>

                <div className="resizeBtnBR" onMouseDown={() => this.myResize('click1')} onMouseUp={() => this.myResize('click2')} ></div>
                <div className="" onMouseDown={() => this.myResize('click1')} onMouseUp={() => this.myResize('click2')} ></div>
            </div>


        )

    }

}

export default BlockWindowWrap;