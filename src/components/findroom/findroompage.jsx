import React, {useState, useEffect} from 'react'
import style from './findroompage.module.scss'
import Search from '../searchbar/search';
import Carousel from '../carousel/carousel';
import header from '../../Vektor/headernew.svg'
import Accordion from '../../components/accordian/accordion'
import {FcCheckmark} from 'react-icons/fc'
import {useLocation, Link} from 'react-router-dom'

function FindRoomPage(props) {

    let location = useLocation();

    
    useEffect(() => {
        props.setCurrentLocation(location.pathname)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    const [selectedHotelRoom, setSelectedHotelRoom] = useState(0)
    const [singleHotelRoom, setSingleHotelRoom] = useState()

    useEffect(() => {
        if (!selectedHotelRoom == 0){
            fetchSingleHotelRoom()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedHotelRoom])

    const fetchSingleHotelRoom = async () => {
        let singleRoomUrl = `https://api.mediehuset.net/overlook/rooms/${selectedHotelRoom}`
        let singleHotelRoom = await props.doFetch(singleRoomUrl)
        setSingleHotelRoom(singleHotelRoom)
    }
    
    return (
        <>
        <Carousel delay="10" height="70vh" buttonHeight="35vh" items={props.carouselItems}></Carousel>
        <div className={style.headerlogo}>
            <img alt={"carouselimage"} src={header}></img>
            <h4 className={style.headertext}>FIND DIT VÆRELSER</h4>
        </div>
        <section className={style.maincontainer}>
            <div>
                <h3>Find dit værelse</h3>
                <div className={style.roomcontainer}>
                    {props.searchResult && props.searchResult.item && props.searchResult.item.rooms && props.searchResult.item.rooms.items && props.searchResult.item.rooms.items.map((item, index) => {   
                       if (props.searchPersons <= item.num_persons){
                       return (
                                <Accordion key={index} title ={
                                <div onClick={() => {setSelectedHotelRoom(item.id)}} key={index} className={style.griditem}>
                                    <img alt={item.hotel_name} className={style.accord_topimg} src={item.images[0].image}></img>
                                    <div className={style.accord_topdiv}>
                                        <h3>{item.room_title}</h3>
                                        <h4>{item.hotel_name}</h4>
                                        <p>{item.area} - Plads til {item.num_persons} personer</p>
                                        <p>{item.description}</p>
                                    <b>Fra {item.day_price_normal}</b>
                                    </div>
                                </div>
                                }
                                child = {
                                    singleHotelRoom && singleHotelRoom.item &&
                                    <div className={style.accord_innerdiv}>
                                    <img alt={item.room_title} src={item.images[0].image}></img>
                                        <div>
                                            <h3>{item.room_title}</h3>
                                            <p>{item.area} - Plads til {item.num_persons} personer</p>
                                            <p>{item.description}</p>
                                        </div>
                                    <p className={style.accord_faciltitle}>Værelset er udstyret med:</p>
                                    <section className={style.accordiongrid}>
                                        {singleHotelRoom.item.facilities.map((item, index) => {
                                        return <div key={index}><FcCheckmark className={style.checkmark}/><p className={style.checkmarktext}>{item.title}</p></div>
                                    })}
                                    </section>
                                    <div className={style.pricegrid}>
                                        <div className={style.innerpricegrid}>
                                            <b>NORMAL pris - inkl. morgenmad</b>
                                            <p>Kan ikke ændres eller afbestilles</p>
                                            <h4>{singleHotelRoom.item.day_price_normal} </h4><h5>DKK/nat</h5>
                                            <Link to="/reservation"><button>Book</button></Link>
                                        </div>
                                        <div className={style.innerpricegrid}>
                                            <b>FLEX pris - inkl. morgenmad</b>
                                            <p>Kan ikke ændres eller afbestilles</p>
                                            <h4>{singleHotelRoom.item.day_price_flex}</h4> <h5>DKK/nat</h5>
                                            <Link to="/reservation"><button>Book</button></Link>
                                        </div>
                                    </div>
                                    </div>
                                }
                                >
                            </Accordion>
                        )
                        }
                        else{
                            return null
                        }
                    })}
                </div>
            </div>
            <div className={style.searchContainer}>
                <h4>Søg</h4>
                <Search setSearchPersons={props.setSearchPersons} doFetch={props.doFetch} vert={true} setSearchResult={props.setSearchResult}/>
            </div>
        </section>
        </>
    )
}

export default FindRoomPage