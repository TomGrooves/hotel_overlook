import React, {useState, useEffect} from 'react'
import style from './reservations.module.scss';

function Reservations(props) {

    // set states needed by component
    const [reservations, setReservations] = useState([]);
    const [message, setMessage] = useState("")

    // function to fetch all reservations by user id
    const getReservations = async(id) => {
        let reservationUrl = `https://api.mediehuset.net/overlook/reservations/list_by_user/${id}`
        let reservationRes = await props.doFetch(reservationUrl)
        setReservations(reservationRes)
    }

    // function to cancel reservation by reservation id
    const cancelReservation = async(id) => {
        let deleteUrl = `https://api.mediehuset.net/overlook/reservations/${id}`
        let deleteRes = await props.doFetch(deleteUrl, "DELETE")
        console.log(deleteRes)
        setMessage("Din reservation er afbestilt")
        let time = setTimeout(() => {
            getReservations(props.loginData.user_id).then(clearTimeout(time))
        }, 1000);
    }

    // fetch all reservations when component mounts
    useEffect(() => {
        if (props.loginData){
            getReservations(props.loginData.user_id)
        }
        else{
            setMessage("Der opstod en fejl. Gå tilbage og prøv igen")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // function to get price model
    const getPrice = (flex) =>{
        if (flex === 0){
            return "Standard"
        }
        else{
            return "Flex"
        }
    }

    // return html and concent
    return (
        <>
            <section className={style.topcontainer}>
                <h3>Mine reservationer</h3>
                <p>Her kan du afbestille reservationer du har lavet</p>
            </section>
            <p>{message}</p>
            <section className={style.maincontainer}>
                {reservations && reservations.items && reservations.items.map((item, index) => {
                    return (
                    <div key={index} className={style.griditem}>
                        <p>Hotel: {item.hotel_title}</p>
                        <p>Værelse: {item.room_title}</p>
                        <p>Antal personer: {item.num_persons}</p>
                        <p>Check in dato: {item.checkin_date}</p>
                        <p>Check ud dato: {item.checkout_date}</p>
                        <p>Pris model: {getPrice(item.is_flex)}</p>
                        <p>Navn: {item.name}</p>
                        <p>Telefon: {item.phone}</p>
                        <p>Email: {item.email}</p>
                        <p>Kommentar: {item.comment}</p>
                        <button className={style.delbutton} id={item.id} onClick={(e)=>{cancelReservation(e.target.id)}}>Afbestil reservation</button>
                    </div>
                    )
                })}
            </section>
        </>
    )

}

export default Reservations