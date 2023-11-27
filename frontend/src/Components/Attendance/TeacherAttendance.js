import React, { useEffect,useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from 'axios';

const TeacherAttendance = () =>{

    const [activeButton, setActiveButton] = useState("");
    const [teacheremail,setteacheremail] = useState('');

    const ck_week = Cookies.get('week');
    const ck_day = Cookies.get('day');
    const ck_license = Cookies.get('license');

  const handleButtonClick = (e) => {
    e.preventDefault();
    // setActiveButton(buttonName);


    const markAttendance = async()=>{
        try{
            
            // if()

            // console.log(parentemail,childname,dob,consent,ck_license);
            console.log({activeButton}.activeButton)
            axios.post(`/teacher/attendance`,{
                time: {activeButton},
                email: teacheremail,
                week: ck_week,
                day: ck_day,
                license: ck_license

            }).then(res =>{
                
                if(res.data[0].val === 1){
                    alert("Attendance In Sign Marked");
                }else{
                    alert("Out Sign marked");
                }
                // window.location.reload();
            })

        }catch(error){
            console.error(error)
        }
    }

    markAttendance();
  };

    return(
        <div className="container">
      <h1 className="center">Teacher Attendance</h1>

      <form className="col s12" onSubmit={handleButtonClick}>
            <div className="row">
            <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setteacheremail(e.target.value)}}></textarea>
            <label htmlFor="textarea1">Teacher email id</label>
            </div>

            <p>
                <label>
                <input
                    className="with-gap"
                    type="radio"
                    name="group1"
                    value="INTIME"
                    checked={activeButton === "INTIME"}
                    onChange={() => setActiveButton("INTIME")}
                />
                <span> INTIME </span>
                
                </label>
            </p>
            <p>
                <label>
                <input
                    className="with-gap"
                    type="radio"
                    name="group1"
                    value="OUTTIME"
                    checked={activeButton === "OUTTIME"}
                    onChange={() => setActiveButton("OUTTIME")}
                />
                <span className="lever"></span>
                OUTTIME
                </label>
            </p>

            {/* <p>Active Button: {activeButton}</p> */}

            <button className="center"> Mark Attendance</button>
        </div>
       
        </form>
    </div>
    )
}

export default TeacherAttendance;