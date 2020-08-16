import React from 'react'
import {Link} from 'react-router-dom';
import Style from '../navbar/navbar.module.scss'
import logo from '../../Vektor/hotel-overlook-logo-white.svg'
import SearchBar from '../searchbar/search';

function Navbar(props){
    
    const options = props.options
    const navLinks = options.navlinks
  
    const navStyle = {
        width: "100%",
        backgroundColor: options.bgcolor,
        boxShadow: "0px 3px 12px 0px rgba(0,0,0,0.75)",
    }

    const logoSize = {
        width: "35%",
        marginLeft:"5%",
    }

    const linkStyle={
        color: options.textcolor,
        display: "grid",
        textDecoration: "none",
        textUnderline: "none",
        curser: "pointer",
        justifyContent:"center",
        alignItems:"center",
    }

    const sublinkStyle={
        color: options.textcolor,
        height: "100%",
        display: "block",
        padding: "auto",
        textDecoration: "none",
        textUnderline: "none",
    }

    const innerSize={
        width: options.innersize,
        display: "grid",
        placeContent: "center",
        gridTemplateColumns: ` 4fr repeat(4, 1.5fr)`,
        gap: "4px",
        height: `${options.height || "40px"}`,
        fontSize: `${options.fontsize || "1rem"}`
    }
    
    return(
        <>
        <nav style={navStyle}>
            <div style={innerSize}>
            <img alt="Hotel Overlook" style={logoSize} src={logo}/>
            {navLinks && navLinks.map((item,i) => {
                if (!item.sub){
                    return <Link style={linkStyle} key={i} className={item.sub ? Style.dropdown : ""} to={item.main.toLowerCase()}>
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
                                return <Link key={i} style={sublinkStyle} to={sub.toLowerCase()}>{sub}</Link>
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
        {props.currentLocation == "/" && 
            <SearchBar setSearchPersons={props.setSearchPersons} doFetch={props.doFetch} setSearchResult={props.setSearchResult}/>
        }
        {props.currentLocation == "/forside" && 
            <SearchBar setSearchPersons={props.setSearchPersons} doFetch={props.doFetch} setSearchResult={props.setSearchResult}/>
        }
        {props.currentLocation == "/hoteller og destinationer" && 
            <SearchBar setSearchPersons={props.setSearchPersons} doFetch={props.doFetch} setSearchResult={props.setSearchResult}/>
        }
            </>
            )
        }

export default Navbar