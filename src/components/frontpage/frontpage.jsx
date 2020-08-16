import React, {useEffect, useState} from 'react';
import GridBox from '../gridbox/gridbox';
import ImageBox from '../imagebox/imageBox';
import style from './frontpage.module.scss';
import Carousel from '../carousel/carousel';
import header from '../../Vektor/headernew.svg'
import { useLocation, Link } from 'react-router-dom'

function FrontPage(props) {

    let location = useLocation();

    useEffect(() => {
        props.setCurrentLocation(location.pathname)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])


    const [news, setNews] = useState([]);
    const [randomRooms, setRandomRooms] = useState([]);

    const fetchNews = async () => {
        let newsUrl = "https://api.mediehuset.net/overlook/news";
        let news = await props.doFetch(newsUrl)
        setNews(news)
    }
    
    const fetchRooms = async () => {
        let roomsUrl = `https://api.mediehuset.net/overlook/rooms/by_hotel/1`;
        let rooms = await props.doFetch(roomsUrl)
        setRandomRooms(rooms)
    }

    const fetchSelectedNews = async (id) => {
        let singleNewsUrl = `https://api.mediehuset.net/overlook/news/${id}` 
        let singleNews = await props.doFetch(singleNewsUrl)
        props.setSingleNews(singleNews)
    }

    useEffect(() => {
        let mounted = true;
        if(mounted){
            fetchNews()
            fetchRooms()
        }

    return () => mounted = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <section className={style.maincontainer}>
        <Carousel delay="10" height="70vh" buttonHeight="35vh" items={props.carouselItems}></Carousel>
        <div className={style.headerlogo}>
            <img alt={"logo"} src={header}></img>
            <h4 className={style.headertext}>VELKOMMEN TIL HOTEL OVERLOOK ONLINE</h4>
        </div>
        <section className={style.gridcontainer}>
        <h4>Se vores nyheder</h4>
        <GridBox gap="12px" className={style.gridbox} width="90%" columns="3" rows="1" child = {<>
            {news && news.items && news.items.map((item, index) => {
                // NEWS
                if (index < 3){
                return (
                    <div className={style.griditem} key={index}>
                         <ImageBox url={item.image} />
                        <h5>{item.title}</h5>
                        <p>{item.teaser}</p>
                        <Link to="/nyhed"><button id={item.id} onClick={(e) => {fetchSelectedNews(e.target.id)}}>Læs mere</button></Link>
                    </div>
                )   
            }
            else{
                return null
            }
        })
            }

          </>}>
        </GridBox>
        </section>
        
        <section className={style.gridcontainer}>
        <h4>Se udvalgte værelser</h4>
        <GridBox gap="12px" className={style.gridbox} width="90%" columns="3" rows="1" child = {<>
            
            {randomRooms && randomRooms.items && randomRooms.items.map((item, index) => {
                // ROOMS
                if (index < 3){
                return (
                    <div className={style.griditem} key={index}>
                        <ImageBox url={item.images[0].image} />
                        <h5>{item.room_title}</h5>
                        <p>{item.description}</p>
                    </div>
                )   
            }
            else{
                return null
            }
        })
            }
          </>}>
        </GridBox>
        </section>
        </section>
    )
}

export default FrontPage