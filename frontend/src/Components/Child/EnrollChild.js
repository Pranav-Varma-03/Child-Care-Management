import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from 'axios';
import M from "materialize-css";
const EnrollChild = () => {

    const [parentemail, setParentemail] = useState('');
    const [parentname, setParentname] = useState('');
    const [parentph, setParentph] = useState('');
    const [password, setPassword] = useState('');
    const [addr, setaddr] = useState('');
    const [childname, setChildname] = useState('');
    const [dob, setDob] = useState('');
    const [allergies, setAllergies] = useState('');
    const [consent, setConsent] = useState(false);
    const [childid, setChildid] = useState('');
    const [classid, setclassid] = useState('');
    const [type, setType] = useState('Select Type');
    const [list, setlist] = useState([]);
    const [list2, setlist2] = useState([]);
    const ck_license = Cookies.get('license');

    useEffect(() => {
        // Initialize Materialize components
        M.AutoInit();
    }, []);

    // document.addEventListener('DOMContentLoaded', function() {
    //     const collapse = document.querySelectorAll('.collapsible');
    //     M.Collapsible.init(collapse);
    //   });

    useEffect(() => {

        const fetchClass = async() =>{
            try{
    
            await axios.get(`http://localhost:3002/classroom/all`,{
                params:{
                    license: ck_license
                }
            }).then(res =>{
                // setfeelist2(res.data);
                const classHTML = res.data.map(eachclass =>{
                    return(
                        <li className="collection-item" key={eachclass.class_id} >
                            <div className="row">
                                <div className="col s6">
                                    <span className="title">Class Id: {eachclass.class_id}</span>
                                </div>
                                <div className="s6">
                                    <span className="title">Type: {eachclass.type}</span>
                                </div>
                                <div className="right">
                                    <span className="title">Capacity: {eachclass.capacity}</span>
                                </div>
                            </div>
                        </li>
                    )
                })
                // console.log("C IDs");
                // console.log(feelist2);
                // console.log(res.data);
                setlist(classHTML);
            })
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }

        fetchClass();

        const fetchChild = async() =>{
            try{
    
            await axios.get(`http://localhost:3002/children/all`,{
                params:{
                    license: ck_license
                }
            }).then(res =>{
                // setfeelist2(res.data);
                const childHTML = res.data.map(child =>{
                    return(
                        <li className="collection-item" key={child.child_id} >
                            <div className="row">
                                <div className="col s6">
                                    <span className="title">Child Id: {child.child_id}</span>
                                </div>
                                <div className="s6">
                                    <span className="title">Name: {child.name}</span>
                                </div>
                                <div className="right">
                                    <span className="title">Type: {child.type}</span>
                                </div>
                            </div>
                        </li>
                    )
                })
                // console.log("C IDs");
                // console.log(feelist2);
                // console.log(res.data);
                setlist2(childHTML);
            })
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }

        fetchChild();

    }, [parentemail, parentname, parentph, addr])

    const handleAddParent = (e) => {

        e.preventDefault();

        const addParent = async () => {
            try {
                axios.post(`http://localhost:3002/parent/add`, {
                    email: parentemail,
                    name: parentname,
                    password: password,
                    ph: parentph,
                    addr: addr
                }).then(res => {
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

    const handleChildAssgn = (e) => {
        e.preventDefault();

        const deleteChild = async () => {
            try {

                // console.log(parentemail,childname,dob,consent,ck_license);

                alert("Please Confirm your Decision.");

                axios.post(`http://localhost:3002/child/assign`, {
                    class_id: classid,
                    license: ck_license,
                    child_id: childid

                }).then(res => {
                    if (res.data[0].val === 1) {
                        alert("Assigned, Successfully!");
                    } else {
                        alert("Class type mismatch.");
                    }
                    // window.location.reload();
                })

            } catch (error) {
                console.error(error)
            }
        }

        deleteChild();
    }

    const handleAddChild = (e) => {
        e.preventDefault();

        const addChild = async () => {
            try {

                console.log(parentemail, childname, dob, consent, ck_license);

                axios.post(`http://localhost:3002/child/add`, {
                    parentemail: parentemail,
                    name: childname,
                    dob: dob,
                    allergies: allergies,
                    consent: consent,
                    license: ck_license
                }).then(res => {

                    if (res.data[0].val === 1) {
                        alert("Child Added Successfully!");
                    } else {
                        alert("Invalid Parent ID, Please Re-try.");
                    }
                    window.location.reload();
                })

            } catch (error) {
                console.error(error)
            }
        }

        addChild();
    }

    const handleCreateClassroom = (e) => {
        e.preventDefault();

        const createClass = async () => {
            try {

                // console.log(parentemail,childname,dob,consent,ck_license);

                axios.post(`http://localhost:3002/add/classroom`, {
                    type: type,
                    license:ck_license

                }).then(res => {
                    if (res.data[0].val === 1) {
                        alert("Added Successfully!");
                    } else {
                        alert("Please Re-try.");
                    }
                    window.location.reload();
                })

            } catch (error) {
                console.error(error)
            }
        }

        createClass();
    }

    const handleDeleteChild = (e) => {
        e.preventDefault();

        const deleteChild = async () => {
            try {

                // console.log(parentemail,childname,dob,consent,ck_license);

                alert("Please Confirm your Decision.");

                axios.post(`http://localhost:3002/child/delete`, {
                    childid: childid

                }).then(res => {
                    if (res.data[0].val === 1) {
                        alert("Child Deleted Successfully!");
                    } else {
                        alert("Invalid Parent ID, Please Re-try.");
                    }
                    window.location.reload();
                })

            } catch (error) {
                console.error(error)
            }
        }

        deleteChild();
    }

    return (
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
                                    <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setParentemail(e.target.value) }}></textarea>
                                    <label htmlFor="textarea1">email id</label>
                                </div>
                                <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setPassword(e.target.value) }}></textarea>
                                    <label htmlFor="textarea1">Password</label>
                                </div>
                                <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setParentname(e.target.value) }}></textarea>
                                    <label htmlFor="textarea1">name</label>
                                </div>
                                <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setParentph(e.target.value) }}></textarea>
                                    <label htmlFor="textarea1">Phone Number</label>
                                </div>
                                <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setaddr(e.target.value) }}></textarea>
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
                                    <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setParentemail(e.target.value) }}></textarea>
                                    <label htmlFor="textarea1">Parent email id</label>
                                </div>
                                <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setChildname(e.target.value) }}></textarea>
                                    <label htmlFor="textarea1">Name of the Child</label>
                                </div>
                                <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setDob(e.target.value) }}></textarea>
                                    <label htmlFor="textarea1">DOB</label>
                                </div>
                                <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setAllergies(e.target.value) }}></textarea>
                                    <label htmlFor="textarea1">Allergies</label>
                                </div>
                                <div className="dropdown-container">
                                    <ul id="dropdown2" className="dropdown-content">
                                        <li><a id="infant" onClick={(e) => { setType(e.target.id) }}>infant</a></li>
                                        <li><a id="toddler" onClick={(e) => { setType(e.target.id) }}>toddler</a></li>
                                        <li><a id="twalder" onClick={(e) => { setType(e.target.id) }}>twalder</a></li>
                                        <li><a id="3 years old" onClick={(e) => { setType(e.target.id) }}>3 years old</a></li>
                                        <li><a id="4 years old" onClick={(e) => { setType(e.target.id) }}>4 years old</a></li>
                                    </ul>
                                </div>
                                <a className="btn dropdown-trigger" href="#!" data-target="dropdown2">{type}</a>

                                <div className="input-field col s12">
                                    <p>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="filled-in"
                                                checked={consent}
                                                onChange={(e) => { setConsent(!consent) }}
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
                                    <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setChildid(e.target.value) }}></textarea>
                                    <label htmlFor="textarea1">Child ID</label>
                                </div>
                                <button className="col s2"> Delete Child</button>
                            </div>

                        </form>
                    </div>
                </li>


                <li>
                    <div className="collapsible-header">Assign Child to Class</div>

                    <div className="collapsible-body">
                        <form className="col s12" onSubmit={handleChildAssgn}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setclassid(e.target.value) }}></textarea>
                                    <label htmlFor="textarea1">Class ID</label>
                                </div>
                                <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setChildid(e.target.value) }}></textarea>
                                    <label htmlFor="textarea1">Child ID</label>
                                </div>
                                <button className="col s2"> Assign</button>
                            </div>

                        </form>
                    </div>
                </li>

                <li>
                    <div className="collapsible-header">Create Classroom</div>

                    <div className="collapsible-body">
                        <form className="col s12" onSubmit={handleCreateClassroom}>
                            <div className="row">
                            <div className="dropdown-container">
                                    <ul id="dropdown2" className="dropdown-content">
                                        <li><a id="infant" onClick={(e) => { setType(e.target.id) }}>infant</a></li>
                                        <li><a id="toddler" onClick={(e) => { setType(e.target.id) }}>toddler</a></li>
                                        <li><a id="twalder" onClick={(e) => { setType(e.target.id) }}>twalder</a></li>
                                        <li><a id="3 years old" onClick={(e) => { setType(e.target.id) }}>3 years old</a></li>
                                        <li><a id="4 years old" onClick={(e) => { setType(e.target.id) }}>4 years old</a></li>
                                    </ul>
                                </div>
                                <a className="btn dropdown-trigger" href="#!" data-target="dropdown2">{type}</a>

                                
                            </div>
                            <button className="col s2"> Create</button>
                        </form>
                    </div>
                </li>

                <li>
        <div className="collapsible-header">
        List of all Classrooms
        </div>
        <div className="collapsible-body">
            <ul className="collection">
            {list}
            </ul>
        </div>
    </li>
    <li>
        <div className="collapsible-header">
        List of all Childs
        </div>
        <div className="collapsible-body">
            <ul className="collection">
            {list2}
            </ul>
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