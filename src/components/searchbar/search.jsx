import React, {useState, useEffect} from 'react';
import style from './search.module.scss';
import {Link} from "react-router-dom";

function Search(props) { 

    // set states needed by component
    const [countries, setCountries] = useState([])
    const [activeCountry, setActiveCountry] = useState(1)
    const [cities, setCities] = useState([])
    const [selectedCity, setSelectedCity] = useState(0)
    const [hotels, setHotels] = useState([])
    const [selectedHotel, setSelectedHotel] = useState(0)

    // fetch all countries
    const fetchCountries = async () => {
        let countryUrl = "https://api.mediehuset.net/overlook/countries"
        let countries = await props.doFetch(countryUrl)
        setCountries(countries)
    }

    // fetch all cities by selected country
    const fetchCities = async () => {
        let cityUrl = `https://api.mediehuset.net/overlook/cities/by_country/${activeCountry}`
        let cities = await props.doFetch(cityUrl)
        setCities(cities)
    }

    // fetch all hotels by selected city
    const fetchHotelsByCity = async () => {
        let hotelUrl = `https://api.mediehuset.net/overlook/hotels/by_city/${selectedCity}`
        let hotels = await props.doFetch(hotelUrl)
        setHotels(hotels)
    }

    // fetch rooms by selected hotel
    const fetchSpecificHotel = async () => {
        let singleHotelUrl = `https://api.mediehuset.net/overlook/hotels/${selectedHotel}`
        let singleHotel = await props.doFetch(singleHotelUrl)
        props.setSearchResult(singleHotel)
    }

    // fetch all countries when component mounts
    useEffect(() => {
        fetchCountries()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // reset states when active country changes
    useEffect(() => {
        setCities([])
        setSelectedCity(null)
        setHotels([])
        setSelectedHotel(null)
        fetchCities()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCountry])

    // fetch all hotels by city when selected city changes
    useEffect(() => {
        if (!selectedCity == 0){
            fetchHotelsByCity()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCity])

    // function to fetch results when user clicks button
    const doSearch = () => {
        fetchSpecificHotel()
    }

    // return html and concent for searchbar
    return (
        <form className={props.vert ? style.searchbarvert : style.searchbar}>
           <div className={style.description}><b>Find dit værelse</b></div>
           <div>
                <label>Vælg land</label>
                <select defaultValue={null} onChange={(e)=>{setActiveCountry(e.target.value)}}>
                    <option>Vælg land</option>
                    {countries && countries.items && countries.items.map((item, index) => {
                        return <option key={index} value={item.id}>{item.name}</option>
                    })}
                </select>
            </div>
            <div>
                <label>Vælg by</label>
                <select defaultValue={null} onChange={(e)=>{setSelectedCity(e.target.value)}}>
                <option>Vælg by</option>
                {cities && cities.items && cities.items.map((item, index) => {
                        return <option key={index} value={item.id}>{item.name}</option>
                    })}
                </select>
            </div>
            <div>
                <label>Vælg hotel</label>
                <select defaultValue={null} onChange={(e) => {setSelectedHotel(e.target.value)}}>
                <option>Vælg hotel</option>
                {hotels && hotels.items && hotels.items.map((item, index) => {
                        return <option key={index} value={item.id}>{item.title}</option>
                    })}
                </select>
            </div>

            <div>
                <label>Check-in</label>
                    <input type="date" name="checkin"/>
            </div>
            <div>
                <label>Check-ud</label>
                    <input type="date" name="checkud"/>
            </div>
            <div>
                <label>Antal Personer</label>
                <select onChange={(e)=>{props.setSearchPersons(e.target.value)}} name="Antal personer">
                    <option value="Antal personer">Vælg antal personer</option>
                    <option value={"1"}>1</option>
                    <option value={"2"}>2</option>
                    <option value={"3"}>3</option>
                    <option value={"4"}>4</option>
                    <option value={"5"}>5</option>
                    <option value={"6"}>6</option>
                </select>
            </div>
            <Link className={style.searchlink} onClick={() => doSearch()} to="/søg"><button className={style.searchbutton}>Søg</button></Link>
        </form>
        
    )
}

export default Search