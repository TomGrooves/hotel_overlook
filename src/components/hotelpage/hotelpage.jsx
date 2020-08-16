import React, {useState, useEffect} from 'react';
import style from './hotelpage.module.scss'
import Accordion from '../accordian/accordion'
import Carousel from '../carousel/carousel';
import header from '../../Vektor/headernew.svg';
import ImageBox from '../imagebox/imageBox';
import Stars from '../../Vektor/star-icon.svg';
import {FcCheckmark} from 'react-icons/fc'
import {useLocation, Link} from 'react-router-dom'
import Modal from '../modal/modal';

function HotelPage(props) {

    let location = useLocation();

    useEffect(() => {
        props.setCurrentLocation(location.pathname)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    const [countries, setCountries] = useState([])
    const [activeCountry, setActiveCountry] = useState(1)
    const [cities, setCities] = useState([])
    const [selectedCity, setSelectedCity] = useState(0)
    const [singleCity, setSingleCity] = useState([])
    const [hotels, setHotels] = useState([])
    const [selectedHotel, setSelectedHotel] = useState(0)
    const [singleHotel, setSingleHotel] = useState([])
    const [countryName, setCountryName] = useState("")
    const [selectedHotelRoom, setSelectedHotelRoom] = useState(0)
    const [singleHotelRoom, setSingleHotelRoom] = useState()

    const fetchCountries = async () => {
        let countryUrl = "https://api.mediehuset.net/overlook/countries"
        let countries = await props.doFetch(countryUrl)
        setCountries(countries)
    }

    const fetchCities = async () => {
        let cityUrl = `https://api.mediehuset.net/overlook/cities/by_country/${activeCountry}`
        let cities = await props.doFetch(cityUrl)
        setCities(cities)
    }

    const fetchSingleCity = async () => {
        let cityUrl = `https://api.mediehuset.net/overlook/cities/${selectedCity}`
        let city = await props.doFetch(cityUrl)
        setSingleCity(city)
    }

    const fetchHotelsByCity = async () => {
        let hotelUrl = `https://api.mediehuset.net/overlook/hotels/by_city/${selectedCity}`
        let hotels = await props.doFetch(hotelUrl)
        setHotels(hotels)
    }

    const fetchSpecificHotel = async () => {
        let singleHotelUrl = `https://api.mediehuset.net/overlook/hotels/${selectedHotel}`
        let singleHotel = await props.doFetch(singleHotelUrl)
        setSingleHotel(singleHotel)
    }

    const fetchSingleHotelRoom = async () => {
        let singleRoomUrl = `https://api.mediehuset.net/overlook/rooms/${selectedHotelRoom}`
        let singleHotelRoom = await props.doFetch(singleRoomUrl)
        setSingleHotelRoom(singleHotelRoom)
    }

    const makeTeaser = (text) => {
        let teaserText = text.substring(0,160) + "...";
        return teaserText
    }

    useEffect(() => {
        fetchCountries()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setCities([])
        setSelectedCity(null)
        setHotels([])
        setSelectedHotel(null)
        setSingleHotel([])
        fetchCities()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCountry])

    useEffect(() => {
        if (!selectedCity == 0){
            fetchHotelsByCity()
            fetchSingleCity()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCity])

    useEffect(() => {
        if (!selectedHotel == 0){
            fetchSpecificHotel()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedHotel])

    useEffect(() => {
        if (!selectedHotelRoom == 0){
            fetchSingleHotelRoom()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedHotelRoom])


    return (
        <>
        <Carousel delay="10" height="70vh" buttonHeight="35vh" items={props.carouselItems}></Carousel>
        <div className={style.headerlogo}>
            <img alt={"carouselimage"} src={header}></img>
            <h4 className={style.headertext}>HOTELLER OG DESTINATIONER</h4>
        </div>


        <ul className={style.topnav}>
            <li onClick={()=>{setActiveCountry(1);setCountryName("Danmark")}}>{activeCountry === 1 ? <b>Danmark</b> : <p>Danmark</p>}</li>
            <li onClick={()=>{setActiveCountry(2);setCountryName("Sverige")}}>{activeCountry === 2 ? <b>Sverige</b> : <p>Sverige</p>}</li>
            <li onClick={()=>{setActiveCountry(3);setCountryName("Finland")}}>{activeCountry === 3 ? <b>Finland</b> : <p>Finland</p>}</li>
            <li onClick={()=>{setActiveCountry(4);setCountryName("Norge")}}>{activeCountry === 4 ? <b>Norge</b> : <p>Norge</p>}</li>
            <li onClick={()=>{setActiveCountry(5);setCountryName("Tyskland")}}>{activeCountry === 5 ? <b>Tyskland</b> : <p>Tyskland</p>}</li>
            <li onClick={()=>{setActiveCountry(6);setCountryName("Polen")}}>{activeCountry === 6 ? <b>Polen</b> : <p>Polen</p>}</li>
            <li onClick={()=>{setActiveCountry(7);setCountryName("Island")}}>{activeCountry === 7 ? <b>Island</b> : <p>Island</p>}</li>
        </ul>

        {!selectedHotel && !selectedCity &&
        <section className={style.topcontainer}>
            <article>
                {countries && countries.items && countries.items.map((item, index) => {
                    if (item.id == activeCountry){
                        return (<div key={index}><h4>Vores hoteller i {item.name}</h4><p>{item.description}</p></div>)
                    }
                    else{
                        return null
                    }
                })}
            </article>
        </section>
        }

        <article className={style.maincontainer}>
        {!selectedCity &&
        <section className={style.gridcontainer}>
                {cities && cities.items && cities.items.map((item, index) => {
                    return (
                        <div className={style.griditem} key={index} onClick={()=>{setSelectedCity(item.id)}}
                        ><ImageBox url={item.image} height="25vh"></ImageBox>
                        <h4>{item.name}</h4>
                        <p>{makeTeaser(item.description)}</p>
                        </div>
                    )
                })}
        </section>
        }

        {selectedCity && !selectedHotel &&
            <>
           <section>
                    <>
                    <div className={style.citytopcontainer}>
                        <h4>Vores hoteller i {singleCity && singleCity.item && singleCity.item.name}</h4>
                        <p>{singleCity && singleCity.item && singleCity.item.description}</p></div>
                    </>
            </section>

            <section className={style.hotelgridcontainer}>
                {hotels && hotels.items && hotels.items.map((item, index) => {
                    return ( 
                    <div className={style.griditem}  key={index}>
                        <div onClick={()=>{setSelectedHotel(item.id)}}>
                        <ImageBox url={item.image} height="25vh"></ImageBox>
                        <h4>{item.title}</h4>
                        <p>{makeTeaser(item.teaser)}</p>
                        <img alt={item.title} className={style.stars} src={Stars}></img>
                        </div>
                        <Modal child={
                            <div className={style.commentsection}>
                                <h3>{item.title}</h3>
                                <p className={style.teasertext}>{item.teaser}</p>
                            <form>
                                <label>Kommenter hotel:</label>
                                <input name="comment" placeholder="Skriv kommentar"></input>
                                <label htmlFor="stars">Giv stjerner</label>
                                <select name="stars">
                                    <option value="1">1 stjerner</option>
                                    <option value="2">2 stjerner</option>
                                    <option value="3">3 stjerner</option>
                                    <option value="4">4 stjerner</option>
                                    <option value="5">5 stjerner</option>
                                </select>
                            </form>
                            </div>
                        }></Modal>
                    </div> 
                    )
                })}
            </section>
                <section className={style.sidemenu}>
                    <b>Se andre byer i {countryName}</b>
                    {cities && cities.items && cities.items.map((item, index) => {
                        return (
                            <p key={index} onClick={() => {setSelectedCity(item.id)}}>{item.name}</p>
                        )
                    })}
                </section>
        </>
        }
         {singleHotel && singleHotel.item &&
            <>
            <section>
                    <>
                    <div className={style.hoteltopcontainer}><h4>{singleHotel.item.title}</h4><p>{singleHotel.item.teaser}</p></div>
                    <h3>Vores værelser</h3>
                    </>
                    
            </section>

            <section className={style.roomcontainer}>
            <div>
            {
            singleHotel && singleHotel.item && singleHotel.item.rooms && singleHotel.item.rooms.items.map((item, index) => {
                    return (
                        <Accordion key={index} title ={
                            <div onClick={() => {setSelectedHotelRoom(item.id)}} className={style.accordgriditem}>
                                <img alt={item.room_title} className={style.accord_topimg} src={item.images[0].image}></img>
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
                                        return <div key={index}><FcCheckmark className={style.checkmark}/>
                                        <p className={style.checkmarktext}>{item.title}</p>
                                        </div>
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
                })
            }
            </div>
            <section className={style.sidemenufacilities}>
                <b>Hotel information</b>
                <p>{singleHotel.item.address}</p>
                <p>{singleHotel.item.phone}</p>
                <b>Faciliteter</b>
                {singleHotel.item && singleHotel.item.facilities.map((item, index) => {
                    return (
                        <p key={index}>{item.title}</p>
                        )
                    })}
                <button>Like</button>
            </section>
            </section>
            </>
            }
        </article>
        </>
    )
}

export default HotelPage