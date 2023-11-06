import React, { useEffect,useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from 'axios';
import M from "materialize-css";
const EnrollChild = () =>{

    const [parentemail,setParentemail] = useState('');
    const [parentname,setParentname] = useState('');
    const [parentph,setParentph] = useState('');
    const [password,setPassword] = useState('');
    const [addr,setaddr] = useState('');
    const [childname,setChildname] = useState('');
    const [dob,setDob] = useState('');
    const [allergies,setAllergies] = useState('');
    const [consent,setConsent] = useState(false);
    const [childid,setChildid] = useState('');

    const ck_license = Cookies.get('license');

    useEffect(() => {
        // Initialize Materialize components
        M.AutoInit();
      }, []);

    // document.addEventListener('DOMContentLoaded', function() {
    //     const collapse = document.querySelectorAll('.collapsible');
    //     M.Collapsible.init(collapse);
    //   });
      
    useEffect(()=>{

    },[parentemail,parentname,parentph,addr])

    const handleAddParent = (e)=>{

        e.preventDefault();

        const addParent = async()=>{
            try {
                axios.post(`http://localhost:3002/parent/add`,{
                    email: parentemail,
                    name: parentname,
                    password: password,
                    ph: parentph,
                    addr: addr
                }).then(res =>{
                    alert("Parent Added Successfully!");
                    // window.location.reload();
                    setParentemail('');
                    setPassword('');
                    setParentname('');
                    setParentph('');
                    setaddr('');
                })
                
            } catch (error) {
                console.error(error);
            }
        }
        addParent();
    }

    const handleAddChild = (e) =>{
        e.preventDefault();

        const addChild = async()=>{
            try{

                console.log(parentemail,childname,dob,consent,ck_license);

                axios.post(`http://localhost:3002/child/add`,{
                    parentemail: parentemail,
                    name: childname,
                    dob: dob,
                    allergies: allergies,
                    consent: consent,
                    license: ck_license
                }).then(res =>{
                    
                    if(res.data[0].val === 1){
                        alert("Child Added Successfully!");
                    }else{
                        alert("Invalid Parent ID, Please Re-try.");
                    }
                    // window.location.reload();
                })

            }catch(error){
                console.error(error)
            }
        }

        addChild();
    }

    const handleDeleteChild = (e) =>{
        e.preventDefault();

        const deleteChild = async()=>{
            try{

                // console.log(parentemail,childname,dob,consent,ck_license);

                alert("Please Confirm your Decision.");

                axios.post(`http://localhost:3002/child/delete`,{
                    childid: childid

                }).then(res =>{
                    if(res.data[0].val === 1){
                        alert("Child Deleted Successfully!");
                    }else{
                        alert("Invalid Parent ID, Please Re-try.");
                    }
                    // window.location.reload();
                })

            }catch(error){
                console.error(error)
            }
        }

        deleteChild();
    }

    return(
        <div className="container">

        <h3 className="center"> Manage Children</h3>
        
    <ul className="collapsible">
    <li>
        <div className="collapsible-header">
        New Parent?     Parent Please Register
        </div>
        <div className="collapsible-body">
        <form className="col s12" onSubmit={handleAddParent}>
            <div className="row">
            <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setParentemail(e.target.value)}}></textarea>
            <label htmlFor="textarea1">email id</label>
            </div>
            <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setPassword(e.target.value)}}></textarea>
            <label htmlFor="textarea1">Password</label>
            </div>
            <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setParentname(e.target.value)}}></textarea>
            <label htmlFor="textarea1">name</label>
            </div>
            <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setParentph(e.target.value)}}></textarea>
            <label htmlFor="textarea1">Phone Number</label>
            </div>
            <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setaddr(e.target.value)}}></textarea>
            <label htmlFor="textarea1">Address</label>
            </div>
            <button className="col s2"> Add Parent</button>
        </div>
       
        </form>
        </div>
    </li>
    <li>

        <div className="collapsible-header">Add Child</div>
      
        <div className="collapsible-body">
        <form className="col s12" onSubmit={handleAddChild}>
            <div className="row">
            <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setParentemail(e.target.value)}}></textarea>
            <label htmlFor="textarea1">Parent email id</label>
            </div>
            <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setChildname(e.target.value)}}></textarea>
            <label htmlFor="textarea1">Name of the Child</label>
            </div>
            <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setDob(e.target.value)}}></textarea>
            <label htmlFor="textarea1">DOB</label>
            </div>
            <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setAllergies(e.target.value)}}></textarea>
            <label htmlFor="textarea1">Allergies</label>
            </div>
            <div className="input-field col s12">
                <p>
                    <label>
                    <input
                    type="checkbox"
                    className="filled-in"
                    checked={consent}
                    onChange={ (e) => {setConsent(!consent)}}
                    />
                    <span>Consent Form</span>
                    </label>
                </p>
            </div>
            <button className="col s2"> Add Child</button>
        </div>
       
        </form>
        </div>
    </li>   
        
    <li>

        <div className="collapsible-header">Delete Child</div>

        <div className="collapsible-body">
  <form className="col s12" onSubmit={handleDeleteChild}>
      <div className="row">
      <div className="input-field col s12">
      <textarea id="textarea1" className="materialize-textarea" onChange={(e) => {setChildid(e.target.value)}}></textarea>
      <label htmlFor="textarea1">Child ID</label>
      </div>
      <button className="col s2"> Delete Child</button>
  </div>
 
  </form>
        </div>
    </li> 

    </ul>

    {/* <ul className="collapsible">
    <li>
      <div className="collapsible-header"><i className="material-icons">filter_drama</i>First</div>
      <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
    </li>
    <li>
      <div className="collapsible-header"><i className="material-icons">place</i>Second</div>
      <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
    </li>
    <li>
      <div className="collapsible-header"><i className="material-icons">whatshot</i>Third</div>
      <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
    </li>
  </ul> */}

</div>

    

    )
}

export default EnrollChild;