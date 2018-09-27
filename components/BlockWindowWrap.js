import React from 'react';
import ReactDOM from 'react-dom';
import Fragment from 'render-fragment';
import PropTypes from 'prop-types';



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

        sizeY: 400, //начальные размеры окна
        sizeX: 300,

        //zindex: 9000,//z-index выбранного окна

        
        //top,left координаты окна после изменений 
        locationX: this.props.startLeftChat,
        locationY: this.props.startTopChat,
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
            //console.log("click1 mouseDown Resize")
            this.setState({
                beginResize: true,
            })
        };
        if (click === "click2") {
            //console.log("click2 mouseUp Resize")
            this.setState({
                beginResize: false,
                isStartedResize: false
            })
        };
        if (click === "click3") {
            //console.log("click3 mouseDown Drop")
            this.setState({
                beginDrop: true,
            })
        };
        if (click === "click4") {
            //console.log("click4 mouseUp Drop")
            this.setState({
                beginDrop: false,
                isStartedDrop: false,
            })
        };
        if (click === "click5") {
            //console.log("click5 mouseDown ResizeLeft")
            this.setState({
                beginResizeLeft: true,
            })
        };
        if (click === "click6") {
            //console.log("click6 mouseUp ResizeLeft")
            this.setState({
                beginResize: false,
                beginResizeLeft: false
            })
        };
    };

    changeZIndex = (index) => {
        if (index === 'click') {
            //console.log('click')

            this.props.cbchangeZIndex(index);
            this.setState({
                zindex:this.props.counterZindex
            })
        };
    };

    //функция сворачивания окна
    close = () => {
        //console.log(this.props)
        let closeWindow;
        if(this.props.CallBack){
            //console.log('close win1 ')
            closeWindow='1';
        }
        if(this.props.Mail){
            //console.log('close win2 ')
            closeWindow='2';
        }
        if(this.props.Chat){
            //console.log('close win3 ')
            closeWindow='3';
        }
        //передаем в родитель номер свернутого окна
        this.props.cbClose(closeWindow);
        this.setState({
            //displayWindow: true,
            locationX: this.BlockWindowWrap.offsetLeft,
            locationY: this.BlockWindowWrap.offsetTop
        })
    }



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
            let delta2Y = this.state.startY - EO.clientY;

            // console.log("Старт координаты: " + this.state.startX + ":" + this.state.startY);         
            // console.log("Актуальные координаты: " + EO.clientX + ":" + EO.clientY);  
            // console.log("Начальные ширина/высота: " + this.state.startWidth + ":" + this.state.startHeight);
            // console.log("---------------");

            // console.log("дельта смещения: " + deltaX + ":" + deltaY);
            // console.log("---------------");

            //new coordinates when resizing + limitation
            let width = this.state.startWidth + deltaX;
            (width < 300 && (width = 300)) || (width > 600 && (width = 600)); //max size width
            // let height = this.state.startHeight + deltaY;
            let height = this.state.startHeight + deltaY;
            (height < 400 && (height = 400)) || (height > 550 && (height = 550));//max size height
            //console.log("реальное изменение размера " + width + ":" + height);

            this.setState({
                //запись в стейт нового размера блока
                sizeX: width,
                sizeY: height,
            })

        };

        //ResizeLeft
        // if (this.state.beginResizeLeft === true) {

        //     //создаем точку для хранения стартовых данных
        //     if (!this.state.isStartedResizeLeft) {

        //         this.setState({
        //             //Стартовые координаты
        //             startX: EO.clientX,
        //             startY: EO.clientY,

        //             //начальный размер элемента
        //             startWidth: this.BlockWindowWrap.offsetWidth,
        //             startHeight: this.BlockWindowWrap.offsetHeight,

        //             startTop: this.BlockWindowWrap.offsetTop,
        //             startLeftRes: this.BlockWindowWrap.offsetLeft,


        //             isStartedResizeLeft: true
        //         })
        //     }
        //     let delta3Y = EO.clientY - this.state.startY;
        //     //дельта: актуальные значения - стартовые
        //     let deltaResLeft = this.state.startLeftRes - EO.clientX;



        //     let width = this.state.startWidth + deltaResLeft;
        //     (width < 300 && (width = 300)) || (width > 500 && (width = 500)); //max size width


        //     //if((this.state.startLeftRes-EO.clientX<=179 && this.state.startWidth<=500)){
        //     if ((this.state.startLeftRes - EO.clientX <= 179 && this.state.startWidth < 501) ) {
        //         let yyyy = this.state.startLeftRes - deltaResLeft;
        //         this.setState({
        //             locationX: yyyy,
        //         })
        //     }

        //     let height = this.state.startHeight + delta3Y;
        //     (height < 300 && (height = 300)) || (height > 427 && (height = 427));//max size height
        //     console.log("реальное изменение размера " + width + ":" + height);
        //     // console.log("---------------");


        //     console.log('startWidth: ' + this.state.startWidth)
        //     console.log('startLeftRes: ' + this.state.startLeftRes)
        //     // console.log('EO.clientX:' +EO.clientX)
        //     // console.log('deltaResLeft: '+deltaResLeft)
        //     console.log(this.state.startLeftRes - EO.clientX)
        //     //console.log('yyyy: '+yyyy)
        //     console.log('--------------------')

        //     this.setState({
        //         //locationX: yyyy,
        //         //запись в стейт нового размера блока
        //         sizeX: width,
        //         sizeY: height,
        //     })

        // };



        //стартовая точка для drop
        if (this.state.beginDrop === true) {

            //создаем точку для хранения стартовых данных
            if (!this.state.isStartedDrop) {

                this.setState({

                    startDropX: EO.clientX,
                    startDropY: EO.clientY,

                    startX: this.state.startDropX,
                    startY: this.state.startDropY,

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
        //  console.log('force mouseUp')
        this.setState({
            beginResizeLeft: false,
            beginResize: false,
            beginDrop: false,

            isStartedResizeLeft: false,
            isStartedResize: false,
            isStartedDrop: false,
        })
    }


    
    //Отображение содержимого в окошках
    //////////////////////////////////Рендер "Запросить звонок"
    renderCallBackTitle = () => {
        return (
            
            <div className="WindowHead">Заказать звонок</div>
        )
    }
    renderCallBackWelcome = () => {
        return (
            <div className="WindowWelcome">Вас приветствует БПС-Сбербанк. Задайте интересующий вопрос.</div>
        )
    }
    renderCallBackMain = () => {
        return (
            <div>
                <div className="WindowFieldLabel">Ваше имя:
          <div className="WindowFieldControlFrame">
                        <input
                            className="WindowFieldEdit"
                            type="text"
                            ref="fieldName"
                            onChange={this.onFieldChange.bind(this, "nameIsEmpty")} />
                    </div>
                    <div className={this.state.nameIsEmpty ? "WindowFieldError" : "WindowFieldError-display-none"}>Введите свое имя</div>
                </div>

                <div className="WindowFieldLabel">Ваш телефон:
          <div className="WindowFieldControlFrame">
                        <input
                            className="WindowFieldEdit"
                            type="text"

                            ref="fieldNumber"
                            onChange={this.onFieldChange.bind(this, "numberIsEmpty")} />
                    </div>
                    <div
                        className={this.state.numberIsEmpty ? "WindowFieldError" : "WindowFieldError-display-none"}>
                        Введите номер телефона
          </div>
                </div>

                <div className="WindowFieldLabel">Тема обращения:
          <div className="WindowFieldControlFrame">
  
                        <select
                            className="WindowFieldEdit">
                            <option value="volvo">Депозиты</option>
                            <option value="saab">Кредитование юридических лиц</option>
                            <option value="vw">Кредитование</option>
                            <option value="audi">Услуги БПС Сбербанка</option>
                        </select>
                    </div>
                </div>

                <div className="WindowFieldLabel">Укажите удобное время звонка
                    <div className="WindowFieldControlFrame">

                        <select
                            className="WindowFieldEdit">
                            <option value="volvo">С 9:00 до 10:00</option>
                            <option value="saab">С 11:00 до 12:00</option>
                            <option value="vw">С 12:00 до 13:00</option>
                            <option value="audi">С 13:00 до 14:00</option>
                        </select>
                    </div>
                </div>

                <div className="WindowFieldLabel">График работы контакт-центра:&nbsp;<strong className="strong-style">Круглосуточно</strong>
                </div>
            </div>
        )
    }
    renderCallBackButtom = () => {
        return (
            <div className="footer">
                <button
                    className="buttom"
                //onClick={this.WindowButtonStartChat}
                //disabled={nameIsEmpty || numberIsEmpty}
                >
                    Перезвоните мне
            </button>
            </div>
        )
    }
    //////////////////////////////////Конец Рендера "Запросить звонок"


    //////////////////////////////////Рендер "Отправить вопрос"
    renderMailtitle = () => {
        return (
            <div className="WindowHead">Задать вопрос</div>
        )
    }
    renderMailWelcome = () => {
        return (
            <div className="WindowWelcome">Вас приветствует БПС-Сбербанк. Задайте интересующий вопрос.</div>
        )
    }
    renderMailMain = () => {
        return (
            <div>
                <div className="WindowFieldLabel">Ваше имя:
            <div className="WindowFieldControlFrame">
                        <input
                            className="WindowFieldEdit"
                            type="text"
                            ref="fieldName"
                            onChange={this.onFieldChange.bind(this, "nameIsEmpty")} />
                    </div>
                    <div className={this.state.nameIsEmpty ? "WindowFieldError" : "WindowFieldError-display-none"}>Введите свое имя</div>
                </div>

                <div className="WindowFieldLabel">Номер телефона:
            <div className="WindowFieldControlFrame">
                        <input
                            className="WindowFieldEdit"
                            type="text"

                            ref="fieldNumber"
                            onChange={this.onFieldChange.bind(this, "numberIsEmpty")} />
                    </div>
                    <div
                        className={this.state.numberIsEmpty ? "WindowFieldError" : "WindowFieldError-display-none"}>
                        Введите номер телефона
                    </div>
                </div>
            </div>
        )
    }
    renderMailButtom = () => {
        return (
            <div className="footer">
                <button
                    className="buttom"
                //onClick={this.WindowButtonStartChat}
                //disabled={nameIsEmpty || numberIsEmpty}
                >
                    Свяжитесь со мной
            </button>
            </div>
        )
    }
    //////////////////////////////////Конец Рендера ""Отправить вопрос"


    //////////////////////////////////Рендер чата
    renderChatTitle = () => {
        return (
            <div className="WindowHead">Чат с банком</div>
        )
    }
    renderChatWelcome = () => {
        return (
            <div className="WindowWelcome">Вас приветствует БПС-Сбербанк. Задайте интересующий вопрос.</div>
        )
    }
    renderChatMain = () => {
        return (
            <div>
                <div className="WindowFieldLabel">Ваше имя:
            <div className="WindowFieldControlFrame">
                        <input
                            className="WindowFieldEdit"
                            type="text"
                            ref="fieldName"
                            onChange={this.onFieldChange.bind(this, "nameIsEmpty")} />
                    </div>
                    <div className={this.state.nameIsEmpty ? "WindowFieldError" : "WindowFieldError-display-none"}>Введите свое имя</div>
                </div>

                <div className="WindowFieldLabel">Номер телефона:
            <div className="WindowFieldControlFrame">
                        <input
                            className="WindowFieldEdit"
                            type="text"

                            ref="fieldNumber"
                            onChange={this.onFieldChange.bind(this, "numberIsEmpty")} />
                    </div>
                    <div
                        className={this.state.numberIsEmpty ? "WindowFieldError" : "WindowFieldError-display-none"}>
                        Введите номер телефона
            </div>
                </div>
            </div>
        )
    }
    renderChatButtom = () => {
        return (
            <div className="footer">
                <button
                    className="buttom"
                //onClick={this.WindowButtonStartChat}
                //disabled={nameIsEmpty || numberIsEmpty}
                >
                    Начать чат
            </button>
            </div>
        )
    }
    //////////////////////////////////Конец Рендера чата


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

    static getDerivedStateFromProps(props, state){
        let isHide=true
        if(props.CallBack&&props.isCallBack){
            isHide=false;

        }
        if(props.Mail&&props.isMail){
            isHide=false;
        }
        if(props.Chat&&props.isChat){
            isHide=false;
        }
        return {
            displayWindow: isHide,
        }
    }



    render() {
        let { btn, title, welcome } = this.props;//деструктуризация
        return (

            <div
                onMouseDown={() => this.changeZIndex('click')}

                style={{ position: this.state.position, top: this.state.locationY + "px", left: this.state.locationX + "px", width: this.state.sizeX + "px", height: this.state.sizeY + "px", zIndex: this.state.zindex }}
                className={'BlockWindowWrap-' + this.state.displayWindow}
                ref={BlockWindowWrap => { this.BlockWindowWrap = BlockWindowWrap }}
            //ref="bla" //второй способ через ref
            >


                <div
                    onMouseDown={() => this.myResize('click3')} onMouseUp={() => this.myResize('click4')}
                    className="header">
                    {this.props.CallBack && this.renderCallBackTitle()}
                    {this.props.Mail && this.renderMailtitle()}
                    {this.props.Chat && this.renderChatTitle()}
                </div>

                <div className="main">
                    {this.props.CallBack && this.renderCallBackWelcome()}
                    {this.props.CallBack && this.renderCallBackMain()}

                    {this.props.Mail && this.renderMailWelcome()}
                    {this.props.Mail && this.renderMailMain()}

                    {this.props.Chat && this.renderChatWelcome()}
                    {this.props.Chat && this.renderChatMain()}
                </div>

                {this.props.CallBack && this.renderCallBackButtom()}
                {this.props.Mail && this.renderMailButtom()}
                {this.props.Chat && this.renderChatButtom()}

                <div className='close' onClick={this.close}></div>
                <div className="resizeBtnBR" onMouseDown={() => this.myResize('click1')} onMouseUp={() => this.myResize('click2')} ></div>
                <div className="" onMouseDown={() => this.myResize('click5')} onMouseUp={() => this.myResize('click6')} ></div>
            </div>


        )


    }

}

export default BlockWindowWrap;