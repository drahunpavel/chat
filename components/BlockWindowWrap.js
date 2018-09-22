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

        sizeY: 372, //начальные размеры окна
        sizeX: 321, 

        zindex: 9000,//z-index выбранного окна
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

    //Функция отслеживания кликов
    myResize = (click) => {
        if (click === "click1") {
            console.log("click1 mouseDown Resize")
            this.setState({
                beginResize: true,
            })
        };
        if (click === "click2") {
            console.log("click2 mouseUp Resize")
            this.setState({
                beginResize: false,
                isStartedResize: false
            })
        };
        if (click === "click3") {
            console.log("click3 mouseDown Drop")
            this.setState({
                beginDrop: true,
            })
        };
        if (click === "click4") {
            console.log("click4 mouseUp Drop")
            this.setState({
                beginDrop: false,
                isStartedDrop: false,
            })
        };
        if (click === "click5") {
            console.log("click5 mouseDown ResizeLeft")
            this.setState({
                beginResizeLeft: true,
            })
        };
        if (click === "click6") {
            console.log("click6 mouseUp ResizeLeft")
            this.setState({
                beginResize: false,
                beginResizeLeft: false
            })
        };
    };

    //функция измененения Z-index
    changeZIndex = (index) => {
        if (index === 'click') {
            console.log('click')
            this.setState({
                zindex: this.state.zindex + 1,
            })
        };
    };



    mouseMove = (EO) => {
        //стартовая точка для resize
        if (this.state.beginResize === true) {

            //создаем точку для хранения стартовых данных
            if (!this.state.isStartedResize) {

                this.setState({
                    //Стартовые координаты
                    startX: EO.clientX,
                    startY: EO.clientY,

                    //начальный размер элемента
                    startWidth: this.BlockWindowWrap.offsetWidth,   
                    startHeight: this.BlockWindowWrap.offsetHeight,

                    startTop: this.BlockWindowWrap.offsetTop,
                    startLeft: this.BlockWindowWrap.offsetLeft,

                    isStartedResize: true
                })
            }

            //дельта: актуальные значения - стартовые
            let deltaX = EO.clientX - this.state.startX;
            let deltaY = EO.clientY - this.state.startY;

            let delta2X = this.state.startX - EO.clientX;
            let delta2Y = this.state.startY- EO.clientY;

            // console.log("Старт координаты: " + this.state.startX + ":" + this.state.startY);         
            // console.log("Актуальные координаты: " + EO.clientX + ":" + EO.clientY);  
            // console.log("Начальные ширина/высота: " + this.state.startWidth + ":" + this.state.startHeight);
            // console.log("---------------");

            // console.log("дельта смещения: " + deltaX + ":" + deltaY);
            // console.log("---------------");

            //new coordinates when resizing + limitation
            let width = this.state.startWidth + deltaX;
            (width < 300 && (width = 300)) || (width > 500 && (width = 500)); //max size width
            let height = this.state.startHeight + deltaY;
            (height < 300 && (height = 300)) || (height > 427 && (height = 427));//max size height
            console.log("реальное изменение размера " + width + ":" + height);

            this.setState({
                //запись в стейт нового размера блока
                sizeX: width,   
                sizeY: height,
            })

        };

//ResizeLeft
        if (this.state.beginResizeLeft === true) {

            //создаем точку для хранения стартовых данных
            if (!this.state.isStartedResizeLeft) {

                this.setState({
                    //Стартовые координаты
                    startX: EO.clientX,
                    startY: EO.clientY,

                    //начальный размер элемента
                    startWidth: this.BlockWindowWrap.offsetWidth,   
                    startHeight: this.BlockWindowWrap.offsetHeight,

                    startTop: this.BlockWindowWrap.offsetTop,
                    startLeft: this.BlockWindowWrap.offsetLeft,

                    isStartedResize: true
                })
            }

            //дельта: актуальные значения - стартовые
            let deltaX = EO.clientX - this.state.startX;
            let deltaY = EO.clientY - this.state.startY;

            let delta2X = this.state.startX - EO.clientX;
            let delta2Y = this.state.startY- EO.clientY;

            // console.log("Старт координаты: " + this.state.startX + ":" + this.state.startY);         
            // console.log("Актуальные координаты: " + EO.clientX + ":" + EO.clientY);  
            // console.log("Начальные ширина/высота: " + this.state.startWidth + ":" + this.state.startHeight);
            // console.log("---------------");

            // console.log("дельта смещения: " + deltaX + ":" + deltaY);
            // console.log("---------------");

            //new coordinates when resizing + limitation
            let width = this.state.startWidth + deltaX;
            (width < 300 && (width = 300)) || (width > 500 && (width = 500)); //max size width
            let height = this.state.startHeight + deltaY;
            (height < 300 && (height = 300)) || (height > 427 && (height = 427));//max size height
            console.log("реальное изменение размера " + width + ":" + height);
            // console.log("---------------");

            //             //new coordinates when resizing + limitation
            // let width = this.state.startWidth + delta2X;
            // (width < 300 && (width = 300)) || (width > 500 && (width = 500)); //max size width
            // let height = this.state.startHeight + delta2Y;
            // (height < 300 && (height = 300)) || (height > 427 && (height = 427));//max size height
            // console.log("реальное изменение размера " + width + ":" + height);
            // // console.log("---------------");

            this.setState({
                //запись в стейт нового размера блока
                sizeX: width,   
                sizeY: height,
            })

        };



        //стартовая точка для drop
        if (this.state.beginDrop === true) {

            //создаем точку для хранения стартовых данных
            if (!this.state.isStartedDrop) {

                this.setState({

                    startDropX: EO.clientX,
                    startDropY: EO.clientY,
                    
                    startX:this.state.startDropX,
                    startY:this.state.startDropY,

                    startTop: this.BlockWindowWrap.offsetTop,
                    startLeft: this.BlockWindowWrap.offsetLeft,

                    isStartedDrop: true
                })
            }

            let deltaDX = EO.clientX - this.state.startLeft;
            let deltaDY = EO.clientY - this.state.startTop;

            //let arrElementData = this.BlockWindowWrap.getBoundingClientRect();


            //window sizes
            let clientWidth = window.innerWidth;
            let clientHeight = window.innerHeight;

            let zzz = this.state.startDropX - this.state.startLeft;

            //new coordinates when moving + limitation
            let left = this.state.startLeft + deltaDX - zzz;
            (left < 0 && (left = 0)) || (left > clientWidth - this.state.sizeX && (left = clientWidth - this.state.sizeX)); //max size width
            let top = this.state.startTop + deltaDY - 15;
            (top < 0 && (top = 0)) || (top > clientHeight - this.state.sizeY && (top = clientHeight - this.state.sizeY));//max size height

            this.setState({
                locationX: left,
                locationY: top,
                position: "absolute"
            })

        }
    }



    forceMouseUp = () => {
        console.log('force mouseUp')
        this.setState({
            beginResize: false,
            beginDrop: false,

            isStartedResize: false,
            isStartedDrop: false,
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
        //console.log(this.state.startX,this.state.startY)
        console.log(this.state.startLeft)
        return (

            <div
                onMouseDown={() => this.changeZIndex('click')}
                style={{ position: this.state.position, top: this.state.locationY + "px", left: this.state.locationX + "px", width: this.state.sizeX + "px", height: this.state.sizeY + "px" }}
                className="BlockWindowWrap"
                ref={BlockWindowWrap => { this.BlockWindowWrap = BlockWindowWrap }}
            //ref="bla" //второй способ через ref
            >

                <div
                    onMouseDown={() => this.myResize('click3')} onMouseUp={() => this.myResize('click4')}

                    className="header">
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
                <div className="resizeBtnBL" onMouseDown={() => this.myResize('click5')} onMouseUp={() => this.myResize('click6')} ></div>
            </div>


        )

    }

}

export default BlockWindowWrap;