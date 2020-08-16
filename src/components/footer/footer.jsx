import React from 'react';
import style from './footer.module.scss';
import {AiFillTwitterCircle} from "react-icons/ai";
import {FaFacebook} from 'react-icons/fa';

function Footer () {
return (
    <footer className={style.footer}>
        <p>2019 Hotel Overlook. Alle rettigheder forbeholdt</p>
            <AiFillTwitterCircle className={style.icon}/>
            <FaFacebook className={style.icon}/>
        <ul>
            <li>Hoteller og destinationer</li>
            <li>Værelser</li>
            <li>Reservation</li>
            <li>Om Overlook</li>
        </ul>
    </footer>
)
}

export default Footer