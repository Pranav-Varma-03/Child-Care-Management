import React,{ useState,useEffect } from "react";
import Cookies from "js-cookie";
const Home = ()=>{


    const [role,setRole] = useState('');

    useEffect(() => {
        setRole(Cookies.get('role'));
    }, []); 

    console.log(role);  

    return(
        <div className="container">
            <h3 className="center">
            Welcome to Home Page,
            </h3>
            <h3 className="center">
            Logged in as : {role} Admin.
            </h3>
        </div>
    )
}

export default Home