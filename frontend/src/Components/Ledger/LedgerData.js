import React, { useEffect,useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Cookies from "js-cookie";
import M from "materialize-css";
import axios from 'axios';

const LedgerData = () =>{

    const [week,setWeek] = useState('');
    const [list,setList] = useState([]);
    const [list2,setList2] = useState([]);
    const [feelist,setfeelist] = useState([]);
    const [feelist2,setfeelist2] = useState([]);
    let counter_pay = 0, counter_paid = 0;

    const ck_license = Cookies.get('license');

    useEffect(() => {
        // Initialize Materialize components
        M.AutoInit();
      }, []);

    useEffect(() => {

        setWeek(Cookies.get('week'));

        const fetchFee = async() =>{
            try{
    
            await axios.get(`http://localhost:3002/ledger/all`,{
                params:{
                    license: ck_license
                }
            }).then(res =>{
                setfeelist2(res.data);
                // console.log("C IDs");
                // console.log(feelist2);
                // console.log(res.data);
            })
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }

        const fetchFeeCollect = async() =>{
            try{
    
            await axios.get(`http://localhost:3002/ledger/collect`,{
                params:{
                    license: ck_license
                }
            }).then(res =>{
                setfeelist(res.data);
                // console.log("C IDs");
                // console.log(res.data);
            })
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }
        fetchFee();
        counter_pay++;
        fetchFeeCollect();
        counter_pay++;
    }, [week,counter_paid])

    useEffect(() => {

        const feeHtml = feelist.map(child =>{
            return(
                <li className="collection-item" key={child.child_id} >
                    <div className="row">
                        <div className="col s6">
                            <span className="title">Child Id: {child.child_id}</span>
                        </div>
                        <div className="s6">
                            <span className="title">Week: {child.week_number}</span>
                        </div>
                        <div className="right">
                        <button className="material-icons" onClick={() => handleConfirmclick(child.week_number, child.child_id)}>Confirm Payment</button>
                        </div>
                    </div>
                </li>
            )
        })

        const feeHtml2 = feelist2.map(child =>{
            return(
                <li className="collection-item" key={child.child_id} >
                    <div className="row">
                        <div className="col s6">
                            <span className="title">Child Id: {child.child_id}</span>
                        </div>
                        <div className="s6">
                            <span className="title">Week: {child.week_number}</span>
                        </div>
                        <div className="right">
                        <span className="title">Payment Status: {child.payment_status}</span>
                        </div>
                    </div>
                </li>
            )
        })
        
        setList2(feeHtml2);
        setList(feeHtml);

    },[feelist,counter_pay])

    const handleConfirmclick = (week,child_id) =>{

        // week.preventDefault();

        const confirmClick = async()=>{
            try{

                // console.log(parentemail,childname,dob,consent,ck_license);

                axios.post(`http://localhost:3002/ledger/confirm`,{
                   week: week,
                   child_id: child_id,
                   license: ck_license
                }).then(res =>{
                    
                    if(res.data[0].val === 1){
                        alert("Successfully Confirmed Payment");
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

    const handleLedgerData = (e) =>{
        e.preventDefault();

        const ledgerData = async()=>{
            try{

                // console.log(parentemail,childname,dob,consent,ck_license);

                axios.post(`http://localhost:3002/ledger`,{
                   week: week
                }).then(res =>{
                    
                    if(res.data[0].val === 1){
                        alert("Data Added for this Week Successfully!");
                    }else{
                        alert("Data already added for this Week.");
                    }
                    // window.location.reload();
                })

            }catch(error){
                console.error(error)
            }
        }

        ledgerData();
    }

        
    return(
        <div className="container">

        <h3 className="center"> Manage Ledger</h3>
        <form className="center" onSubmit={handleLedgerData}>
            Note: Click this Button to auto set Ledger FEE Data.
            <button className="center"> Data </button>
        </form>
    <ul className="collapsible">
    <li>
        <div className="collapsible-header">
        Collect Payment
        </div>
        <div className="collapsible-body">
            <ul className="collection">
            {list}
            </ul>
        </div>
    </li>
    <li>
        <div className="collapsible-header">
        Ledger of Each Child
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

export default LedgerData;