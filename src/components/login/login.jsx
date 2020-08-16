import React,{useState, useEffect} from 'react'
import Style from './login.module.scss'
import {useLocation, Link} from 'react-router-dom'


function Login(props) {

    let location = useLocation();

    useEffect(() => {
        props.setCurrentLocation(location.pathname)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("Indtast login oplysninger")

    const sendLoginRequest = (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)
      
        let url = 'https://api.mediehuset.net/token';
        
        console.log(formData)
        fetch(url, {
          method: "POST",
          body : formData,  
        })
        .then(response => response.json())
        .then(json => handleSessionData(json))
        .catch(error => setMessage(error))
    }
    
    const handleSessionData = (key) => {
        setPassword("")
        setUsername("")
        if (!key.message){
            props.setLoginData(key)
            console.log(key)
            sessionStorage.setItem('token', JSON.stringify(key)) 
        }
  
        if (key.message === "No authorization"){
            setMessage("Forkert brugernavn eller password - prøv igen")
        }
      }

      const logOut = () => {
          props.setLoginData()
          sessionStorage.removeItem('token');
          setMessage("Du er nu logget ud")
      }

    return (
    <div>
        <section className={Style.loginform}>
            <h4>{!props.loginData ? message : `Du er logget ind som ${props.loginData.username}`}</h4>
            <label>Email/brugernavn</label>
            <input type="username" value={username} onChange={(e)=>{setUsername(e.target.value)}} required placeholder="Indtast din email"></input>
            <label>Adgangskode</label>
            <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required placeholder="Indtast din adgangskode"></input>
            <button onClick={(e)=>sendLoginRequest(e)}>LOG IND</button>
            
            {props.loginData && props.loginData.user_id && 
            <>
            <button onClick={()=>logOut()}>LOG UD</button>
            <Link to="/minereservationer"><button>MINE RESERVATIONER</button></Link>
            </>
            }
        </section>
            <p>Glemt adgangskode?</p>
    </div>
    )
}

export default Login