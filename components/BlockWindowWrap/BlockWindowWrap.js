import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";



import ChatComponent from "../ChatComponent/ChatComponent";
import CallBackComponent from "../CallBackComponent/CallBackComponent";
import MailComponent from "../MailComponent/MailComponent";

import "./BlockWindowWrap.scss";



//all del
let allSmilies = require("../../src/allSmilies.json");
let chatRatingSmiles = require("../../src/chatRatingSmiles.json");





class BlockWindowWrap extends React.PureComponent {
    state = {
        //состояния ошибок полей с именем, номером
        nameChatIsEmpty: false,
        numberChatIsEmpty: false,

        nameMailIsEmpty: false,
        mailMailIsEmpty: false,
        textMailIsEmpty: false,


        //массив со смайликами для оценки чата 
        chatRatingSmilesArr: chatRatingSmiles,

        //require allSmilies 
        allSmiliesArr: allSmilies,


        // //открыто/закрыто окно с активным чатом
        // toShowRenderActiveChat:false,

        sizeY: 450, //начальные размеры окна
        sizeX: 300,

        //top,left координаты окна после изменений
        locationX: this.props.startLeftChat,
        locationY: this.props.startTopChat,

        zindex: 8000,//z-index выбранного окна
        // counterZindex:this.props.counterZindex

        //состояние чата
        showChat: false,
        showChatRating: false,
        showChatStartPage: true,

        //состояние заказа звонка //
        showCallback: true,
        showThanksCallback: false,

        //состояние емайла //
        showMail: true,
        showThanksMail: false,

        //
        isFirstRun:true,
        isReRecord:true,

        //наличие клавиаутры
        isKeyboard:false,


        //активное поле ввода по умолчанию
        inputFieldIisActive:false,


        wasScroll:false,
    };

    timerHidingDelay=null;

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
        let closeWindow;
        //1-обратный звонок, 2-сообщения, 3- чат
        if (this.props.CallBack) {
            closeWindow = "1";
            this.setState({
                toShowRenderThanksCallBack: false, //переключает содержимое окна CallBack
                serviceCallBack: null,
            });
        }
        if (this.props.Mail) {
            closeWindow = "2";
            this.setState({
                toShowRenderThanksMail: false, //переключает содержимое окна Mail
                serviceAskQuestion: null
            });
        }
        if (this.props.Chat) {
            closeWindow = "3";
        }

        //передаем в родитель номер свернутого окна
        this.props.cbClose(closeWindow);

