import React, {useState, useEffect} from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Navbar from './components/navbar/navbar';
import FrontPage from './components/frontpage/frontpage';
import Footer from './components/footer/footer';
import FindRoomPage from './components/findroom/findroompage';
import HotelPage from './components/hotelpage/hotelpage';
import CheckOut from './components/checkout/checkout';
import Login from './components/login/login';
import NewsPage from './components/newspage/newspage';
import MobileNavBar from './components/mobilenavbar/mobilenavbar';
import Reservations from './components/reservations/reservations';

import carImg1 from './Billeder/fishmarket-hamborg.jpg';
import carImg2 from './Billeder/center-square-wroclaw.jpg';
import carImg3 from './Billeder/city-houses-reykjavik.jpg';
import carImg4 from './Billeder/frankfurt-skyline-germany.jpg';


function App() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  const [searchResult, setSearchResult] = useState([])
  const [loginData, setLoginData] = useState()
  const [searchPersons, setSearchPersons] = useState(1)
  const [singleNews, setSingleNews] = useState([])
  const [currentLocation, setCurrentLocation] = useState("")

  useEffect(() => {
    if (currentLocation == ""){
      setCurrentLocation("/forside")
    }
    if (sessionStorage.getItem('token')){
      console.log("Session storage is present- Setting userid")
      setLoginData(JSON.parse(sessionStorage.getItem('token')))
    }
  }, [])

      // Carousel object (required prop for Carousel)
  const carouselItems = {
    item : [
        {img: carImg4},
        {img: carImg2},
        {img: carImg3},
        {img: carImg1},

        ]
    }

  async function doFetch(url, method){
    if (method){
      let options = {
        method: method,
        headers: {
            'Authorization': `Bearer ${loginData.access_token}`
        },
    }
    try {
      const response = await fetch(url, options)
      const data = await response.json()
      return data
    }
    catch (error){
       console.log(error)
    }
  }

    try {
      const response = await fetch(url)
      const data = await response.json()
      return data
   }
   catch (error){
       console.log(error)
   }
  }

  return (

    <Router>
        {isTabletOrMobile && 
          <MobileNavBar setSearchPersons={setSearchPersons} doFetch={doFetch} setSearchResult={setSearchResult}/>
        }{!isTabletOrMobile &&
          <Navbar currentLocation={currentLocation} setSearchPersons={setSearchPersons} doFetch={doFetch} setSearchResult={setSearchResult}/>
        }
        <Switch>
        <Route path="/minereservationer">
          <Reservations doFetch={doFetch} loginData={loginData}/>
        </Route>
        <Route path="/nyhed">
          <NewsPage setCurrentLocation={setCurrentLocation} singleNews={singleNews}/>
        </Route>
        <Route path="/login">
          <Login setCurrentLocation={setCurrentLocation} setLoginData={setLoginData} loginData={loginData} doFetch={doFetch}/>
        </Route>
        <Route path="/reservation">
          <CheckOut setCurrentLocation={setCurrentLocation} loginData={loginData} doFetch={doFetch}/>
        </Route>
        <Route path="/hoteller og destinationer">
          <HotelPage setCurrentLocation={setCurrentLocation} searchPersons={searchPersons} setSearchPersons={setSearchPersons} searchResult={searchResult} setSearchResult={setSearchResult}  carouselItems={carouselItems} doFetch={doFetch}/>
        </Route>
        <Route path="/søg">
          <FindRoomPage setCurrentLocation={setCurrentLocation} searchPersons={searchPersons} setSearchPersons={setSearchPersons} searchResult={searchResult} vert={true} setSearchResult={setSearchResult} carouselItems={carouselItems} doFetch={doFetch}/>
        </Route>
          <Route path="/">
            <FrontPage setCurrentLocation={setCurrentLocation} setSingleNews={setSingleNews} carouselItems={carouselItems} doFetch={doFetch}/>
          </Route>
        </Switch>
        <Footer/>
    </Router>
  );
}

export default App;
