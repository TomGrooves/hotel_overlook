import React, {useState, useEffect} from 'react'
import Style from './checkout.module.scss';
import {useLocation, Link} from 'react-router-dom'

function CheckOut (props) {

    // States for forms
    const [email, setEmail] = useState(null)
    const [firstName, setfirstName] = useState(null)
    const [lastName, setlastName] = useState(null)
    const [phone, setPhone] = useState(null)
    const [comment, setComment] = useState("")
    const [flexPrice, setFlexPrice] = useState(false)
    const [msgColor, setMsgColor] = useState("red")
    const [hotelID, setHotelID] = useState(null)
    const [roomID, setRoomID] = useState(null)
    const [numPersons, setNumPersons] = useState(null)
    const [checkIn, setCheckin] = useState(null)
    const [checkOut, setCheckOut] = useState(null)
    const [userID, setUserID] = useState(null)
    const [msg, setMsg] = useState("")

    let location = useLocation();

    useEffect(() => {
        props.setCurrentLocation(location.pathname)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])
    

    useEffect(() => {
        if (props.loginData){
            setUserID(props.loginData.user_id)
        }
        else if (!props.loginData){
            setMsg("Du skal være logget ind for at reservere")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    /// States and functions TO GET DATA FOR FORMS
    const [countries, setCountries] = useState([])
    const [activeCountry, setActiveCountry] = useState(1)
    const [cities, setCities] = useState([])
    const [selectedCity, setSelectedCity] = useState(0)
    const [hotels, setHotels] = useState([])
    const [selectedHotel, setSelectedHotel] = useState(0)
    const [singleHotel, setSingleHotel] = useState([])
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

    // Source: https://stackoverflow.com/questions/9873197/how-to-convert-date-to-timestamp
    const convertToTimestamp = (date) => {
        let converted = new Date(date).getTime();
        return converted/1000;
     }

    // Email validation with regex
    const validateEmail = (mail) =>  
    {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
  
          return (true)
      }
      else
      return (false)
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

    const orderTicket = () => {

        console.log("email is " + email)
        console.log("firstname is " + firstName)
        console.log("lastname is " + lastName)
        console.log("Phone is " +phone)
        console.log("comment is " + comment)
        console.log("PriceOption is " + flexPrice)
        console.log("HotelID is " + hotelID)
        console.log("RoomID is " + roomID)
        console.log("numPersons is " + numPersons)
        console.log("Unconverted checkin is " + checkIn)
        console.log("Unconverted checkOut is " + checkOut)

        if (userID && validateEmail(email) && firstName && lastName && phone && flexPrice && hotelID && roomID && numPersons && checkOut && checkIn){
        let formData = new FormData()
        let cCheckIn = convertToTimestamp(checkIn)
        let cCheckOut = convertToTimestamp(checkOut)

        formData.append("email", email.toString())
        formData.append("firstname", firstName.toString())
        formData.append("lastname", lastName.toString())
        formData.append("comment", comment.toString())
        formData.append("phone", parseInt(phone))
        formData.append("hotel_id", parseInt(hotelID))
        formData.append("room_id", parseInt(roomID))
        formData.append("user_id",parseInt(userID))
        formData.append("checkin", parseInt(cCheckIn))
        formData.append("checkout", parseInt(cCheckOut))
        formData.append("is_flex", flexPrice)
        formData.append("num_persons", numPersons)

        console.log(formData)
        let url = "https://api.mediehuset.net/overlook/reservations"
        fetch(url, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${props.loginData.access_token}`
            },
            body : formData,
        })
        .then(response => response.json())
        .then(json => console.log(json))
        .then(setMsgColor("green"))
        .then(setMsg("Din reservation er modtaget og du vil modtage en ordrebekærftelse på din mail indenfor få minutter. Du kan også følge eller slette din reservation fra menuen 'Mine reservationer' "))
            .catch(error => console.log(error))
        }
        else if (!validateEmail(email)){
            setMsg("Dette er ikke en gyldig email")
        }
        else if (!email){
            setMsg("Udfyld email")
        }
        else if (!firstName){
            setMsg("Udfyld fornavn")
        }
        else if (!lastName){
            setMsg("Udfyld efternavn")
        }
        else if (!phone){
            setMsg("Udfyld telefon")
        }
        else if (!hotelID){
            setMsg("Vælg hotel")
        }
        else if (!roomID){
            setMsg("Vælg rum")
        }
        else if (!numPersons){
            setMsg("Udfyld hvor mange personer")
        }
        else if (!checkIn){
            setMsg("Udfyld check ind dato")
        }   
        else if (!checkOut){
            setMsg("Udfyld check ud data")
        }
        else {
            setMsg("Der opstod en ukendt fejl. Prøv igen")
        }
    }

    return (
        <>
    <section className={Style.topheader}>
        <h2>Reserver dit foretrukne værelse</h2>
            <p>Her kan du vælge destination og værelsestype og gennemføre din Overlook booking.</p>
    </section>
    <section className={Style.maincontainer}>

        <section className={Style.formgrid}>
            <h3>Vælg destination</h3>
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
                <select defaultValue={null} onChange={(e) => {setSelectedHotel(e.target.value); setHotelID(e.target.value)}}>
                <option>Vælg hotel</option>
                {hotels && hotels.items && hotels.items.map((item, index) => {
                        return <option key={index} value={item.id}>{item.title}</option>
                    })}
                </select>
            </div>

            <div>
                <label>Vælg værelsestype</label>
                <select defaultValue={null} onChange={(e) => {setSelectedHotelRoom(e.target.value); setRoomID(e.target.value)}}>
                <option>Vælg værelsestype</option>
                {singleHotel && singleHotel.item && singleHotel.item.rooms && singleHotel.item.rooms.items.map((item, index) => {
                        return <option key={index} value={item.id}>{item.room_title}</option>
                    })}
                </select>
            </div>

            <div>
                <label>Vælg hvor mange personer</label>
                <select defaultValue={null} onChange={(e) => {setNumPersons(e.target.value)}}>
                <option>Vælg antal personer</option>
                {singleHotelRoom && singleHotelRoom.item && 
                        <option value={singleHotelRoom.item.num_persons}>{singleHotelRoom.item.num_persons}</option>
                    }
                </select>
            </div>

            <div className={Style.pricefield}>
                <h4>Pris klasse:</h4>
                <div>
                    <input defaultChecked={true} onChange={(e)=>setFlexPrice(false)} type="radio" name="price"></input>
                    <label>Normal pris</label>
                </div>
                <div>
                    <input onChange={(e)=>setFlexPrice(true)} type="radio" name="price"></input>
                    <label>Flex pris</label>
                </div>
            </div>
                
            <div>
                <label>Check-in dato</label>
                    <input onChange={(e)=>{setCheckin(e.target.value)}} type="date" id="checkin" name="checkin"/>
            </div>
            <div>
                <label>Check-ud dato</label>
                    <input onChange={(e)=>{setCheckOut(e.target.value)}} type="date" id="checkud" name="checkud"/>
            </div>

            <div>
                <h4>Indtast brugeroplysninger</h4>
                <div className={Style.namecontainer}>
                    <div className={Style.surname}>
                        <label>Fornavn</label>
                        <input className={Style.selectname} type="text" onChange={(e)=>setfirstName(e.target.value)} placeholder="Indtast dit fornavn"></input>
                    </div>
                    <div className={Style.lastname}>
                        <label>Efternavn</label>
                        <input className={Style.selectname} type="text" onChange={(e)=>setlastName(e.target.value)} placeholder="Indtast dit efternavn"></input>
                    </div>
                </div>
                <label>Email</label>
                    <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Indtast email"></input>
                <label>Telefon</label>
                    <input onChange={(e)=>setPhone(e.target.value)} placeholder="Indtast telefonnummer"></input>
                <label>Eventuelle andmodninger eller kommentarer:</label>
                    <input onChange={(e)=>setComment(e.target.value)} placeholder=""></input>
                
                <p style={{color:`${msgColor}`}}>{msg}</p>
                <button className={Style.acceptbtn} onClick={()=>orderTicket()}>Reserver</button>
                <Link to="/forside"><button>Annuller</button></Link>

            </div>
        </section>
        <section className={Style.sidebar}>
            <div>
                <b>Betingelser</b>
                <p>Reduceret pris - spar op til 25%</p>
                <p>Kan kun bookes online via website og app</p>
                <p>Bestil helt op til og med ankomstdagen</p>
                <p>Bookingen tilbagebetales ikke og kan ikke ændres eller annuleres</p>
                <p>Beløbet debiteres kreditkort på reservationstidspunktet</p>
                <p>Morgenmad er inkluderet</p>
            </div>
        </section>
    </section>
    </>
    )
}

export default CheckOut;