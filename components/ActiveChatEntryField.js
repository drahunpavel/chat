import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './ActiveChatEntryField.scss';
import './ChooseSmiley.scss';

let allSmilies = require("../src/allSmilies.json");

class MessageField extends React.Component {

    state = {
        allSmiliesArr: allSmilies,

        //переключатель окна выбора смайлов, по умолчанию выключено=false
        selectionWindowSmile: false,

        textMessage: "",
    }



    //функция открытия окна смайликов в чате
    openWindowSmiles = () => {
        console.log("The window with smiles");
        this.setState({
            selectionWindowSmile: !this.state.selectionWindowSmile
        });
    };

    //получает текст из поле ввода
    getMessageText=(EO)=>{
        if(EO!=undefined){
            // this.setState({
            //     textMessage: EO.target.innerText,
            // });
        }
        if(window.getSelection){
            let sel2 = window.getSelection();
            return sel2;
        }
    };

    //добавляет смайлы в поле ввода
    addEmotions=(EO)=>{
        console.log(EO.target.title)
        let imgToString;
        if(EO.target.title){

        let smile=EO.target.title;
        let inputElement=ReactDOM.findDOMNode(this.inputElement);

        //создание тега img
        let img = document.createElement("IMG");
        img.className ="emoji desc"+smile;
        img.src="/src/images/opacity.png";

        if(window.getSelection){
            let sel=this.getMessageText();
            // if (sel.getRangeAt && sel.rangeCount) {

            //     let currentInputElement = sel.focusNode.tagName ? sel.focusNode : sel.focusNode.parentNode;

            //     console.log(sel.focusNode.tagName, sel.focusNode, sel.focusNode.parentNode)
            //     let currentBlockElement = ReactDOM.findDOMNode(this.inputElementContainer); 

            //     console.log("---1",currentInputElement)

            //     if(currentInputElement === inputElement){
            //         let range = window.getSelection().getRangeAt(0);
            //         range.insertNode(img);
            //         this.SetCursorAfterElement(img);
            //         return true;
            //     }            
            // }
        }
            inputElement.appendChild(img);
            this.SetCursorToEnd(inputElement);  


            // this.setState({
            //     textMessage:this.state.textMessage+imgToString,
            // })
        }  
    }
    //устанавливает курсор в конец элемента
    SetCursorToEnd=(inputElement)=> {
        inputElement.focus();
        if (window.getSelection && document.createRange) {
            let range = document.createRange();
            range.selectNodeContents(inputElement);
            range.collapse(false);
            this.SetRange(range);
        }
    };  

    SetRange=(range)=> {
        if (document.getSelection) {
            let sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
    //устанавливает курсос после смайла
    SetCursorAfterElement=(el)=> {
        var range = document.createRange();
        range.setStartAfter(el);
        range.setEndAfter(el);
        this.SetRange(range);
    }

    // при отправке сообщения заменяет теги img на ID смайла
    sendMessage = () => {
        console.log("Send Message");
        let input=ReactDOM.findDOMNode(this.inputElement);
        //console.log(input.innerHTML)
        let contentInput=input.innerHTML;
        let newContentInput =this.conversionText(contentInput);
        //console.log(contentInput)
        this.setState({
            text:newContentInput,
            selectionWindowSmile:false,
        })
        input.innerHTML="";


        //console.log(this.state.messageList)

        // let newMessage = {};

        //console.log(this.state.textMessage.length)
        // if (this.state.textMessage.length > 1) {
        //     //если нет символов, пустое поле не будет отправляться в чат
        //     let messageListCounter = this.state.messageListLenght2 + 1;
        //     newMessage["code"] = messageListCounter;
        //     newMessage["id"] = "user";
        //     newMessage["message"] = this.state.textMessage;

        //     let addNewMessage = this.state.messageList.concat(newMessage);

        //     //this.state.messageList2++;
        //     this.setState({
        //         // newMessage:this.state.newMessage,
        //         messageList: addNewMessage,
        //         messageListLenght2: messageListCounter,
        //         textMessage: "",
        //         sendMessageUpdate: true, //при отправки сообщения состояние true
        //         selectionWindowSmile: false
        //         //sendMessageUpdate:
        //     });
        // }
    };

    conversionText=(text)=>{
        let textMessage=text;
        let allTagImgArr = text.match(/\<img([^>]*)>/gi);
        let allTextDesc;
        let allSmileDeskArr=[];
        
        if(allTagImgArr!=null){            
            for(let i=0;i<allTagImgArr.length;i++){
                allTextDesc=allTagImgArr[i].match(/emoji descD83D[\w]{4}/gi);//вырезает значение класса
                allSmileDeskArr.push(allTextDesc);
                textMessage=this.replacingEmotionDescription(textMessage,allTagImgArr[i],allSmileDeskArr[i][0]);
            }
        }
        console.log("Sent Message:",textMessage);
        this.setState({
            textMessage:textMessage,
        })
    };

    replacingEmotionDescription=(text,imgSmile,nameSmile)=>{
        //console.log("--1",nameSmile)
            //console.log("--myFunc",imgSmile,nameSmile);
            let newreg= RegExp(imgSmile,'g');
            let str=nameSmile;  
            //console.log(newreg,str)
           
            let transText=text.replace(newreg," :"+str+": ");
        //return deskSmile;
        
        return transText;
    };

    //скроллит окно ввода сообщения вниз при каждом выборе смайла
    scrollInputFields=()=>{
        let inputElement=ReactDOM.findDOMNode(this.inputElement);
        inputElement.scrollIntoView(false);
    }

    render() {
        let { smileID } = this.props; //деструктуризация
        let { textMessage } = this.state; //деструктуризация
        //console.log("textMessage",textMessage)
        return (


            <div className="ActiveChatEntryField">

                <form className="ActiveChatEntryFieldText">
                    <div data-type="input" data-text="Напишите что-нибудь" className="MessageField"  ref={(node)=>{this.inputElement=node}} autoFocus  contentEditable="true" tabIndex="1" onInput={this.getMessageText} ></div>
                </form>

                <div
                    className={this.state.selectionWindowSmile ? "WindowSmilies" : "WindowSmiliesNone"}
                    style={{ backgroundColor: "white" }}
                    onClick={(EO)=>{this.addEmotions(EO);this.scrollInputFields()}}>
                    {this.state.allSmiliesArr.map(v =>
                        <div className="Emoji_Smile" emoji={v.title} key={v.code}>
                            <div>
                                <i className={v.className} title={v.title}></i>
                            </div>
                        </div>
                    )}
                </div>

                {/*кнопка Открыть\закрыть окно со смайлами */}
                <div className={
                        this.state.selectionWindowSmile
                            ? "ActiveChatFooterSmileActive"
                            : "ActiveChatFooterSmile"
                    }
                    onClick={this.openWindowSmiles}
                />

                {/* кнопка Отправки сообщения */}
                <div className="ActiveChatFooterButton" onClick={this.sendMessage} />

            </div>


        )
    }

};
export default MessageField;
