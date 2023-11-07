import React, { useEffect,useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from 'axios';
import M from "materialize-css";
const Child = () =>{

    const {child_id} = useParams();
    const [list,setList] = useState([]);
    const [list2,setList2] = useState([]);
    let counter_paid = 0;
    useEffect(() => {
        // Initialize Materialize components
        M.AutoInit();
    }, []);

    useEffect(() => {
        const fetchPayment = async() =>{
            try{
            await axios.get(`http://localhost:3002/payment/child`,{
                params:{
                    child_id: child_id
                }
            }).then(res =>{
                // setfeelist(res.data);
                // console.log(res.data);
                const feeHtml = res.data.map(child =>{
                    return(
                        <li className="collection-item" key={child.week_number} >
                            <div className="row">
                                <div className="s6">
                                    <span className="title">Week: {child.week_number}</span>
                                </div>
                                <div className="right">
                                <button className="material-icons" onClick={() => handlepaymentclick(child.week_number, child_id)}>Make Payment</button>
                                </div>
                            </div>
                        </li>
                    )
                })
                setList(feeHtml);
                // console.log("C IDs");
                // console.log(res.data);
            })
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }
        fetchPayment();
    },[])

    const handlepaymentclick = (week,child_id) =>{

        // week.preventDefault();

        const confirmClick = async()=>{
            try{

                // console.log(parentemail,childname,dob,consent,ck_license);

                axios.post(`http://localhost:3002/payment/confirm`,{
                   week: week,
                   child_id: child_id
                }).then(res =>{
                    
                    if(res.data[0].val === 1){
                        alert("Successful Payment");
                    }else{
                        alert("Error- please retry.");
                    }
                    window.location.reload();
                })

            }catch(error){
                alert("Error- please retry.");
                console.error(error)
            }
        }

        confirmClick();
        counter_paid++;
    }

    return(
        <div className="container">
        <h3 className="center">Child Records</h3>
            <ul className="collapsible">
    <li>
        <div className="collapsible-header">
        Pay Fee
        </div>
        <div className="collapsible-body">
            <ul className="collection">
            {list}
            </ul>
        </div>
    </li>
    <li>
        <div className="collapsible-header">
        View Ledger
        </div>
        <div className="collapsible-body">
            <ul className="collection">
            {list2}
            </ul>
        </div>
    </li>
    <li>
        <div className="collapsible-header">
        Modify Student Info.
        </div>
        <div className="collapsible-body">
            <ul className="collection">
            {/* {list3} */}
            </ul>
        </div>
    </li>
    <li>
        {/* <div className="collapsible-header">
        Attendance Report.
        </div>
        <div className="collapsible-body">
        <form className="col s12" onSubmit={handleAddTeacher}>
            <div className="row">
            <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setTeacheremail(e.target.value)}}></textarea>
            <label htmlFor="textarea1">email id</label>
            </div>
            <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setPassword(e.target.value)}}></textarea>
            <label htmlFor="textarea1">Password</label>
            </div>
            <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setName(e.target.value)}}></textarea>
            <label htmlFor="textarea1">name</label>
            </div>
            <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setDob(e.target.value)}}></textarea>
            <label htmlFor="textarea1">DOB</label>
            </div>
            <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setPh(e.target.value)}}></textarea>
            <label htmlFor="textarea1">Phone Number</label>
            </div>
            <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setaddr(e.target.value)}}></textarea>
            <label htmlFor="textarea1">Address</label>
            </div>
            <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setSal(e.target.value)}}></textarea>
            <label htmlFor="textarea1">Hourly Salary</label>
            </div>
            <button className="col s2"> Add Teacher</button>
            </div>
       
        </form>
        </div> */}
    </li>
    </ul>
        </div>
    )
}

export default Child;