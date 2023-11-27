import React, { useEffect,useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from 'axios';
import M from "materialize-css";

const Reports = () =>{

    const [totMoneyBilled,settotMoneyBilled] = useState([]);
    const [totMoneyEarned,settotMoneyEarned] = useState([]);
    const ck_license = Cookies.get('license');
    const ck_week = Cookies.get('week');
    const [class_ids,setCids] = useState([]);
    const [list,setList] = useState([]);
    var counter = 0;

    useEffect(() => {
        const allClasses = async() =>{
            try{
    
            await axios.get(`/allclasses`,{
                params:{
                    license: ck_license
                }
            }).then(res =>{
                // setCids(res.data);
                // console.log("C IDs");
                // console.log(res.data); 
                // console.log(class_ids);
                const feeHtml = res.data.map(cls =>{
                    return(
                        <li className="collection-item" key={cls.class_id} >
                            <div className="row">
                                <div className="col s6">
                                    <a href={`/attendance/${cls.class_id}`} className="title">Class Id: {cls.class_id}</a>
                                </div>
                            </div>
                        </li>
                    )
                })
        
                setList(feeHtml);   
            })
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }
    
        allClasses();
        counter++;
    },[])

    useEffect(() => {
        // Initialize Materialize components
        M.AutoInit();
    }, []);
    
    useEffect(() => {

        const TotalEarned = async() =>{
            try{
    
            await axios.get(`/earned`,{
                params:{
                    license: ck_license,
                    week: ck_week
                }
            }).then(res =>{
                if(res.data[0].total_money == null){
                    settotMoneyEarned({total_earned: 0});
                    // console.log(totMoneyEarned);
                }else{
                    settotMoneyEarned(res.data[0]);
                }
                // console.log("C IDs");
                // console.log(res.data)
            })
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }
    
        TotalEarned();
        counter++;

        const TotalBilled = async() =>{
            try{
    
            await axios.get(`/billed`,{
                params:{
                    license: ck_license,
                    week: ck_week
                }
            }).then(res =>{
                if(res.data[0].total_money == null){
                    settotMoneyBilled([0]);
                }else{
                    settotMoneyBilled(res.data[0]);
                    // console.log(totMoneyBilled)
                    // console.log({total_money: 15})
                }
                // console.log("C IDs");
                // console.log(res.data)
            })
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }
    
        TotalBilled();
        counter++;
    },[])

    // useEffect(() => {

    //     // console.log(c_id)

    //     const feeHtml = class_ids.map(cls =>{
    //         return(
    //             <li className="collection-item" key={cls.child_id} >
    //                 <div className="row">
    //                     <div className="col s6">
    //                         <span className="title">Class Id: {cls.child_id}</span>
    //                     </div>
    //                 </div>
    //             </li>
    //         )
    //     })

    //     setList(feeHtml);
    //     console.log(list)

    // },[counter])

    return(
    <div className="container">

        <h3 className="center"> Reports</h3>
        
    <ul className="collapsible">
    <li>
        <div className="collapsible-header">
        Daily Attendance (Including Absents)
        </div>
        <div className="collapsible-body">
            <ul className="collection">
            {list}
            </ul>
        </div>
    </li>
    <li>
        <div className="collapsible-header">
        Total Money Earned this Week
        </div>
        <div className="collapsible-body">
        <h5>Week:{ck_week} & Value: {totMoneyEarned.total_earned}</h5>
        </div>
    </li>
    <li>
        <div className="collapsible-header">
        Total Money Billed this Week
        </div>
        <div className="collapsible-body">
        <h5>Week:{ck_week} & Value: {totMoneyBilled.total_money}</h5>
        
        </div>
    </li>
    </ul>    
    </div>
    )
}

export default Reports;