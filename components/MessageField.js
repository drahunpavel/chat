import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './MessageField.scss';




class MessageField extends React.Component {

    state = {
        textMessage: '',
        sel:null,
        img:null,
    }

    getMessageText=(e)=>{        
        if(window.getSelection){
            let sel2 = window.getSelection();
            return sel2;
        }
    }

    addEmotions=(EO)=>{

        if(EO.target.title){
            let smile=EO.target.title;
            console.log(smile)
            let inputElement=ReactDOM.findDOMNode(this.inputElement);

            //создание тега img
            let img = document.createElement("IMG");
            img.className ="emoji desc"+smile;
            img.src="img/opacity.png";
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
        }   
    }

    render() {
        let { smileID } = this.props; //деструктуризация
        
        return (
            <form className="ActiveChatEntryFieldText">
                  <div data-type="input" placeholder="Напишите что-нибудь" className="MessageField"  ref={(node)=>{this.inputElement=node}} autoFocus  contentEditable="true" tabIndex="1" onInput={this.getMessageText} ></div>
            </form>
        )
    }

};
export default MessageField;
