import React, { useEffect,useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from 'axios';
import M from "materialize-css";

const ClassAttendance = () =>{

    const {class_id} = useParams();
    const ck_license = Cookies.get('license');
    const [week,setWeek] = useState(Cookies.get('week'));
    const [day,setday] = useState(Cookies.get('day'));
    // const [present,setPresent] = useState([]);
    // const [absent,setAbsent] = useState([]);
    const [list1,setlist1] = useState([]);
    const [list2,setlist2] = useState([]);
    let counter_present = 0;

    useEffect(() => {
        M.AutoInit();
      }, []);

    useEffect(() => {

        const fetchPresent = async() =>{
            try{
    
            await axios.get(`http://localhost:3002/attendance/present`,{
                params:{
                    license: ck_license,
                    class_id: class_id,
                    week: week,
                    day:day
                }
            }).then(res =>{
                // setPresent(res.data);
                console.log(res.data);
                const presentHTML = res.data.map(child =>{
                    return(
                        <li className="collection-item" key={child.child_id} >
                            <div className="row">
                                <div className="col s6">
                                    <span className="title">Child Id: {child.child_id}</span>
                                </div>
                                <div className="s6">
                                    <span className="title">Name: {child.child_name}</span>
                                </div>
                            </div>
                        </li>
                    )
                })
                setlist1(presentHTML);
                // console.log("C IDs");
                // console.log(feelist2);
                // console.log(res.data);
            })
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }

        fetchPresent();

        const fetchAbsent = async() =>{
            try{
    
            await axios.get(`http://localhost:3002/attendance/absent`,{
                params:{
                    license: ck_license,
                    class_id: class_id,
                    week: week,
                    day:day
                }
            }).then(res =>{
                // setAbsent(res.data);
                console.log(res.data);
                const absentHTML = res.data.map(child =>{
                    return(
                        <li className="collection-item" key={child.child_id} >
                            <div className="row">
                                <div className="col s6">
                                    <span className="title">Child Id: {child.child_id}</span>
                                </div>
                                <div className="s6">
                                    <span className="title">Name: {child.child_name}</span>
                                </div>
                            </div>
                        </li>
                    )
                })
                setlist2(absentHTML);
                // console.log("C IDs");
                // console.log(feelist2);
                // console.log(res.data);
            })
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }

        fetchAbsent();
        // fetchFeeCollect();
        // counter_pay++;
    }, [week,day,counter_present])

    const handleDate = (e)=>{

        e.preventDefault();

        counter_present++;
    }

    return(
        <div className="container">
        
        <h3 className="center"> Attendance in Classroom {class_id} </h3>
        <h5>By default, week and day set to Todays Date.</h5>
        <form className="col s12" onSubmit={handleDate}>
            <div className="row">
            <div className="input-field col s4">
            <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setday(e.target.value)}}></textarea>
            <label htmlFor="textarea1">Day</label>
            </div>
            <div className="input-field col s4">
            <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setWeek(e.target.value)}}></textarea>
            <label htmlFor="textarea1">Week</label>
            </div>
            
            <button className="right"> Set Day and Week</button>
            </div>
       
        </form>
    <ul className="collapsible">
    <li>
        <div className="collapsible-header">
        Presents
        </div>
        <div className="collapsible-body">
            <ul className="collection">
            {list1}
            </ul>
        </div>
    </li>
    <li>
        <div className="collapsible-header">
        Absents
        </div>
        <div className="collapsible-body">
            <ul className="collection">
            {list2}
            </ul>
        </div>
    </li>

    </ul>

    </div>
    )
}

export default ClassAttendance;