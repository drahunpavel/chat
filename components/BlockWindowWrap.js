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
                beginResize: true,
            })
        }
        if (click === "click2") {
            console.log("click2")
            this.setState({
                beginResize: false,
                isStartedResize: false
            })
        }
        if (click === "click3") {
            console.log("click3")
            this.setState({
                beginDrop: true,
            })
        }
        if (click === "click4") {
            console.log("click4")
            this.setState({
                beginDrop: false,
                isStartedDrop: false,
                
            })
        }
    };




    mouseMove = (EO) => {
        
        if (this.state.beginResize === true) {

            //создаем стартовую точку
            if (!this.state.isStartedResize) {

                this.setState({
                    startX: EO.clientX,
                    startY: EO.clientY,

                    startWidth: this.BlockWindowWrap.offsetWidth,
                    startHeight: this.BlockWindowWrap.offsetHeight,

                    isStartedResize: true
                })
            }

            let deltaX = EO.clientX - this.state.startX;
            let deltaY = EO.clientY - this.state.startY;

            console.log("Начальные ширина/высота: " + this.state.startWidth + ":" + this.state.startHeight);
            console.log("---------------");

            console.log("дельта смещения: " + deltaX + ":" + deltaY);
            console.log("---------------");

            //new coordinates when resizing + limitation
            let width = this.state.startWidth + deltaX;
            (width < 300 && (width = 300)) || (width > 800 && (width = 800)); //max size width
            let height = this.state.startHeight + deltaY;
            (height < 300 && (height = 300)) || (height > 627 && (height = 627));//max size height
            console.log("реальное изменение размера " + width + ":" + height);
            console.log("---------------");

            this.setState({
                sizeX: width,
                sizeY: height,
            })

        }
        if (this.state.beginDrop === true) {

            //создаем стартовую точку
            if (!this.state.isStartedDrop) {

                this.setState({
                    // startX: EO.clientX,
                    // startY: EO.clientY,

                    startWidth: this.BlockWindowWrap.offsetWidth,
                    startHeight: this.BlockWindowWrap.offsetHeight,

                    
                    startDropX:EO.clientX,
                    startDropY:EO.clientY,

                    startTop : this.BlockWindowWrap.offsetTop,
                    startLeft : this.BlockWindowWrap.offsetLeft,


                    isStartedDrop: true
                })
            }

            let deltaDX = EO.clientX- this.state.startLeft;
            let deltaDY = EO.clientY- this.state.startTop;

            // console.log("Начальные ширина/высота: " + this.state.startWidth + ":" + this.state.startHeight);
            // console.log("---------------");

            // console.log("дельта смещения: " + deltaX + ":" + deltaY);
            // console.log("---------------");

            let arrElementData=this.BlockWindowWrap.getBoundingClientRect();
            
            //console.log(arrElementData)
            // let arrTop=arr.top;
            // let arrLeft=arr.left;
            // console.log("arrLeft "+arrLeft+" arrTop "+arrTop)

            // let shiftX = EO.pageX - arrLeft;
            // let shiftY = EO.pageY - arrTop;

            // console.log("shiftX "+shiftX+" shiftY "+shiftY)


            let getCoordsY=arrElementData.top+pageYOffset;
            let getCoordsX=arrElementData.left+pageXOffset;
                //console.log('Начальные координаты: '+getCoordsX+'/'+getCoordsX)
 //сдвиг курсора относительно верхнего левого угла shiftx/y
            let shiftx=EO.pageX-getCoordsX;
            let shifty=EO.pageY-getCoordsY;
                //console.log('относительно верхнего левого угла: '+shiftx+'/'+shifty)

            //console.log(this.BlockWindowWrap.offsetWidth-EO.clientX)



            
            //window sizes
            let clientWidth=window.innerWidth;
            let clientHeight=window.innerHeight;

            let zzz=this.state.startDropX-this.state.startLeft;
            console.log(zzz)
            //new coordinates when moving + limitation
            let left = this.state.startLeft  + deltaDX-zzz;
            (left < 0 && (left = 0)) || (left > clientWidth-321 && (left = clientWidth-321)); //max size width
            let top = this.state.startTop + deltaDY-15;
            (top < 0 && (top = 0)) || (top > clientHeight-372 && (top = clientHeight-372));//max size height

            
            console.log("---------------");
            console.log('левый отступ '+this.state.startLeft)
            console.log('курсор на экране '+EO.clientX)
            console.log('Первый клик '+this.state.startDropX)
           // console.log(this.state.startDropX-this.state.startLeft)
            //console.log(this.state.startDropX+'/'+this.state.startDropY)

            console.log('длина окна '+this.BlockWindowWrap.offsetWidth)

            this.setState({
                locationX: left,
                locationY: top,
                position: "absolute"
            })

        }
    }



    forceMouseUp = () => {
        console.log('force mouseUp')//this.setstate {beginResize = false}
        this.setState({
            beginResize: false,
            beginDrop:false,
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
        //console.log(this.state.startDropX, this.state.startDropY, this.state.startTop, this.state.startLeft)
        
        return (

            <div

                style={{position:this.state.position, top: this.state.locationY + "px", left: this.state.locationX + "px", width: this.state.sizeX + "px", height: this.state.sizeY + "px" }}
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
                <div className="" onMouseDown={() => this.myResize('click1')} onMouseUp={() => this.myResize('click2')} ></div>
            </div>


        )

    }

}

export default BlockWindowWrap;