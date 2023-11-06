import React, { useEffect,useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from 'axios';

const TeacherAttendance = () =>{

    const [intime,setintime] = useState('');

    return(
        <div>
            Attendance Home Page.
        </div>
    )
}

export default TeacherAttendance;