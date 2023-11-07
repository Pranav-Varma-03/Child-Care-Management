import React, { useEffect,useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from 'axios';
import M from "materialize-css";

const Teacher = () =>{

    const {teacher_id} = useParams();
    const [week,setWeek] = useState(Cookies.get('week'));
    const [data,setData] = useState([]);
    const [list1,setlist1] = useState([]);
    const [list2,setlist2] = useState([]);
    const [list3,setlist3] = useState([]);
    let counter_present = 0;
    const ck_license = Cookies.get('license');
    useEffect(() => {
        M.AutoInit();
      }, []);

      useEffect(() => {

        const fetchData = async() =>{
            try{
    
            await axios.get(`http://localhost:3002/teacher`,{
                params:{
                    teacher_id: teacher_id,
                    license: ck_license
                }
            }).then(res =>{
                setData(res.data)
            })
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }
        fetchData();

        const fetchAttendance = async() =>{
            try{
    
            await axios.get(`http://localhost:3002/attendance/teacher`,{
                params:{
                    license: ck_license,
                    teacher_id: teacher_id,
                    week: week
                }
            }).then(res =>{
                // setPresent(res.data);
                // console.log(res.data);
                const attendanceHTML = res.data.map(teacher =>{
                    return(
                        <li className="collection-item" key={teacher.day_number} >
                            <div className="row">
                                <div className="col s4">
                                    <span className="title">Day: {teacher.day_number}</span>
                                </div>
                                <div className="col s4">
                                    <span className="title">In Time: {teacher.in_time}</span>
                                </div>
                                <div className="col s4">
                                    <span className="title">Out Time: {teacher.out_time}</span>
                                </div>
                            </div>
                        </li>
                    )
                })
                setlist1(attendanceHTML);
                // console.log("C IDs");
                // console.log(feelist2);
                // console.log(res.data);
            })
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }

        fetchAttendance();

        const fetchSalary = async() =>{
            try{
    
            await axios.get(`http://localhost:3002/salary/teacher`,{
                params:{
                    license: ck_license,
                    teacher_id: teacher_id,
                    week: week
                }
            }).then(res =>{
                // setAbsent(res.data);
                // console.log(res.data);
                const salaryHTML = res.data.map(teacher =>{
                    return(
                        <li className="collection-item" key={teacher.day_number} >
                            <div className="row">
                                <div className="col s6">
                                    <span className="title">Day: {teacher.day_number}</span>
                                </div>
                                <div className="s6">
                                    <span className="title">Salary Earned: {teacher.daily_salary}</span>
                                </div>
                            </div>
                        </li>
                    )
                })
                setlist2(salaryHTML);
                // console.log("C IDs");
                // console.log(feelist2);
                // console.log(res.data);
            })
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }

        fetchSalary();
        counter_present++;

        const fetchhrs = async() =>{
            try{
    
            await axios.get(`http://localhost:3002/hours/teacher`,{
                params:{
                    license: ck_license,
                    teacher_id: teacher_id,
                    week: week
                }
            }).then(res =>{
                // setAbsent(res.data);
                // console.log(res.data);
                const hrsHTML = res.data.map(teacher =>{
                    return(
                        <li className="collection-item" key={teacher.day_number} >
                            <div className="row">
                                <div className="col s6">
                                    <span className="title">Day: {teacher.day_number}</span>
                                </div>
                                <div className="s6">
                                    <span className="title">Hours Worked: {teacher.daily_working_hours}</span>
                                </div>
                            </div>
                        </li>
                    )
                })
                setlist3(hrsHTML);
                // console.log("C IDs");
                // console.log(feelist2);
                // console.log(res.data);
            })
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }

        fetchhrs();
        counter_present++;

    }, [week,counter_present])  

    const handleDate = (e)=>{

        e.preventDefault();

        counter_present++;
    }

    return(
        <div className="container">
        
        <h3 className="center"> Teacher's Home Page </h3>

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
            {data.length > 0 && <p>Phone Number: {data[0].phone_number}</p>}
            </li>
            <li className="collection-item" style={{ fontSize: '0.7rem'}}>
            {data.length > 0 && <p>Hour Salary: {data[0].hour_salary}</p>}
            </li>
            <li className="collection-item" style={{ fontSize: '0.7rem'}}>
            {data.length > 0 && <p>License Number: {data[0].license_number}</p>}
            </li>
            </ul>
        </div>
        <form className="col s12" onSubmit={handleDate}>
        <h6>By default, week set to Todays Date. Week : {week}.</h6>
            <div className="row">
            <div className="input-field col s4">
            <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setWeek(e.target.value)}}></textarea>
            <label htmlFor="textarea1">Week</label>
            </div>
            <button className="input-field col s2"> Set Week</button>
            </div>
       
        </form>
    <ul className="collapsible">
    <li>
        <div className="collapsible-header">
        Weekly Attendance
        </div>
        <div className="collapsible-body">
            <ul className="collection">
            {list1}
            </ul>
        </div>
    </li>
    <li>
        <div className="collapsible-header">
        Weekly Earnings Summary
        </div>
        <div className="collapsible-body">
            <ul className="collection">
            {list2}
            </ul>
        </div>
    </li>
    <li>
        <div className="collapsible-header">
        Weekly Working Hours Summary
        </div>
        <div className="collapsible-body">
            <ul className="collection">
            {list3}
            </ul>
        </div>
    </li>
    </ul>

    </div>
    )
}

export default Teacher;