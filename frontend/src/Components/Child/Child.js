import React, { useEffect,useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios, { all } from 'axios';
import M from "materialize-css";
import TableComponentMonth from "../TableComponent/TableComponentMonth";
import TableComponentWeek from "../TableComponent/TableComponentWeek";
const Child = () =>{

    const {child_id} = useParams();
    const [list,setList] = useState([]);
    const [list2,setList2] = useState([]);
    const [weekDATA,setweekDATA] = useState([]);
    const [monthDATA,setmonthDATA] = useState([]);
    // const [license,setlicense] = useState('');
    const [name,setChildname] = useState('');
    const [dob,setDob] = useState('');
    const [allergies,setAllergies] = useState('');
    // const [consent,setConsent] = useState(false);

    let counter_paid = 0;
    useEffect(() => {
        // Initialize Materialize components
        M.AutoInit();
    }, []);

    const handleChild = (e) =>{
        e.preventDefault();

        const Child = async()=>{
            try{
                axios.post(`http://localhost:3002/child/update`,{
                    child_id: child_id,
                    name: name,
                    dob: dob,
                    allergies: allergies
                }).then(res =>{
                    
                    if(res.data[0].val === 1){
                        alert("Successfully Updated");
                    }else{
                        alert("Please Re-try.");
                    }
                    // window.location.reload();
                })

            }catch(error){
                console.error(error)
            }
        }

        Child();
    }

    useEffect(() => {

        const weekdata = async() =>{
            try{
    
            await axios.get(`http://localhost:3002/child/week`,{
                params:{
                    child_id: child_id
                }
            }).then(res =>{
                // setlicense(res.data[0].license_number);
                setweekDATA(res.data);
                // setConsent(res.data[0].consent);
                // console.log(res.data);
            })
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }
        weekdata();

        const monthdata = async() =>{
            try{
    
            await axios.get(`http://localhost:3002/child/month`,{
                params:{
                    child_id: child_id
                }
            }).then(res =>{
                // // setlicense(res.data[0].license_number);
                // setChildname(res.data[0].child_name);
                // setDob(res.data[0].formatted_dob);
                setmonthDATA(res.data);
                // setAllergies(res.data[0].allergies);
                // // setConsent(res.data[0].consent);
                // // console.log(res.data);
            })
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }
        monthdata();


        const fetchData = async() =>{
            try{
    
            await axios.get(`http://localhost:3002/child`,{
                params:{
                    child_id: child_id
                }
            }).then(res =>{
                // setlicense(res.data[0].license_number);
                setChildname(res.data[0].child_name);
                setDob(res.data[0].formatted_dob);
                setAllergies(res.data[0].allergies);
                // setConsent(res.data[0].consent);
                // console.log(res.data);
            })
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }
        fetchData();

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
                                <div className="col s4">
                                    <span className="title">Week: {child.week_number}</span>
                                </div>
                                <div className="col s4">
                                    <span className="title">Fee: {child.fee}</span>
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


        const fetchLedger = async() =>{
            try{
            await axios.get(`http://localhost:3002/ledger/child`,{
                params:{
                    child_id: child_id
                }
            }).then(res =>{
                // setfeelist(res.data);
                // console.log(res.data);
                const ledgerHTML = res.data.map(child =>{
                    return(
                        <li className="collection-item" key={child.week_number} >
                            <div className="row">
                                <div className="col s2">
                                    <span className="title">Week: {child.week_number}</span>
                                </div>
                                <div className="col s2">
                                    <span className="title">license: {child.license_number}</span>
                                </div>
                                <div className="col s2">
                                    <span className="title">Payment Status: {child.payment_status}</span>
                                </div>
                                <div className="col s2">
                                    <span className="title">Confirm Status: {child.confirm_status}</span>
                                </div>
                                <div className="col s2">
                                    <span className="title">Fee: {child.fee_per_week}</span>
                                </div>
                            </div>
                        </li>
                    )
                })
                setList2(ledgerHTML);
                // console.log("C IDs");
                // console.log(res.data);
            })
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }
        fetchLedger();

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
        <form className="col s12" onSubmit={handleChild}>
            <div className="row">
            <div className="input-field col s12">
            <input
            type="text"
            id="textarea1"
            value={name}
            className="materialize-textarea"
            onChange={(e) => setChildname(e.target.value)}
            />
            {/* <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setChildname(e.target.value)}}></textarea> */}
            <label htmlFor="textarea1">Name</label>
            </div>
            <div className="input-field col s12">
            {/* <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setDob(e.target.value)}}></textarea> */}
            <input
            id="textarea1"
            className="materialize-textarea"
            type="text"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            />
            <label htmlFor="textarea1">DOB</label>
            </div>
            <div className="input-field col s12">
            <input
            id="textarea1"
            className="materialize-textarea"
            type="text"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            />
            {/* <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setAllergies(e.target.value)}}></textarea> */}
            <label htmlFor="textarea1">Allergies</label>
            </div>
            {/* <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setlicense(e.target.value)}}></textarea>
            <input
            type="text"
            id="textarea1"
            className="materialize-textarea"
            value={license}
            onChange={(e) => setlicense(e.target.value)}
            />
            <label htmlFor="textarea1">License Number</label>
            </div> */}
            <button className="col s2"> Update</button>
        </div>
       
        </form>
        </div>
    </li>
    <li>
        <div className="collapsible-header">
        Unenroll Child
        </div>
        <div className="collapsible-body">
            Kindly notedown child ID and visit respective Facility Admin for Unenrollment.
        </div>
    </li>
    <li>
        <div className="collapsible-header">
        Attendance Report.
        </div>
        <div className="collapsible-body">
    <ul className="collapsible">
        <li>
        <div className="collapsible-header">
        Monthly Attendance
        </div>
        <div className="collapsible-body">
        <div>
            <TableComponentMonth data={monthDATA} />
        </div>
        </div>
    </li>
    <li>
        <div className="collapsible-header">
        Weekly Attendance
        </div>
        <div className="collapsible-body">
            <div>
            <TableComponentWeek data={weekDATA} />
            </div>
        </div>
    </li>
    </ul>
        </div>
    </li>
    </ul>
        </div>
    )
}

export default Child;