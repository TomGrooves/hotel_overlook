import React, {useState, useEffect} from 'react'
import Style from './carousel.module.scss'
import {RiArrowLeftCircleLine, RiArrowRightCircleLine} from 'react-icons/ri'
// takes array of img url and text
// every x second increment shown array

function Carousel (props) {

    const items = props.items;
    const height = props.height;
    const delay = props.delay || 7;
    const buttonHeight = props.buttonHeight;
    const [pos, setPos] = useState(0)

    const posHandler = (i) => {
       if (i === "decre"){
           let res = pos -1
           if (res < 0){
               setPos(items.item.length-1)
           }
           else {
               setPos(pos -1)
           }
       }
       if (i === "incre"){
           let res = pos +1
           if (res >= items.item.length){
               setPos(0)
           }
           else {
               setPos(pos +1)
           }
       }
    }

    const carouselbutton = {
        top: buttonHeight,
    }

    const imageStyle = {
            width: "100%",
            height: height || "45vh",
            backgroundPositionY: "80%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            posHandler("incre")
        }, delay+"000");
        return () => {
            clearTimeout(timer)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pos])

    return (
        <section>
            {
            items.item.map((item, index) => {
               if  (pos === index){
                return  <div key={index} className={Style.container}>
                    <span style={carouselbutton} className={Style.buttonleft} onClick={()=>{posHandler("decre")}}><RiArrowLeftCircleLine/></span>
                        <div style={{...imageStyle, backgroundImage:`url(${item.img})`}}></div>
                        {item.text && <p>{item.text}</p>}
                    <span style={carouselbutton} className={Style.buttonright} onClick={()=>{posHandler("incre")}}><RiArrowRightCircleLine/></span>
                    </div>
                }
                else {
                    return null
                }
                })}
        </section>
    )
}
export default Carousel