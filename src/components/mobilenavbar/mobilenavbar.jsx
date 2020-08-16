import React from 'react'
import './mobilenavbar.scss';
import {Link} from 'react-router-dom';
import SearchBar from '../searchbar/search';


// Movbile Navbar inspiration from: https://www.cssscript.com/pure-css-fold-out-navigation-menu/

function MobileNavBar(props){

    const options = props.options
    const navLinks = options.navlinks

    return(

    <nav id="menuToggle">
        <input type="checkbox" className={"inputcontrol"}></input>
        <span></span>
        <span></span>
        <span></span>
        <ul id="menu">
        {navLinks && navLinks.map((item,i) => {
                if (!item.sub){
                    return <Link key={i} to={item.main.toLowerCase()}>
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