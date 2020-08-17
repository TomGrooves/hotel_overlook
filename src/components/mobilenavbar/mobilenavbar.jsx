import React from 'react'
import './mobilenavbar.scss';
import {Link} from 'react-router-dom';
import SearchBar from '../searchbar/search';


// Movbile Navbar inspiration from: https://www.cssscript.com/pure-css-fold-out-navigation-menu/

function MobileNavBar(props){
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
    // set navigation links to be array of links
    const navLinks = options.navlinks

    // return html
    return(

    <nav id="menuToggle">
        <input type="checkbox" className={"inputcontrol"}></input>
        <span></span>
        <span></span>
        <span></span>
        <ul id="menu">
        {navLinks && navLinks.map((item,i) => {
                if (!item.sub){
                    return <Link key={i} to={"/"+item.main.toLowerCase()}>
                                {item.main}      
                            </Link>
                }
                else {
                    return null
                }
            }
        )}
        <SearchBar vert={true} setSearchPersons={props.setSearchPersons} doFetch={props.doFetch} setSearchResult={props.setSearchResult}/>
        </ul>
    </nav>
    )
}

export default MobileNavBar