import React, { useEffect,useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from 'axios';

const FacilityAdmin = () =>{

    // const navigate = useNavigate();

    const {facility_id} = useParams();
    const [data,setData] = useState([]);
    const [license,setlicense] = useState('');
    // const [day,setDate] = useState(0);
    // const [week,setWeek] = useState(0);

    let ck_email;
    useEffect(()=>{
        ck_email = Cookies.get('email');    
        Cookies.set('license', license);
        // console.log(Cookies.get('license'));
    },[license])

    useEffect(()=>{
        const fetchData = async() =>{
            try{
                console.log("fetch fac adm")
            await axios.get(`http://localhost:3002/facilityadmin`,{
                params:{
                    email: ck_email,
                    facility_id: facility_id
                }
            }).then(res =>{
                setData(res.data);
                console.log("license sett");
                // Cookies.set('license', res.data[0].license_number);
                setlicense(res.data[0].license_number);
                console.log(license);
            })
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    },[])

    const handleDate = (e) => {
        e.preventDefault();

        const Date = async()=>{
            try{

                axios.get(`http://localhost:3002/dayweek`,{
                }).then(res =>{
                    alert("Date - Set Successfully.");
                    Cookies.set('week',parseInt(res.data[0].week));
                    Cookies.set('day',parseInt(res.data[0].day));
                    // window.location.reload();
                })

            }catch(error){
                console.error(error)
            }
        }

        Date();
    }

    return(
        
        <div className="container">
            <h3 >Facility Admin</h3>

            <form className="center" onSubmit={handleDate}>
            Note: Everyday Facility admin must click this button to update DATE    :
            <button className="center"> Set Date </button>
        </form>
  
        <div className="container">
            <h5 className="center">Details</h5>
            <ul className="collection">
            <li className="collection-item" style={{ fontSize: '0.7rem'}}>
            {data.length > 0 && <p>Name: {data[0].name}</p>}
            </li>
            <li className="collection-item" style={{ fontSize: '0.7rem'}}>
            {data.length > 0 && <p>Email Id: {data[0].email}</p>}
            </li>
            <li className="collection-item" style={{ fontSize: '0.7rem'}}>
            {data.length > 0 && <p>License Number: {data[0].license_number}</p>}
            </li>
            </ul>
        </div>
            

        <div className="container">
            <h5 className="center">Duties:</h5>
            <div className="collection" >
                <a href="/enrollchild" className="collection-item" style={{ color: "black" }}>Manage Children</a>
                <a href="/enrollteacher" className="collection-item" style={{ color: "black" }}>Manage Teachers</a>
                <a href="/teacherattendance" className="collection-item" style={{ color: "black" }}>Manage Attendance</a>
                <a href="/ledgerdata" className="collection-item" style={{ color: "black" }}>Manage Ledger</a>
                <a href="/reports" className="collection-item" style={{ color: "black" }}>Reports</a>
            </div>
            </div>
        </div>
        
    )
}

export default FacilityAdmin;