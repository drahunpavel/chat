import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import MessageList from "./MessageList";
//import renderThanksCallBack from "./RenderBlocks";
import ChooseSmiley from "./ChooseSmiley";
//import SendMessageForm from "./SendMessageForm";

import "./BlockWindowWrap.scss";

let allSmilies = require("../src/allSmilies.json");

let chatRatingSmiles = require("../src/chatRatingSmiles.json");

let messageList = require("../src/messageList.json");

class BlockWindowWrap extends React.Component {
    static propTypes = {
        btn: PropTypes.string //Имя кнопки компонента
    };

    static defaultProps = {
        btn: "Кнопка",
        title: "Название окна",
        welcome: "Приветствие"
    };

    state = {
        //состояния ошибок полей с именем, номером
        nameChatIsEmpty: false,
        numberChatIsEmpty: false,

        nameMailIsEmpty: false,
        mailMailIsEmpty: false,
        textMailIsEmpty: false,

        nameCallBackIsEmpty: false,
        numberCallBackIsEmpty: false,
        textMailIsEmpty: false,

        sizeY: 450, //начальные размеры окна
        sizeX: 300,

        //top,left координаты окна после изменений
        locationX: this.props.startLeftChat,
        locationY: this.props.startTopChat,

        // zindex: 9000,//z-index выбранного окна
        // counterZindex:this.props.counterZindex
        zzzIndex: this.props.counterZindex,

        //массив со смайликами для оценки чата
        chatRatingSmilesArr: chatRatingSmiles,

        //загатовочный текст
        messageList: messageList,
        messageListLenght2: messageList.length,

        //переключатель для выбора оценки чата
        chatRatingSelected: false,

        //переключатель окна выбора смайлов, по умолчанию выключено=false
        selectionWindowSmile: false,
        //название выбранного смайла при оценке чата
        selectedSmile: "",

        nameChat: "",
        numberChat: "",

        textMessage: "",
        newMessage: {},
        //lengthArr:this.state.messageList.length,

        sendMessageUpdate: false,

        allSmiliesArr: allSmilies
    };

    WindowButtonStartChat = (EO) => {
        EO.preventDefault();

        console.log("------------Click start Chat------------");
        console.log("Name: " + this.state.nameChat);
        console.log("Phone: " + this.state.numberChat);
        this.setState({
            toShowRenderActiveChat: true, //переключатель для отображения RenderActiveChat после нажатия кнопки
            isOpenChatWindow: true
        });
    };

    WindowButtonStartMail = (EO) => {
        EO.preventDefault();
        // let fieldName = ReactDOM.findDOMNode(this.refs.fieldName).value;
        // let fieldNumber = ReactDOM.findDOMNode(this.refs.fieldNumber).value;
        // let fieldTextarea = ReactDOM.findDOMNode(this.refs.fieldTextarea).value;
        //let fieldSelect2 = ReactDOM.findDOMNode(this.refs.fieldSelect2).value;
        console.log("------------Click start Mail------------");
        console.log("Name: " + this.state.nameMail);
        console.log("Mail: " + this.state.mailMail);
        console.log("Text: " + this.state.textMail);
        this.setState({
            toShowRenderThanksMail: true //переключатель для отображения renderThanksCallMail после нажатия кнопки
        });
    };

    WindowButtonStartCallBack = (EO) => {
        EO.preventDefault();
        // let fieldName = ReactDOM.findDOMNode(this.refs.fieldName).value;
        // let fieldNumber = ReactDOM.findDOMNode(this.refs.fieldNumber).value;
        let fieldSelect1 = ReactDOM.findDOMNode(this.refs.fieldSelect1).value;
        let fieldSelect2 = ReactDOM.findDOMNode(this.refs.fieldSelect2).value;
        console.log("------------Click start Call Back------------");
        console.log("Name: " + this.state.nameCallBack);
        console.log("Phone: " + this.state.numberCallBack);
        console.log("Select1: " + fieldSelect1);
        console.log("Select2: " + fieldSelect2);
        this.setState({
            toShowRenderThanksCallBack: true //переключатель для отображения renderThanksCallBack после нажатия кнопки
        });
    };

