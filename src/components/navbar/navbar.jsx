import React from 'react'
import {Link} from 'react-router-dom';
import Style from '../navbar/navbar.module.scss'
import logo from '../../Vektor/hotel-overlook-logo-white.svg'
import SearchBar from '../searchbar/search';

function Navbar(props){

    // Navbar options
    const options = {
        bgcolor : "rgb(20,20,20)",  //required
        textcolor : "white",        //require
        navlinks : [
        {main:"Forside"}, 
        {main:"Hoteller og destinationer"},  
        {main:"Reservation"},
        {main:"Login"}
        ],                          //required
        gap : 3,                    //required [1 - 12]
        height : "90px",            //optional
        fontsize : "1rem",        //optional
        innersize: "80%",
    }

    // set navigation links
    const navLinks = options.navlinks
  
    // set navigation style
    const navStyle = {
        width: "100%",
        backgroundColor: options.bgcolor,
        boxShadow: "0px 3px 12px 0px rgba(0,0,0,0.75)",
    }
    // set logoSize
    const logoSize = {
        width: "35%",
        marginLeft:"5%",
    }

    // set link style
    const linkStyle={
        color: options.textcolor,
        display: "grid",
        textDecoration: "none",
        textUnderline: "none",
        curser: "pointer",
        justifyContent:"center",
        alignItems:"center",
    }

    // set sublink style
    const sublinkStyle={
        color: options.textcolor,
        height: "100%",
        display: "block",
        padding: "auto",
        textDecoration: "none",
        textUnderline: "none",
    }

    // set innersize
    const innerSize={
        width: options.innersize,
        display: "grid",
        placeContent: "center",
        gridTemplateColumns: ` 4fr repeat(4, 1.5fr)`,
        gap: "4px",
        height: `${options.height || "40px"}`,
        fontSize: `${options.fontsize || "1rem"}`
    }
    // return html with links 
    return(
        <>
        <nav style={navStyle}>
            <div style={innerSize}>
            <img alt="Hotel Overlook" style={logoSize} src={logo}/>
            {navLinks && navLinks.map((item,i) => {
                if (!item.sub){
                    return <Link style={linkStyle} key={i} className={item.sub ? Style.dropdown : ""} to={"/"+item.main.toLowerCase()}>
                                {item.main}      
                            </Link>
                }
                else{
                    return(
                    <li style={linkStyle} key={i}>
                        <div key={i} className={item.sub ? Style.dropdown : ""}>
                        <p>{item.main}</p>
                        {item.sub && 
                            <div className={Style.dropdownContent} style={{backgroundColor:options.bgcolor}}>
                                {item.sub && item.sub.map((sub, i) => {
                                return <Link key={i} style={sublinkStyle} to={"/"+sub.toLowerCase()}>{sub}</Link>
                            })}
                            </div>
                        }           
                        </div>
                    </li>
                    )
                }
            })}
            </div>
        </nav>
        
        {//only render searchbar if location is /
        props.currentLocation == "/" && 
            <SearchBar setSearchPersons={props.setSearchPersons} doFetch={props.doFetch} setSearchResult={props.setSearchResult}/>
        }
        {//only render searchbar if location is /forside
        props.currentLocation == "/forside" && 
            <SearchBar setSearchPersons={props.setSearchPersons} doFetch={props.doFetch} setSearchResult={props.setSearchResult}/>
        }
        {//only render searchbar if location is /hoteller og destinationer
        props.currentLocation == "/hoteller og destinationer" && 
            <SearchBar setSearchPersons={props.setSearchPersons} doFetch={props.doFetch} setSearchResult={props.setSearchResult}/>
        }
            </>
            )
        }

export default Navbar