        this.setState({
            locationX: this.BlockWindowWrap.offsetLeft,
            locationY: this.BlockWindowWrap.offsetTop,
        });
    };


    touchmove=(EO)=>{
        // console.log(EO)
    }

    mouseMove = (EO) => {
        // console.log("clientX",EO.clientX,"clientY",EO.clientY)
        //стартовая точка для resize
        if (this.state.beginResize === true) {
            //создаем точку для хранения стартовых данных
            if (!this.state.isStartedResize) {

                this.setState({
                    //Стартовые координаты
                    startX: EO.clientX,
                    startY: EO.clientY+this.props.scrollTOP,

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
            console.log(deltaX,deltaY)

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

            // console.log(this.BlockWindowWrap.offsetTop, this.BlockWindowWrap.offsetLeft)

            let deltaDX = EO.clientX - this.state.startLeft;
            let deltaDY = EO.clientY - this.state.startTop;
            // console.log("deltaDY",deltaDY)
            //let arrElementData = this.BlockWindowWrap.getBoundingClientRect();

            //window sizes
            let clientWidth = window.innerWidth;
            let clientHeight = window.innerHeight;
            //FIX
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
                // position: "absolute"
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



    //управляет состоянием окон при сворачивании
    getWindowСondition = (windowType) => {
        if (windowType === "showChat") {
            this.setState({
                showChat: true,
                showChatRating: false,
                showChatStartPage: false,
            })
        }
        if (windowType === "showChatRating") {
            this.setState({
                showChat: false,
                showChatRating: true,
                showChatStartPage: false,
            })
        }
        if (windowType === "showChatStartPage") {
            this.setState({
                showChat: false,
                showChatRating: false,
                showChatStartPage: true,
            })
        }
        if(windowType==="showThanksCallBack"){
            this.setState({
                showCallback:false,
                showThanksCallback:true,
            })
        }
        if(windowType==="showCallBack"){
            this.setState({
                showCallback:true,
                showThanksCallback:false,
            })
        }
        if(windowType==="showMail"){
            this.setState({
                showMail:true,
                showThanksMail:false,
            })
        }
        if(windowType==="showThanksMail"){
            this.setState({
                showMail:false,
                showThanksMail:true,
            })
        }
    }


    //получает и записывает количество непрочитанных сообщений при закрытом чате
    cbgetNumberUnreadMessages=(number)=>{
        if(isNaN(number)){
        console.log("isEmpty");
        }else{
            this.props.cbgetNumberUnreadMessages(number)
        }
    }

  fadeInOut=()=>{
      if(this.state.isFirstRun){
        this.BlockWindowWrap.style.display="none";
      }
      else if(this.state.isFirstRun===false&&this.state.displayWindow===true){
        let timerHidingDelay=setTimeout(()=>{this.BlockWindowWrap.style.display="none"},400);
      }
      else{
          this.BlockWindowWrap.style.display="block";
      }
  }


    cbTouchClick=(value, block, active)=>{
        let state;
        
        // value.focus();
        // document.documentElement.scrollBy(0,50);
        // value===document.activeElement?console.log("Да"):console.log("Нет")
        // console.log("active",active)

        // console.log(this.props.panel)

        // console.log("value",value, block);

        // value.focus();
        // block.scrollIntoView({block: "start", behavior: "smooth"});
        // console.log(this.state.isKeyboard)

    }

    // resizeFunc=()=>{

    //     let {isCallBack, isMail, isChat } = this.props;
    //     let currentFieldSize=document.documentElement.clientHeight;
    //     console.log(currentFieldSize, this.state.clH )

    //     if(currentFieldSize>=this.state.clH){

    //         // this.BlockWindowWrap.scrollBy(0,30)
    //         console.log('нет клавы')
    //         this.setState({
    //             isKeyboard:false,
    //         })
    //     }else{
    //         // this.BlockWindowWrap.scrollBy(0,-30)
    //         console.log('Есть клава')
    //         this.setState({
    //             isKeyboard:true,
    //         })
    //     }
    // }
    resizeFunc=()=>{
        let {isCallBack, isMail, isChat } = this.props;
        let currentFieldSize=document.documentElement.clientHeight;



        let windowClientSize=this.getWindowClientSize(); 
        // // console.log('реальный размер',windowClientSize.height, 'ТОП', this.state.inputPos);
        // console.log(currentFieldSize, windowClientSize.height)
        let realWinSize=windowClientSize.height;

        // console.log('--1',realWinSize,'--2',this.state.clH)
        var requiredScrollSize;
       
        var selectedTextArea = document.activeElement;
        

        // console.log('----1',this.state.inputPos-realWinSize)
        if(realWinSize<=this.state.inputPos){

            if(selectedTextArea.tagName==='DIV'&&selectedTextArea.className==='BlockMessageField'){
                requiredScrollSize=(this.state.inputPos-realWinSize)/3;
            }else{
                requiredScrollSize=(this.state.inputPos-realWinSize)/2;
            }

            
            // console.log('клавиатура на поле ввода',requiredScrollSize/2);
            this.setState({
                requiredScrollSize:requiredScrollSize,
            })
        }


        if(currentFieldSize<this.state.clH&&this.state.inputFieldIisActive&&this.state.mobileBrowser){

            window.scrollBy(0,requiredScrollSize);

            this.setState({
                wasScroll:true,
            })
        }


        if(currentFieldSize>=this.state.clH&&this.state.inputFieldIisActive&&this.state.mobileBrowser){
            
            if(selectedTextArea.tagName==='DIV'&&selectedTextArea.className==='BlockMessageField'){
                window.scrollBy(0,-90);
            }else{
                window.scrollBy(0,-60);
            }
            

            this.setState({
                wasScroll:false,
            })
        }
    
    }

    selActiveEl=(EO)=>{
        var selectedTextArea = document.activeElement;

            if(selectedTextArea.tagName==='INPUT'&&selectedTextArea.className==='BlockWindowFieldEdit'||selectedTextArea.tagName==='DIV'&&selectedTextArea.className==='BlockMessageField'){
 
                let inputPos=this.getElementPos(selectedTextArea); // положение относительно окна браузера

                this.setState({
                    inputFieldIisActive:true,
                    inputPos:inputPos.top,
                })
        }else{
            this.setState({
                inputFieldIisActive:false,
            })            
        }

        if(this.state.wasScroll){
            window.scrollBy(0,-this.state.requiredScrollSize);
            this.setState({
                wasScroll:false,
            })
        }


    }

    //получае утройство, с которого сидит юзер
    detectTheThing=()=>{
        let uagent = navigator.userAgent.toLowerCase();
  
        if (uagent.search("iphone") > -1 || uagent.search("ipad") > -1 
        || uagent.search("android") > -1 || uagent.search("blackberry") > -1
        || uagent.search("webos") > -1){
            // console.log(uagent)
          this.setState({
            mobileBrowser:true,
          })
        }else{
            // console.log(uagent)
          this.setState({
            mobileBrowser:false,
          })
        }
    }

    getElementPos=(elem)=> {
        var bbox=elem.getBoundingClientRect();
    
        var body=document.body;
        var docEl=document.documentElement;
    
        var scrollTop=window.pageYOffset||docEl.scrollTop||body.scrollTop;
        var scrollLeft=window.pageXOffset||docEl.scrollLeft||body.scrollLeft;
    
        var clientTop=docEl.clientTop||body.clientTop||0;
        var clientLeft=docEl.clientLeft||body.clientLeft||0;
    
        var top=bbox.top+scrollTop-clientTop;
        var left=bbox.left+scrollLeft-clientLeft;
    
        return {
            left: left,
            top: top
        };
    }

    getWindowClientSize=()=> {
        var uaB=navigator.userAgent.toLowerCase();
        var isOperaB = (uaB.indexOf('opera')  > -1);
        var isIEB=(!isOperaB && uaB.indexOf('msie') > -1);
    
        var clientWidth=((document.compatMode||isIEB)&&!isOperaB)?
            (document.compatMode=='CSS1Compat')?
                document.documentElement.clientWidth:
                document.body.clientWidth:
            (document.parentWindow||document.defaultView).innerWidth;
    
        var clientHeight=((document.compatMode||isIEB)&&!isOperaB)?
            (document.compatMode=='CSS1Compat')?
                document.documentElement.clientHeight:
                document.body.clientHeight:
            (document.parentWindow||document.defaultView).innerHeight;
    
        return {width:clientWidth, height:clientHeight};
    }

  componentDidUpdate() {
    // console.log(document.documentElement.clientHeight)
    this.fadeInOut();


        //присваивает позиционирование, зависит от innerWidth
        let client_W=window.innerWidth;
        let client_H=window.innerHeight;
        if(client_W<=768){
            this.BlockWindowWrap.style.position="absolute"
        }else{
            this.BlockWindowWrap.style.position="fixed";
        }
}

    //Объявляем
    componentDidMount() {
        this.detectTheThing();

        let clH=document.documentElement.clientHeight;

        this.setState({
            clH:clH, 
        })

        window.addEventListener("mousedown", this.onMouseDown);
        window.addEventListener("mouseup", this.forceMouseUp);
        window.addEventListener("mousemove", this.mouseMove);

        window.addEventListener("touchmove", this.touchmove);
        window.addEventListener('resize', this.resizeFunc);

        // this.BlockWindowWrap.addEventListener("mouseup", this.onMouseUp, false);
        window.addEventListener("mouseup", this.selActiveEl, false);

    };
    //Удаляем
    componentWillUnmount() {

        window.removeEventListener("mousedown", this.onMouseDown);
        window.removeEventListener("onmouseup", this.forceMouseUp);
        window.removeEventListener("mousemove", this.mouseMove);

        window.removeEventListener("touchmove", this.touchmove);
        window.addEventListener('resize', this.resizeFunc);

        window.removeEventListener("mouseup", this.selActiveEl, false);
    };

    static getDerivedStateFromProps(props, state) {
        let isHide = true;
        let isFirstRun=state.isFirstRun;
        let isReRecord=state.isReRecord;

        if (props.CallBack && props.isCallBack) {
            isHide = false;
        }
        if (props.Mail && props.isMail) {
            isHide = false;
        }
        if (props.Chat && props.isChat) {
            isHide = false;
        }


        if (props.CallBack && props.isCallBack&&state.isReRecord) {
            isFirstRun = false;
            isReRecord = false;
        }
        if (props.Mail && props.isMail&&state.isReRecord) {
            isFirstRun = false;
            isReRecord = false;
        }
        if (props.Chat && props.isChat&&state.isReRecord) {
            isFirstRun = false;
            isReRecord = false;
        }

        return {
            displayWindow: isHide,
            isFirstRun:isFirstRun,
            isReRecord:isReRecord
        };
    };


    render() {
        // console.log('inputFieldIisActive',this.state.inputFieldIisActive)


        // console.log("начальный размер экрана",this.state.clH);
        let { btn, title, welcome, status, CallBack, Mail, Chat, isCallBack, isMail, isChat } = this.props; //деструктуризация
        let { textMessage, newMessage, lengthArr, selectedSmile, obj, messageListLenght2, dialogueCompleted, activeTab, hideRatingFinishSession } = this.state;
        // console.log("startX",this.state.startX,"startY", this.state.startY)
        // console.log("startWidth",this.state.startWidth,"startHeight", this.state.startHeight)
        // console.log("startTop",this.state.startTop,"startLeft", this.state.startLeft)
        // console.log("..startDropY",this.state.startDropY,this.props.scrollTOP)
        // console.log("startTop",this.state.startTop)

        return (
            <div 
                //  контроль для Zиндекса для разных окон
                onMouseDown={() => this.changeZIndex("click")}
                style={{
                    // position: "absolute",
                    top: this.state.locationY + "px", //начальные координты
                    left: this.state.locationX + "px",
                    width: this.state.sizeX + "px",
                    height: this.state.sizeY + "px",
                    zIndex: this.state.zindex,
                    display:"none",
                }}
                className={"BlockWindowWrap-"+this.state.displayWindow}
                ref={BlockWindowWrap => { this.BlockWindowWrap = BlockWindowWrap; }}//ref="bla" //второй способ через ref
            >
                <div
                    onMouseDown={() => this.myResize("click3")}
                    onMouseUp={() => this.myResize("click4")}
                    className="header"
                    ref={refBlockWindowWrapHeader => { this.refBlockWindowWrapHeader = refBlockWindowWrapHeader; }}
                >
                </div>

                <div className="main" style={{ height: this.state.sizeY - 30 + "px" }}>

                    {CallBack && <CallBackComponent
                        openIsCallBack={this.props.isCallBack}
                        getStatusClose={this.close}

                        getWindowСondition={this.getWindowСondition}

                        showCallback={this.state.showCallback}
                        showThanksCallback={this.state.showThanksCallback}

                        //test////////////////////
                        errorcall={this.props.errorcall}
                        ///////////////////////////
                    />}

                    {Mail && <MailComponent
                        openIsMail={this.props.isMail}
                        getStatusClose={this.close}

                        getWindowСondition={this.getWindowСondition}

                        showMail={this.state.showMail}
                        showThanksMail={this.state.showThanksMail}


                        //test////////////////////
                        errormail={this.props.errormail}
                        ///////////////////////////                        
                    />}

                    {Chat && <ChatComponent
                        openIsChat={this.props.isChat}
                        status={this.props.status}
                        getWindowСondition={this.getWindowСondition}

                        showChat={this.state.showChat}
                        showChatRating={this.state.showChatRating}
                        showChatStartPage={this.state.showChatStartPage}

                        sizeY={this.state.sizeY}
                        sizeX={this.state.sizeX}
                        sizeXentryField={this.state.sizeX-85}//fix

                        cbgetNumberUnreadMessages={this.cbgetNumberUnreadMessages}
                        cbTouchClick={this.cbTouchClick}

                        //test////////////////////
                        hasErrors={this.props.hasErrors}
                        authorized={this.props.authorized}
                        ///////////////////////////       
                        
          //данные и пользователе

          // nameChat:"121134143",
          // numberChat: "+375298383838",
          // requestFrom:"ib_auth",
          // device:"iphone38",
          // crmId: "1-6RDFYP0",
          nameChat={this.props.nameChat}
          numberChat={this.props.numberChat}
          requestFrom={this.props.requestFrom}
          device={this.props.device}
          crmId={this.props.crmId}
          /////////////
                    />}

                </div>
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