    //функция проверки полей воода
    onFieldChange = (fieldInput, EO) => {
        // //console.log(fieldInput, EO)
        // //console.log("--0",EO.target.value)
        // let reg1=(/^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/);
        // //console.log("--1",reg1.test(EO.target.value)
        // if(fieldInput == "numberChatIsEmpty"){

        //     this.setState({numberChat: EO.target.value})
        // }

        ///////////////////old code
        // if (fieldInput == "nameChatIsEmpty" && EO.target.value.trim().length > 2 && EO.target.value.trim().length < 20) {
        if (fieldInput == "nameChatIsEmpty") {
            //console.log(EO.target.value)

            this.setState({
                ["" + fieldInput]: false,
                nameChat: EO.target.value,
                field1: true
            });
        }
        // else if (fieldInput == "numberChatIsEmpty" && EO.target.value.match(/^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/)) {
        else if (fieldInput == "numberChatIsEmpty") {
            this.setState({
                ["" + fieldInput]: false,
                numberChat: EO.target.value,
                field2: true
            });
        } else if (
            fieldInput == "nameMailIsEmpty" &&
            EO.target.value.trim().length > 2 &&
            EO.target.value.trim().length < 20
        ) {
            this.setState({
                ["" + fieldInput]: false,
                nameMail: EO.target.value,
                field3: true
            });
        } else if (
            fieldInput == "mailMailIsEmpty" &&
            EO.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
        ) {
            this.setState({
                ["" + fieldInput]: false,
                mailMail: EO.target.value,
                field4: true
            });
        } else if (
            fieldInput == "textMailIsEmpty" &&
            EO.target.value.trim().length > 2 &&
            EO.target.value.trim().length < 180
        ) {
            this.setState({
                ["" + fieldInput]: false,
                textMail: EO.target.value,
                field5: true
            });
        } else if (
            fieldInput == "nameCallBackIsEmpty" &&
            EO.target.value.trim().length > 2 &&
            EO.target.value.trim().length < 20
        ) {
            this.setState({
                ["" + fieldInput]: false,
                nameCallBack: EO.target.value,
                field6: true
            });
        } else if (
            fieldInput == "numberCallBackIsEmpty" &&
            EO.target.value.match(/^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/)
        ) {
            this.setState({
                ["" + fieldInput]: false,
                numberCallBack: EO.target.value,
                field7: true
            });
        } else {
            this.setState({
                ["" + fieldInput]: true
            });
        }
    };

    changeNumber = (EO) => {
        console.log(EO.target.value);
        this.setState({
            numberChat: EO.target.value
        });
    };

    //Функция отслеживания кликов
    myResize = (click) => {
        if (click === "click1") {
            //console.log("click1 mouseDown Resize")
            this.setState({
                beginResize: true
            });
        }
        if (click === "click2") {
            //console.log("click2 mouseUp Resize")
            this.setState({
                beginResize: false,
                isStartedResize: false
            });
        }
        if (click === "click3") {
            //console.log("click3 mouseDown Drop")
            this.setState({
                beginDrop: true
            });
        }
        if (click === "click4") {
            //console.log("click4 mouseUp Drop")
            this.setState({
                beginDrop: false,
                isStartedDrop: false
            });
        }
        if (click === "click5") {
            //console.log("click5 mouseDown ResizeLeft")
            this.setState({
                beginResizeLeft: true
            });
        }
        if (click === "click6") {
            //console.log("click6 mouseUp ResizeLeft")
            this.setState({
                beginResize: false,
                beginResizeLeft: false
            });
        }
    };

    //функция измененения Z-index
    changeZIndex = (index) => {
        if (index === "click") {
            // console.log('click')
            this.props.cbchangeZIndex(index); //отправляем родителю инфу о том, что произошел клик по окну
            this.setState({
                //zindex: this.state.zindex + 1,
                zindex: this.props.counterZindex //перехватываем значение из родителя
            });
        }
    };

