import React, { useEffect,useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from 'axios';
import M from "materialize-css";
const Parent = () =>{

    const {parent_id} = useParams();
    const [data,setData] = useState([]);
    const [list,setList] = useState([]);

    useEffect(() => {

        const fetchData = async() =>{
            try{
    
            await axios.get(`/parent`,{
                params:{
                    parent_id: parent_id
                }
            }).then(res =>{
                setData(res.data)
            })
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
        
        const childs = async() =>{
            try{
    
            await axios.get(`/parent/children`,{
                params:{
                    parent_id: parent_id
                }
            }).then(res =>{
                // setCids(res.data);
                // console.log("C IDs");
                // console.log(res.data); 
                // console.log(class_ids);
                const childHTML = res.data.map(child =>{
                    return(
                        <li className="collection-item" key={child.child_id} >
                            <div className="row">
                                <div className="col s4">
                                    <a href={`/child/${child.child_id}`} className="title">child Id: {child.child_id}</a>
                                </div>
                                <div className="col s4">
                                    <a className="title">child Name: {child.child_name}</a>
                                </div>
                                <div className="col s4">
                                    <a className="title">facility Number: {child.license_number}</a>
                                </div>
                            </div>
                        </li>
                    )
                })
        
                setList(childHTML);   
            })
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }
    
        childs();

    },[])

    useEffect(() => {
        M.AutoInit();
    }, []);

    return(
        <div className="container">
        
        <h3 className="center"> Parent's Home Page </h3>

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
            {data.length > 0 && <p>Phone Number: {data[0].ph_number}</p>}
            </li>
            </ul>
        </div>
        <h3 className="center">Duties</h3>
        Note: Click on Child ID to Perform Tasks related to him.
    <ul className="collapsible">
    <li>
        <div className="collapsible-header">
        My Children
        </div>
        <div className="collapsible-body">
            <ul className="collection">
            {list}
            </ul>
        </div>
    </li>
    </ul>

        </div>
    )
}

export default Parent;