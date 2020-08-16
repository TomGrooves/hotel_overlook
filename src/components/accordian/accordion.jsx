import React, {useState} from 'react'
import style from './accordion.module.scss';
import {RiArrowDownSLine} from 'react-icons/ri'
import {RiArrowUpSLine} from 'react-icons/ri'

function Accordion(props) {
    
    
    const child = props.child || "Indlæser....Hvis ikke denne åbner. Så luk den og prøv igen"
    const width = props.width || "auto"
    const title = props.title || "Accordian"
    //const bgcolor = props.bgcolor || "rgb(120, 120, 240)"
    //const fontsize = props.fontsize || "1.3rem"


    const [active, setActive] = useState(false)
    
    const shown = {
        height: "auto",
        display: "block",
        transition: "all 0.4s ease-out",
        textAlign: "center",
        margin: "auto",
    }
    const hidden = {
        display: "none",
    }

    const wrapper = {
        boxShadow: "0px 6px 8px 1px rgba(0,0,0,0.2)",
        width: `${width}`,
        padding: "0",
        margin: "1%",
    }

    return (
    <section className={style.maincontainer} style={wrapper}>
    <div className={style.innercontainer} onClick={() => {active ? setActive(false): setActive(true)}} >{active ? "" : title}
    <article style={active ? shown: hidden}>{child}</article>
    <span className={style.arrow}>{active ? <RiArrowUpSLine />: <RiArrowDownSLine />}</span></div>
    </section>
    )
}

export default Accordion