    //функция сворачивания окна
    close = () => {
        //console.log(this.props)
        let closeWindow;
        if (this.props.CallBack) {
            //console.log('close win1 ')
            closeWindow = "1";
            this.setState({
                toShowRenderThanksCallBack: false //переключает содержимое окна CallBack
            });
        }
        if (this.props.Mail) {
            //console.log('close win2 ')
            closeWindow = "2";
            this.setState({
                toShowRenderThanksMail: false //переключает содержимое окна Mail
            });
        }
        if (this.props.Chat) {
            //console.log('close win3 ')
            closeWindow = "3";
        }
        //передаем в родитель номер свернутого окна
        this.props.cbClose(closeWindow);
        this.setState({
            //displayWindow: true,
            locationX: this.BlockWindowWrap.offsetLeft,
            locationY: this.BlockWindowWrap.offsetTop
        });
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
                });
            }

            //дельта: актуальные значения - стартовые
            let deltaX = EO.clientX - this.state.startX;
            let deltaY = EO.clientY - this.state.startY;

            //new coordinates when resizing + limitation
            let width = this.state.startWidth + deltaX;
            (width < 300 && (width = 300)) || (width > 600 && (width = 600)); //max size width
            // let height = this.state.startHeight + deltaY;
            let height = this.state.startHeight + deltaY;
            (height < 450 && (height = 450)) || (height > 550 && (height = 550)); //max size height
            //console.log("реальное изменение размера " + width + ":" + height);

            this.setState({
                //запись в стейт нового размера блока
                sizeX: width,
                sizeY: height
            });
        }

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
                });
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
            (left < 0 && (left = 0)) ||
                (left > clientWidth - this.state.sizeX &&
                    (left = clientWidth - this.state.sizeX)); //max size width
            let top = this.state.startTop + deltaDY - 15;
            (top < 0 && (top = 0)) ||
                (top > clientHeight - this.state.sizeY &&
                    (top = clientHeight - this.state.sizeY)); //max size height

            this.setState({
                locationX: left,
                locationY: top,
                position: "absolute"
            });
        }
    };

    forceMouseUp = () => {
        //  console.log('force mouseUp')
        this.setState({
            beginResizeLeft: false,
            beginResize: false,
            beginDrop: false,

            isStartedResizeLeft: false,
            isStartedResize: false,
            isStartedDrop: false
        });
    };

    сhatCompleteDialogue = () => {
        console.log("CompleteDialogue");
        this.setState({
            dialogueCompleted: true, //true при нажатии на "завершить диалог"
            startNewDialogue: false,
            nameChat: "",
            numberChat: ""
            // nameChatIsEmpty: true,
            // numberChatIsEmpty: true,
        });
    };

    startNewDialog = () => {
        console.log("startNewDialog");
        this.setState({
            startNewDialogue: true,
            toShowRenderActiveChat: false,
            dialogueCompleted: false,
            chatRatingSelected: false,
            // nameChatIsEmpty: true,
            // numberChatIsEmpty: true,

            field1: false,
            field2: false
        });
    };

    keepDialog = () => {
        console.log("keepDialog");
    };
    printDialog = () => {
        console.log("printDialog");
    };
    //рейтинг чата
    rateChat = (evaluation) => {
        //console.log(evaluation)
        this.setState({
            selectedSmile: evaluation,
            chatRatingSelected: true
        });
    };

    //функция открытия окна смайликов в чате
    openWindowSmiles = () => {
        console.log("The window with smiles");
        this.setState({
            selectionWindowSmile: !this.state.selectionWindowSmile
            //sendMessageUpdate:false,
        });
    };
    //функция добавляет к набранному тексту выбранные смайлики
    cbсonvertSmile = (newSmile) => {

      
        //console.log(newSmile)

        // this.state.allSmiliesArr.map((v)=>{
        //     if(newSmile===v.title){
        //         newSmile='😊'        
        //     }
        // })
        this.setState({
            //Добавление описание смайлов к тексту
            textMessage: this.state.textMessage + newSmile
        });
    };

    cbPressEnter = () => {
        //console.log("work!")
        this.sendMessage();
    };

    sendMessage = () => {
        console.log("Send Message");
        //console.log(this.state.messageList)

        let newMessage = {};

        //console.log(this.state.textMessage.length)
        if (this.state.textMessage.length > 1) {
            //если нет символов, пустое поле не будет отправляться в чат
            let messageListCounter = this.state.messageListLenght2 + 1;
            newMessage["code"] = messageListCounter;
            newMessage["id"] = "user";
            newMessage["message"] = this.state.textMessage;

            let addNewMessage = this.state.messageList.concat(newMessage);

            //this.state.messageList2++;
            this.setState({
                // newMessage:this.state.newMessage,
                messageList: addNewMessage,
                messageListLenght2: messageListCounter,
                textMessage: "",
                sendMessageUpdate: true, //при отправки сообщения состояние true
                selectionWindowSmile: false
                //sendMessageUpdate:
            });
        }
    };




    //Отображение содержимого в окошках
    //////////////////////////////////Рендер "Запросить звонок"
    renderCallBackTitle = () => {
        return <div className="WindowHead">Заказать звонок</div>;
    };
    renderCallBackWelcome = () => {
        return (
            <div className="WindowWelcome">
                Вас приветствует БПС-Сбербанк. Задайте интересующий вопрос.
      </div>
        );
    };
    renderCallBackMain = () => {
        return (
            <div>
                <div className="WindowFieldLabel">
                    Ваше имя:
          <div
                        className={
                            this.state.nameCallBackIsEmpty
                                ? "WindowFieldControlFrame-Error"
                                : "WindowFieldControlFrame"
                        }
                    >
                        <input
                            className="WindowFieldEdit"
                            type="text"
                            ref="fieldName"
                            onChange={this.onFieldChange.bind(this, "nameCallBackIsEmpty")}
                        />
                    </div>
                    <div
                        className={
                            this.state.nameCallBackIsEmpty
                                ? "WindowFieldError"
                                : "WindowFieldError-display-none"
                        }
                    >
                        Заполните поле
          </div>
                </div>

                <div className="WindowFieldLabel">
                    Ваш телефон:
          <div className="WindowFieldControlFrame">
                        <input
                            className="WindowFieldEdit"
                            type="text"
                            placeholder="+37529"
                            ref="fieldNumber"
                            onChange={this.onFieldChange.bind(this, "numberCallBackIsEmpty")}
                        />
                    </div>
                    <div
                        className={
                            this.state.numberCallBackIsEmpty
                                ? "WindowFieldError"
                                : "WindowFieldError-display-none"
                        }
                    >
                        Введите номер телефона
          </div>
                </div>

                <div className="WindowFieldLabel">
                    Тема обращения:
          <div className="WindowFieldControlFrame">
                        <select ref="fieldSelect1" className="WindowFieldEdit">
                            <option value="Депозиты">Депозиты</option>
                            <option value="Кредитование юридических лиц">
                                Кредитование юридических лиц
              </option>
                            <option value="Кредитование">Кредитование</option>
                            <option value="Услуги БПС Сбербанка">Услуги БПС Сбербанка</option>
                        </select>
                    </div>
                </div>

                <div className="WindowFieldLabel">
                    Укажите удобное время звонка
          <div className="WindowFieldControlFrame">
                        <select ref="fieldSelect2" className="WindowFieldEdit">
                            <option value="С 9:00 до 10:00">С 9:00 до 10:00</option>
                            <option value="С 11:00 до 12:00">С 11:00 до 12:00</option>
                            <option value="С 12:00 до 13:00">С 12:00 до 13:00</option>
                            <option value="С 12:00 до 13:00">С 12:00 до 13:00</option>
                        </select>
                    </div>
                </div>

                <div className="WindowFieldLabel">
                    График работы контакт-центра:&nbsp;
          <strong className="strong-style">Круглосуточно</strong>
                </div>
            </div>
        );
    };
    renderCallBackButtom = () => {
        return (
            <div className="footer">
                <button
                    className="button"
                    onClick={this.WindowButtonStartCallBack}
                    // disabled={this.state.nameChatIsEmpty || this.state.numberChatIsEmpty}
                    disabled={
                        !this.state.field6 ||
                        !this.state.field7 ||
                        this.state.nameCallBackIsEmpty ||
                        this.state.numberCallBackIsEmpty
                    }
                >
                    Перезвоните мне
        </button>
            </div>
        );
    };
    renderThanksCallBack = () => {
        return (
            <div>
                <div className="ThanksCallBack-img">
                    {/* <img    src="/src/images/callback.jpg"/> */}
                </div>
                <div className="renderThanks-text">
                    <h4>Спасибо!</h4>
                    <p>Мы перезвоним Вам в указанное Вами время!</p>
                </div>
            </div>
        );
    };
