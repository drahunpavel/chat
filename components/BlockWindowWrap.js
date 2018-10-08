import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


//import MessageList from "./MessageList"

import './BlockWindowWrap.scss';

let chatRatingSmiles = require('../src/chatRatingSmiles.json')

let messageList = require("../src/messageList.json");

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


        nameChat: "",
        numberChat: "",
    }


    WindowButtonStartChat = (EO) => {
        EO.preventDefault();

        console.log("------------Click start Chat------------")
        console.log("Name: " + this.state.nameChat);
        console.log("Phone: " + this.state.numberChat);
        this.setState({
            toShowRenderActiveChat: true, //переключатель для отображения RenderActiveChat после нажатия кнопки
        })
    }

    WindowButtonStartMail = (EO) => {
        EO.preventDefault();
        // let fieldName = ReactDOM.findDOMNode(this.refs.fieldName).value;
        // let fieldNumber = ReactDOM.findDOMNode(this.refs.fieldNumber).value;
        // let fieldTextarea = ReactDOM.findDOMNode(this.refs.fieldTextarea).value;
        //let fieldSelect2 = ReactDOM.findDOMNode(this.refs.fieldSelect2).value;
        console.log("------------Click start Mail------------")
        console.log("Name: " + this.state.nameMail);
        console.log("Mail: " + this.state.mailMail);
        console.log("Text: " + this.state.textMail);
        this.setState({
            toShowRenderThanksMail: true, //переключатель для отображения renderThanksCallMail после нажатия кнопки
        })
    }

    WindowButtonStartCallBack = (EO) => {
        EO.preventDefault();
        // let fieldName = ReactDOM.findDOMNode(this.refs.fieldName).value;
        // let fieldNumber = ReactDOM.findDOMNode(this.refs.fieldNumber).value;
        let fieldSelect1 = ReactDOM.findDOMNode(this.refs.fieldSelect1).value;
        let fieldSelect2 = ReactDOM.findDOMNode(this.refs.fieldSelect2).value;
        console.log("------------Click start Call Back------------")
        console.log("Name: " + this.state.nameCallBack);
        console.log("Phone: " + this.state.numberCallBack);
        console.log("Select1: " + fieldSelect1);
        console.log("Select2: " + fieldSelect2);
        this.setState({
            toShowRenderThanksCallBack: true, //переключатель для отображения renderThanksCallBack после нажатия кнопки
        })
    }

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
        if (fieldInput == "nameChatIsEmpty" && EO.target.value.trim().length > 2 && EO.target.value.trim().length < 20) {
            //console.log(EO.target.value)

            this.setState({
                ["" + fieldInput]: false,
                nameChat: EO.target.value,
                field1: true,
            });
        }
        else if (fieldInput == "numberChatIsEmpty" && EO.target.value.match(/^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/)) {
            this.setState({
                ["" + fieldInput]: false,
                numberChat: EO.target.value,
                field2: true,
            });
        }

        else if (fieldInput == "nameMailIsEmpty" && EO.target.value.trim().length > 2 && EO.target.value.trim().length < 20) {
            this.setState({
                ["" + fieldInput]: false,
                nameMail: EO.target.value,
                field3: true,
            });
        }
        else if (fieldInput == "mailMailIsEmpty" && EO.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            this.setState({
                ["" + fieldInput]: false,
                mailMail: EO.target.value,
                field4: true,
            });
        }
        else if (fieldInput == "textMailIsEmpty" && EO.target.value.trim().length > 2 && EO.target.value.trim().length < 180) {
            this.setState({
                ["" + fieldInput]: false,
                textMail: EO.target.value,
                field5: true,
            });
        }

        else if (fieldInput == "nameCallBackIsEmpty" && EO.target.value.trim().length > 2 && EO.target.value.trim().length < 20) {
            this.setState({
                ["" + fieldInput]: false,
                nameCallBack: EO.target.value,
                field6: true,
            });
        }
        else if (fieldInput == "numberCallBackIsEmpty" && EO.target.value.match(/^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/)) {
            this.setState({
                ["" + fieldInput]: false,
                numberCallBack: EO.target.value,
                field7: true,
            });
        }


        else {
            this.setState({
                ["" + fieldInput]: true,
            });

        }


    }

    changeNumber = (EO) => {
        console.log(EO.target.value)
        this.setState({
            numberChat: EO.target.value,
        })
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

    //функция измененения Z-index
    changeZIndex = (index) => {
        if (index === 'click') {
            // console.log('click')
            this.props.cbchangeZIndex(index);//отправляем родителю инфу о том, что произошел клик по окну
            this.setState({
                //zindex: this.state.zindex + 1,
                zindex: this.props.counterZindex//перехватываем значение из родителя
            })
        };
    };

    //функция сворачивания окна
    close = () => {
        //console.log(this.props)
        let closeWindow;
        if (this.props.CallBack) {
            //console.log('close win1 ')
            closeWindow = '1';
            this.setState({
                toShowRenderThanksCallBack: false,//переключает содержимое окна CallBack
            })
        }
        if (this.props.Mail) {
            //console.log('close win2 ')
            closeWindow = '2';
            this.setState({
                toShowRenderThanksMail: false,//переключает содержимое окна Mail
            })
        }
        if (this.props.Chat) {
            //console.log('close win3 ')
            closeWindow = '3';
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

            //new coordinates when resizing + limitation
            let width = this.state.startWidth + deltaX;
            (width < 300 && (width = 300)) || (width > 600 && (width = 600)); //max size width
            // let height = this.state.startHeight + deltaY;
            let height = this.state.startHeight + deltaY;
            (height < 450 && (height = 450)) || (height > 550 && (height = 550));//max size height
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

    сhatCompleteDialogue = () => {
        console.log('CompleteDialogue')
        this.setState({
            dialogueCompleted: true, //true при нажатии на "завершить диалог"
            startNewDialogue: false,
            nameChat: '',
            numberChat: '',
            // nameChatIsEmpty: true,
            // numberChatIsEmpty: true,
        })
    }

    startNewDialog = () => {
        console.log('startNewDialog')
        this.setState({
            startNewDialogue: true,
            toShowRenderActiveChat: false,
            dialogueCompleted: false,

            // nameChatIsEmpty: true,
            // numberChatIsEmpty: true,

            field1: false,
            field2: false,
        })
    }

    keepDialog = () => {
        console.log('keepDialog')
    }
    printDialog = () => {
        console.log('printDialog')
    }
    rateChat = (evaluation) => {
        console.log(evaluation)
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
                    <div className={this.state.nameCallBackIsEmpty ? "WindowFieldControlFrame-Error" : "WindowFieldControlFrame"}>
                        <input
                            className="WindowFieldEdit"
                            type="text"
                            ref="fieldName"
                            onChange={this.onFieldChange.bind(this, "nameCallBackIsEmpty")}
                        />
                    </div>
                    <div className={this.state.nameCallBackIsEmpty ? "WindowFieldError" : "WindowFieldError-display-none"}>Заполните поле</div>
                </div>

                <div className="WindowFieldLabel">Ваш телефон:
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
                        className={this.state.numberCallBackIsEmpty ? "WindowFieldError" : "WindowFieldError-display-none"}>
                        Введите номер телефона
                    </div>
                </div>

                <div className="WindowFieldLabel">Тема обращения:
                    <div className="WindowFieldControlFrame">

                        <select
                            ref="fieldSelect1"
                            className="WindowFieldEdit">
                            <option value="Депозиты">Депозиты</option>
                            <option value="Кредитование юридических лиц">Кредитование юридических лиц</option>
                            <option value="Кредитование">Кредитование</option>
                            <option value="Услуги БПС Сбербанка">Услуги БПС Сбербанка</option>
                        </select>
                    </div>
                </div>

                <div className="WindowFieldLabel">Укажите удобное время звонка
                    <div className="WindowFieldControlFrame">

                        <select
                            ref="fieldSelect2"
                            className="WindowFieldEdit">
                            <option value="С 9:00 до 10:00">С 9:00 до 10:00</option>
                            <option value="С 11:00 до 12:00">С 11:00 до 12:00</option>
                            <option value="С 12:00 до 13:00">С 12:00 до 13:00</option>
                            <option value="С 12:00 до 13:00">С 12:00 до 13:00</option>
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
                    className="button"
                    onClick={this.WindowButtonStartCallBack}
                    // disabled={this.state.nameChatIsEmpty || this.state.numberChatIsEmpty}
                    disabled={!this.state.field6 || !this.state.field7 || this.state.nameCallBackIsEmpty || this.state.numberCallBackIsEmpty}
                >
                    Перезвоните мне
            </button>
            </div>
        )
    }
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
                            onChange={this.onFieldChange.bind(this, "nameMailIsEmpty")}
                        />
                    </div>
                    <div className={this.state.nameMailIsEmpty ? "WindowFieldError" : "WindowFieldError-display-none"}>
                        Заполните поле
                    </div>
                </div>

                <div className="WindowFieldLabel">Ваш E-mail:
                    <div className="WindowFieldControlFrame">
                        <input
                            className="WindowFieldEdit"
                            type="text"

                            ref="fieldNumber"
                            onChange={this.onFieldChange.bind(this, "mailMailIsEmpty")}
                        />
                    </div>
                    <div
                        className={this.state.mailMailIsEmpty ? "WindowFieldError" : "WindowFieldError-display-none"}>
                        Введите E-mail
                    </div>
                </div>

                <div className="WindowFieldLabel">Вопрос:
                    <div className="WindowFieldControlFrame">
                        <textarea
                            className="WindowFieldTextareaEdit"
                            type="text"
                            ref="fieldTextarea"
                            onChange={this.onFieldChange.bind(this, "textMailIsEmpty")}
                        />
                    </div>
                    <div
                        className={this.state.textMailIsEmpty ? "WindowFieldError" : "WindowFieldError-display-none"}>
                        Заполните поле
                    </div>
                </div>

            </div>
        )
    }
    renderMailButtom = () => {
        return (
            <div className="footer">
                <button
                    className="button"
                    onClick={this.WindowButtonStartMail}
                    disabled={!this.state.field3 || !this.state.field4 || !this.state.field5 || this.state.nameMailIsEmpty || this.state.mailMailIsEmpty}
                >
                    Свяжитесь со мной
            </button>
            </div>
        )
    }
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
                {/* поле с именем */}
                <div className="WindowFieldLabel">Ваше имя:
                    <div className={this.state.nameChatIsEmpty ? "WindowFieldControlFrame-Error" : "WindowFieldControlFrame"}>
                        <input
                            className="WindowFieldEdit"
                            type="text"
                            ref="fieldName"
                            onChange={this.onFieldChange.bind(this, "nameChatIsEmpty")}
                        //value={this.state.nameChat}
                        />
                    </div>
                    <div className={this.state.nameChatIsEmpty ? "WindowFieldError" : "WindowFieldError-display-none"}>Заполните поле</div>
                </div>
                {/* поле с номером телефона */}
                <div className="WindowFieldLabel">Номер телефона:
                    <div className={this.state.numberChatIsEmpty ? "WindowFieldControlFrame-Error" : "WindowFieldControlFrame"}>
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
                        className={this.state.numberChatIsEmpty ? "WindowFieldError" : "WindowFieldError-display-none"}>
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
                    className="button"
                    onClick={this.WindowButtonStartChat}
                    disabled={!this.state.field1 || !this.state.field2 || this.state.nameChatIsEmpty || this.state.numberChatIsEmpty}

                >
                    Начать чат
                </button>
            </div>
        )
    }
    renderActiveChatFooter = () => {
        return (

            // <div className="ActiveChat">
            <div className={this.state.dialogueCompleted ? "ActiveChatNone" : "ActiveChat"}>
                <a onClick={this.сhatCompleteDialogue}>Завершить диалог</a>
                <div className="ActiveChatEntryField">
                    <div className="ActiveChatEntryFieldText">
                        <textarea
                            className="ActiveChatFooterInput"
                            type="text"
                            placeholder="Напишите что-нибудь"
                            ref="fieldTextarea"
                            onChange={this.onFieldChange.bind(this, "textMailIsEmpty")}
                        />
                    </div>
                    <div className="ActiveChatFooterSmile"></div>
                    <div className="ActiveChatFooterButton"></div>
                </div>
            </div>
        )
    }
    renderChatRating = () => {
        return (
            <div className={this.state.startNewDialogue ? "ChatWindowAppreciateDialogueNone" : "ChatWindowAppreciateDialogue"}>
                {/* <div className="ChatWindowAppreciateDialogue"> */}
                <h3>Пожалуйста, оцените диалог с оператором</h3>
                <p>Ваше мнение нужно, чтобы сделать сервис лучше</p>
                <div>
                    {this.state.chatRatingSmilesArr.map(v =>
                        <div key={v.code}
                            className="ChatWindowAppreciateDialogueImg"
                            style={{ backgroundImage: v.image }}
                            onClick={() => this.rateChat(v.description)}
                        >
                        </div>
                    )}
                </div>
            </div>
        )
    }
    renderChatRatingFooter = () => {
        return (
            <div className={this.state.startNewDialogue ? "ChatWindowAppreciateDialogueFooterNone" : "ChatWindowAppreciateDialogueFooter"}>
                {/* </div><div className="ChatWindowAppreciateDialogueFooter"> */}
                <div className="AppreciateDialogueButton ">
                    <a onClick={this.keepDialog} className="ViewButton1">Сохранить</a>
                    <a onClick={this.printDialog} className="ViewButton1">Распечатать</a>
                </div>
                <div className="AppreciateDialogueButton ViewButton2">
                    <a onClick={this.startNewDialog}>Начать новый диалог</a>
                </div>
            </div>
        )
    }
    renderActiveChatMain = () => {
        return (
            //<MessageList/>
            <div className={this.state.dialogueCompleted ? "ChatWindowDisplayMessagesNone" : "ChatWindowDisplayMessages"}>
                <div>
                    <ul className="message-list">
                        {this.state.messageList.map(v =>
                            <li key={v.code}
                                className="message"
                            >
                            {v.id==="operator"&&
                            <div>
                                {/* <div className="message-author" style={{backgroundImage: v.image}}></div> */}
                            
                                <div 
                                    style={{backgroundColor:"#eeeff2",textAlign:"left" }}
                                    className="message-text">
                                    {v.message}
                                </div>
                            </div>
                            }
                            {v.id==="user"&&
                            <div>
                                {/* <div className="message-author">{v.id}</div> */}
                                <div 
                                    style={{backgroundColor:"#c3efb3",textAlign:"right" }}
                                    className="message-text">
                                    {v.message}
                                </div>
                            </div>
                            }
                            </li>
                        )}
                    </ul>
                </div>

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

    static getDerivedStateFromProps(props, state) {
        let isHide = true
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
            displayWindow: isHide,
        }
    }



    render() {
        let { btn, title, welcome } = this.props;//деструктуризация
        // console.log("toShowRenderActiveChat",this.state.toShowRenderActiveChat)
        // console.log("dialogueCompleted",this.state.dialogueCompleted)
        // console.log("startNewDialogue", this.state.startNewDialogue)
       //console.log(this.state.nameChat, this.state.numberChat)
        return (

            <div
                //  контроль для Zиндекса для разных окон
                // onMouseDown={() => this.props.CallBack && this.changeZIndex('clickCallBack') || this.props.Mail && this.changeZIndex('clickMail') || this.props.Chat && this.changeZIndex('clickChat')}
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
                    {this.state.toShowRenderThanksCallBack ? null : this.props.CallBack && this.renderCallBackWelcome()}
                    {this.state.toShowRenderThanksCallBack ? this.props.CallBack && this.renderThanksCallBack() : this.props.CallBack && this.renderCallBackMain()}

                    {this.state.toShowRenderThanksMail ? null : this.props.Mail && this.renderMailWelcome()}
                    {this.state.toShowRenderThanksMail ? this.props.Mail && this.renderThanksMail() : this.props.Mail && this.renderMailMain()}


                    {/* Отображает информацию после Начать диалог */}
                    {this.state.toShowRenderActiveChat ?  null : this.props.Chat && this.renderChatWelcome()}
                    {this.state.toShowRenderActiveChat ? this.props.Chat && this.renderActiveChatMain() : this.props.Chat && this.renderChatMain()}
                    {/* Отображает информацию после нажатия на Завершить диалог */}
                    {this.state.dialogueCompleted ? this.props.Chat && this.renderChatRating() : null}
                    {/*  */}
                    {/* {this.state.startNewDialogue ? this.props.Chat && this.renderChatWelcome():null}
                    {this.state.startNewDialogue ? this.props.Chat && this.renderChatMain():null} */}

                </div>

                {this.state.toShowRenderThanksCallBack ? null : this.props.CallBack && this.renderCallBackButtom()}
                {this.state.toShowRenderThanksMail ? null : this.props.Mail && this.renderMailButtom()}

                {/* отображает или кнопку начать чат, или же окошко с отправлением сообщения */}
                {this.state.toShowRenderActiveChat ? this.props.Chat && this.renderActiveChatFooter() : this.props.Chat && this.renderChatButtom()}
                
                {this.state.dialogueCompleted ? this.props.Chat&&this.renderChatRatingFooter() : null}
                {/* {this.state.startNewDialogue ? this.props.Chat && this.renderChatButtom():null} */}


                <div className='close' onClick={this.close}></div>
                <div className="resizeBtnBR" onMouseDown={() => this.myResize('click1')} onMouseUp={() => this.myResize('click2')} ></div>
                <div className="" onMouseDown={() => this.myResize('click5')} onMouseUp={() => this.myResize('click6')} ></div>
            </div>


        )


    }
}

export default BlockWindowWrap;