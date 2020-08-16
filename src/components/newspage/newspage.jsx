import React, {useEffect} from 'react'
import style from './newspage.module.scss';
import {useLocation, Link} from 'react-router-dom'


function NewsPage(props) {

    let location = useLocation();

    useEffect(() => {
        props.setCurrentLocation(location.pathname)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    const convertTime = (timestamp) => {
        const milliseconds = timestamp * 1000
        const newDate = new Date(milliseconds)
        const stringDateDay = newDate.toString().substring(0,3)
        const stringDateMonth = newDate.toString().substring(4,10)
        const stringDateYear = newDate.toString().substring(11,15)
        const stringDateTime = newDate.toString().substring(16,24)
        const concDate = `${stringDateDay} ${stringDateMonth}, ${stringDateYear}, ${stringDateTime}`
        return concDate
    }

    return (
        <article className={style.newscontainer}>
            {props.singleNews && props.singleNews.item &&
            <>
            <img alt={props.singleNews.item.title} src={props.singleNews.item.image}></img>
            <h2>{props.singleNews.item.title}</h2>
            <p>{convertTime(props.singleNews.item.datetime)}</p>
            <p>{props.singleNews.item.content}</p>
            <Link to="/"><button>Tilbage</button></Link>
            </>
        }
        </article>
    )
}

export default NewsPage