//////////////////////////////Конец Рендера "Запросить звонок"

    //////////////////////////////////Рендер "Отправить вопрос"
    renderMailtitle = () => {
        return <div className="WindowHead">Задать вопрос</div>;
    };
    renderMailWelcome = () => {
        return (
            <div className="WindowWelcome">
                Вас приветствует БПС-Сбербанк. Задайте интересующий вопрос.
      </div>
        );
    };
    renderMailMain = () => {
        return (
            <div>
                <div className="WindowFieldLabel">
                    Ваше имя:
          <div className="WindowFieldControlFrame">
                        <input
                            className="WindowFieldEdit"
                            type="text"
                            ref="fieldName"
                            onChange={this.onFieldChange.bind(this, "nameMailIsEmpty")}
                        />
                    </div>
                    <div
                        className={
                            this.state.nameMailIsEmpty
                                ? "WindowFieldError"
                                : "WindowFieldError-display-none"
                        }
                    >
                        Заполните поле
          </div>
                </div>

                <div className="WindowFieldLabel">
                    Ваш E-mail:
          <div className="WindowFieldControlFrame">
                        <input
                            className="WindowFieldEdit"
                            type="text"
                            ref="fieldNumber"
                            onChange={this.onFieldChange.bind(this, "mailMailIsEmpty")}
                        />
                    </div>
                    <div
                        className={
                            this.state.mailMailIsEmpty
                                ? "WindowFieldError"
                                : "WindowFieldError-display-none"
                        }
                    >
                        Введите E-mail
          </div>
                </div>

                <div className="WindowFieldLabel">
                    Вопрос:
          <div className="WindowFieldControlFrame">
                        <textarea
                            className="WindowFieldTextareaEdit"
                            type="text"
                            ref="fieldTextarea"
                            onChange={this.onFieldChange.bind(this, "textMailIsEmpty")}
                        />
                    </div>
                    <div
                        className={
                            this.state.textMailIsEmpty
                                ? "WindowFieldError"
                                : "WindowFieldError-display-none"
                        }
                    >
                        Заполните поле
          </div>
                </div>
            </div>
        );
    };
    renderMailButtom = () => {
        return (
            <div className="footer">
                <button
                    className="button"
                    onClick={this.WindowButtonStartMail}
                    disabled={
                        !this.state.field3 ||
                        !this.state.field4 ||
                        !this.state.field5 ||
                        this.state.nameMailIsEmpty ||
                        this.state.mailMailIsEmpty
                    }
                >
                    Свяжитесь со мной
        </button>
            </div>
        );
    };
    renderThanksMail = () => {
        return (
            <div>
                <div className="ThanksMail-img">
                    {/* <img    src="/src/images/callback.jpg"/> */}
                </div>
                <div className="renderThanks-text">
                    <h4>Спасибо!</h4>
                    <p>Мы свяжемся с Вами</p>
                </div>
            </div>
        );
    };
    //////////////////////////////////Конец Рендера ""Отправить вопрос"

    //////////////////////////////////Рендер чата
    renderChatTitle = () => {
        return <div className="WindowHead">Чат с банком</div>;
    };
    renderChatWelcome = () => {
        return (
            <div className="WindowWelcome">
                Вас приветствует БПС-Сбербанк. Задайте интересующий вопрос.
      </div>
        );
    };
    renderChatMain = () => {
        return (
            <div>
                {/* поле с именем */}
                <div className="WindowFieldLabel">
                    Ваше имя:
          <div
                        className={
                            this.state.nameChatIsEmpty
                                ? "WindowFieldControlFrame-Error"
                                : "WindowFieldControlFrame"
                        }
                    >
                        <input
                            className="WindowFieldEdit"
                            type="text"
                            ref="fieldName"
                            onChange={this.onFieldChange.bind(this, "nameChatIsEmpty")}
                        //value={this.state.nameChat}
                        />
                    </div>
                    <div
                        className={
                            this.state.nameChatIsEmpty
                                ? "WindowFieldError"
                                : "WindowFieldError-display-none"
                        }
                    >
                        Заполните поле
          </div>
                </div>
                {/* поле с номером телефона */}
                <div className="WindowFieldLabel">
                    Номер телефона:
          <div
                        className={
                            this.state.numberChatIsEmpty
                                ? "WindowFieldControlFrame-Error"
                                : "WindowFieldControlFrame"
                        }
                    >
                        <input
                            className="WindowFieldEdit"
                            type="text"
                            ref="fieldNumber"
                            placeholder="+37529"
                            onChange={this.onFieldChange.bind(this, "numberChatIsEmpty")}
                        //onChange={(e)=>this.onFieldChange("numberChatIsEmpty",e)}
                        //value={this.state.numberChat}
                        />
                    </div>
                    <div
                        className={
                            this.state.numberChatIsEmpty
                                ? "WindowFieldError"
                                : "WindowFieldError-display-none"
                        }
                    >
                        Введите номер телефона
          </div>
                </div>
            </div>
        );
    };
    renderChatButtom = () => {
        return (
            <div className="footer">
                <button
                    className="button"
                    onClick={this.WindowButtonStartChat}
                    disabled={
                        !this.state.field1 ||
                        !this.state.field2 ||
                        this.state.nameChatIsEmpty ||
                        this.state.numberChatIsEmpty
                    }
                >
                    Начать чат
        </button>
            </div>
        );
    };
    
    
    transformationMessage = (textMessage) => {

        let out = [];
        for (let i = 0; i < textMessage.length; i++) {

            if (textMessage[i] === ":" && textMessage[i + 5] === ":") {
                let smileyСode = textMessage[i] + textMessage[i + 1] + textMessage[i + 2] + textMessage[i + 3] + textMessage[i + 4] + textMessage[i + 5]
                //console.log(smileyСode)
                this.state.allSmiliesArr.map((v) => {
                    if (smileyСode === v.title) {
                        out.push(<img key={i} className={v.className2}></img>)
                        i += 5;
                    }
                }
                )
            } else {
                out.push(textMessage[i])
            }
        }
        // let reg=textMessage.replace( /[:]{1}[0-9]{2}[a-z]{2}[:]{1}/g )

        return out
    }

    entryFieldonChange = (e) => {
        e.preventDefault();

     //console.log(this.textInput.value)

        // let text123 = EO.target.value;
        // console.log(text123)

        // this.setState({textMessage:text123})

        // if(this.state.textMessage===""){
        //     this.setState({textMessage:EO.target.innerHTML=""})
        // }
        //let newText=this.transformationMessage(EO.target.value);
        //console.log(newText)
        // this.setState({
        //     //newMessage:this.state.newMessage,
        //     textMessage: EO.target.value,
        //     //sendMessageUpdate:false,
        // });
    };

      getText=(el)=> {
          console.log("el",el)
          
        let out = [];

        for (let i = 0; i < el.length; i++) {
           //console.log(el[i])
           out.push(el[i])
        }
        out.reverse();
  
        let output= out.join('');
        console.log("output",output);
        return output
      }

    //   getTextForFirefox=(el)=> {

    //     var text = "";
    //     if (typeof window.getSelection != "undefined") {
    //       var sel = window.getSelection();
    //       var tempRange = sel.getRangeAt(0);
    //       sel.removeAllRanges();
    //       var range = document.createRange();
    //       range.selectNodeContents(el);
    //       sel.addRange(range);
    //       text = sel.toString();
    //       sel.removeAllRanges();
    //       sel.addRange(tempRange);
    //     }
    
    //     return text;
    //   }


    onTextChange=(e)=> {
        //let text = ev.target.value;
        //console.log(this.refs.textInput)
        e.preventDefault();
        console.log(this.textInput.value)
        //console.log(text)
        //this.setState({ text: text });

      }

      handleInput=(e)=>{ 
          console.log(e.target.value)
        //this.setState({ textValue: e.target.value })
      }

      
    renderActiveChatFooter = () => {
        return (
            <div
                className={
                    this.state.dialogueCompleted ? "ActiveChatNone" : "ActiveChat"
                }
            >
                <a onClick={this.сhatCompleteDialogue}>Завершить диалог</a>
                <div className="ActiveChatEntryField">
                    <form className="ActiveChatEntryFieldText">
                        {/* <textarea
                            className="ActiveChatFooterInput"
                            type="text"
                            placeholder="Напишите что-нибудь"
                            onChange={this.entryFieldonChange}
                            value={this.state.textMessage}
                        /> */}


                        <div
                            className="ActiveChatFooterInput"
                            data-type="input"
                            placeholder="Напишите что-нибудь"
                            contentEditable="true"
                            suppressContentEditableWarning={true}//Что бы убрать предупреждение "A component is `contentEditable` and contains `children` managed by React" 
                            //value={ this.state.textMessage }
                            //onPaste={ this.onPaste }
                            // ref={this.textInput}
                            //ref="textInput"
                            //ref={e => this.textInput = e} 
                            // ref="login"
                            //onInput={ this.onTextChange }
                            //onInput={ this.handleInput.bind(this) }
                            ref="textInput"
                            //ref={element => this.textInput = element}
                            //onInput={this.handleNoteChange.bind(this)}
                            //onInput={ this.onTextChange }
                            // onMouseOver={this.setSelectionRange(this.value.length,this.value.length)}
                        >
                            {/* {this.state.textMessage} */}
                            {/* {this.transformationMessage(this.state.textMessage)} */}
                        </div>

                        <input
                        onInput={ this.handleInput.bind(this) }
                        >
                        
                        </input>

                    </form>
                    {/*окно со смайлами */}
                    {/* <div
                        className={this.state.selectionWindowSmile ? "WindowSmilies" : "WindowSmiliesNone"}
                        style={{ backgroundColor: "white" }}>
                    </div> */}
                    <ChooseSmiley
                        selectionWindowSmile={this.state.selectionWindowSmile}
                        cbсonvertSmile={this.cbсonvertSmile}
                        sendMessageUpdate={this.state.sendMessageUpdate}
                    />
                    {/*кнопка Открыть\закрыть окно со смайлами */}
                    <div
                        className={
                            this.state.selectionWindowSmile
                                ? "ActiveChatFooterSmileActive"
                                : "ActiveChatFooterSmile"
                        }
                        onClick={this.openWindowSmiles}
                    />
                    {/* кнопка Отправки сообщения */}
                    <div className="ActiveChatFooterButton" onClick={this.sendMessage} />
                </div>
            </div>
        );
    };
    renderChatRating = () => {
        return (
            <div
                className={
                    this.state.startNewDialogue
                        ? "ChatWindowAppreciateDialogueNone"
                        : "ChatWindowAppreciateDialogue"
                }
            >
                {this.state.chatRatingSelected ? (
                    <div className="">
                        <div className="DialogueRating1">
                            <h3>Спасибо!</h3>
                            <p>Мы ценим Ваше мнение</p>
                        </div>
                        <div className="DialogueRating2">
                            {this.state.chatRatingSmilesArr.map(
                                v =>
                                    v.description === this.state.selectedSmile ? ( //проверка входящего JSON
                                        <div
                                            key={v.code}
                                            className="ChatWindowAppreciateDialogueImg2"
                                            style={{ backgroundImage: v.image, opacity: "1" }}
                                            onClick={() => this.rateChat(v.description)}
                                        />
                                    ) : (
                                            <div
                                                key={v.code}
                                                className="ChatWindowAppreciateDialogueImg2"
                                                style={{ backgroundImage: v.image, opacity: "0.3" }}
                                            />
                                        )
                            )}
                        </div>
                    </div>
                ) : (
                        <div className="">
                            <div className="DialogueRating1">
                                <h3>Пожалуйста, оцените диалог с оператором</h3>
                                <p>Ваше мнение нужно, чтобы сделать сервис лучше</p>
                            </div>
                            <div className="DialogueRating2">
                                {this.state.chatRatingSmilesArr.map(v => (
                                    <div
                                        key={v.code}
                                        className="ChatWindowAppreciateDialogueImg"
                                        style={{ backgroundImage: v.image }}
                                        onClick={() => this.rateChat(v.description)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
            </div>
        );
    };
    renderChatRatingFooter = () => {
        return (
            <div
                className={
                    this.state.startNewDialogue
                        ? "ChatWindowAppreciateDialogueFooterNone"
                        : "ChatWindowAppreciateDialogueFooter"
                }
            >
                <div className="AppreciateDialogueButton ">
                    <a onClick={this.keepDialog} className="ViewButton1">
                        Сохранить
          </a>
                    <a onClick={this.printDialog} className="ViewButton1">
                        Распечатать
          </a>
                </div>
                <div className="AppreciateDialogueButton ViewButton2">
                    <a onClick={this.startNewDialog}>Начать новый диалог</a>
                </div>
            </div>
        );
    };
    renderActiveChatMain = () => {
        return (
            <MessageList
                messageList={this.state.messageList}
                dialogueCompleted={this.state.dialogueCompleted}
                sendMessageUpdate={this.state.sendMessageUpdate}
                cbkeyPressEnter={this.cbPressEnter}
            //cbScroll={this.sendMessage}
            />
        );
    };
    //////////////////////////////////Конец Рендера чата

    //Объявляем
    componentDidMount() {
        // document.addEventListener('keydown',this.keyPressEnter)
        window.addEventListener("mousedown", this.onMouseDown);
        window.addEventListener("mouseup", this.forceMouseUp);
        window.addEventListener("mousemove", this.mouseMove);
    }
    //Удаляем
    componentWillUnmount() {
        //document.removeEventListener('keydown',this.keyPressEnter)
        window.removeEventListener("mousedown", this.onMouseDown);
        window.removeEventListener("onmouseup", this.forceMouseUp);
        window.removeEventListener("mousemove", this.mouseMove);
    }

    static getDerivedStateFromProps(props, state) {
        let isHide = true;
        //console.log(props)
        if (props.CallBack && props.isCallBack) {
            isHide = false;
        }
        if (props.Mail && props.isMail) {
            isHide = false;
        }
        if (props.Chat && props.isChat) {
            isHide = false;
        }
        return {
            displayWindow: isHide
        };
    }

    render() {
        let { btn, title, welcome } = this.props; //деструктуризация
        let {
            textMessage,
            newMessage,
            lengthArr,
            selectedSmile,
            obj,
            messageListLenght2
        } = this.state;
       
       
        return (
            <div
                //  контроль для Zиндекса для разных окон
                // onMouseDown={() => this.props.CallBack && this.changeZIndex('clickCallBack') || this.props.Mail && this.changeZIndex('clickMail') || this.props.Chat && this.changeZIndex('clickChat')}
                onMouseDown={() => this.changeZIndex("click")}
                style={{
                    position: this.state.position,
                    top: this.state.locationY + "px",
                    left: this.state.locationX + "px",
                    width: this.state.sizeX + "px",
                    height: this.state.sizeY + "px",
                    zIndex: this.state.zindex
                }}
                className={"BlockWindowWrap-" + this.state.displayWindow}
                ref={BlockWindowWrap => {
                    this.BlockWindowWrap = BlockWindowWrap;
                }}
            //ref="bla" //второй способ через ref
            >
                <div
                    onMouseDown={() => this.myResize("click3")}
                    onMouseUp={() => this.myResize("click4")}
                    className="header"
                >
                    {this.props.CallBack && this.renderCallBackTitle()}
                    {this.props.Mail && this.renderMailtitle()}
                    {this.props.Chat && this.renderChatTitle()}
                </div>

                <div className="main">
                    {this.state.toShowRenderThanksCallBack
                        ? null
                        : this.props.CallBack && this.renderCallBackWelcome()}
                    {this.state.toShowRenderThanksCallBack
                        ? this.props.CallBack && this.renderThanksCallBack()
                        : this.props.CallBack && this.renderCallBackMain()}

                    {this.state.toShowRenderThanksMail
                        ? null
                        : this.props.Mail && this.renderMailWelcome()}
                    {this.state.toShowRenderThanksMail
                        ? this.props.Mail && this.renderThanksMail()
                        : this.props.Mail && this.renderMailMain()}

                    {/* Отображает информацию после Начать диалог */}
                    {this.state.toShowRenderActiveChat
                        ? null
                        : this.props.Chat && this.renderChatWelcome()}
                    {this.state.toShowRenderActiveChat
                        ? this.props.Chat && this.renderActiveChatMain()
                        : this.props.Chat && this.renderChatMain()}
                    {/* Отображает информацию после нажатия на Завершить диалог */}
                    {this.state.dialogueCompleted
                        ? this.props.Chat && this.renderChatRating()
                        : null}
                    {/*  */}
                    {/* {this.state.startNewDialogue ? this.props.Chat && this.renderChatWelcome():null}
                    {this.state.startNewDialogue ? this.props.Chat && this.renderChatMain():null} */}
                </div>

                {this.state.toShowRenderThanksCallBack
                    ? null
                    : this.props.CallBack && this.renderCallBackButtom()}
                {this.state.toShowRenderThanksMail
                    ? null
                    : this.props.Mail && this.renderMailButtom()}

                {/* отображает или кнопку начать чат, или же окошко с отправлением сообщения, выбором смайликов */}
                {this.state.toShowRenderActiveChat
                    ? this.props.Chat && this.renderActiveChatFooter()
                    : this.props.Chat && this.renderChatButtom()}
                {/* {this.state.selectionWindowSmile? console.log('окно открыто'):console.log('окно закрыто')} */}
                {this.state.dialogueCompleted
                    ? this.props.Chat && this.renderChatRatingFooter()
                    : null}
                {/* {this.state.startNewDialogue ? this.props.Chat && this.renderChatButtom():null} */}

                <div className="close" onClick={this.close} />
                <div
                    className="resizeBtnBR"
                    onMouseDown={() => this.myResize("click1")}
                    onMouseUp={() => this.myResize("click2")}
                />
                <div
                    className=""
                    onMouseDown={() => this.myResize("click5")}
                    onMouseUp={() => this.myResize("click6")}
                />
            </div>
        );
    }
}

export default BlockWindowWrap;
