import React, { useEffect, useState } from "react";
// import { useNavigate,useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from 'axios';
import M from "materialize-css";

const EnrollTeacher = () => {

    const [teacheremail, setTeacheremail] = useState('');
    const [name, setName] = useState('');
    const [ph, setPh] = useState('');
    const [password, setPassword] = useState('');
    const [addr, setaddr] = useState('');
    const [dob, setDob] = useState('');
    const [sal, setSal] = useState('');
    const [classid, setClassdid] = useState('');


    const ck_license = Cookies.get('license');

    useEffect(() => {
        // Initialize Materialize components
        M.AutoInit();
    }, []);

    const handleAddTeacher = (e) => {

        e.preventDefault();

        const addParent = async () => {
            try {
                axios.post(`http://localhost:3002/parent/add`, {
                    email: teacheremail,
                    name: name,
                    password: password,
                    dob: dob,
                    ph: ph,
                    addr: addr,
                    sal: sal,
                    license: ck_license

                }).then(res => {
                    alert("Parent Added Successfully!");
                    // window.location.reload();
                })

            } catch (error) {
                console.error(error);
            }
        }
        addParent();
    }

    const handleDeleteTeacher = (e) => {
        e.preventDefault();

        const deleteChild = async () => {
            try {

                // console.log(parentemail,childname,dob,consent,ck_license);

                alert("Please Confirm your Decision.");

                axios.post(`http://localhost:3002/teacher/delete`, {
                    email: teacheremail,
                    license: ck_license

                }).then(res => {
                    if (res[0].val === 1) {
                        alert("Teacher Terminated Successfully!");
                    } else {
                        alert("Unsuccessful attempt, Please Re-try.");
                    }
                    // window.location.reload();
                })

            } catch (error) {
                console.error(error)
            }
        }

        deleteChild();
    }

    const handleTeacherAssgn = (e) => {
        e.preventDefault();

        const deleteChild = async () => {
            try {

                // console.log(parentemail,childname,dob,consent,ck_license);

                alert("Please Confirm your Decision.");

                axios.post(`http://localhost:3002/teacher/assign`, {
                    class_id: classid,
                    license: ck_license,
                    teacheremail: teacheremail

                }).then(res => {
                    if (res[0].val === 1) {
                        alert("Teacher Assigned, Successfully!");
                    } else if (res[0].val === 0) {
                        alert("Class Not Found.");
                    } else {
                        alert("Max of Teachers required for given class is Full.");
                    }
                    // window.location.reload();
                })

            } catch (error) {
                console.error(error)
            }
        }

        deleteChild();
    }

    return (
        <div className="container">

            <h3 className="center"> Manage Teacher</h3>

            <ul className="collapsible">
                <li>
                    <div className="collapsible-header">Hire Teacher</div>
                    <div className="collapsible-body">
                        <form className="col s12" onSubmit={handleAddTeacher}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setTeacheremail(e.target.value) }}></textarea>
                                    <label htmlFor="textarea1">email id</label>
                                </div>
                                <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setPassword(e.target.value) }}></textarea>
                                    <label htmlFor="textarea1">Password</label>
                                </div>
                                <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setName(e.target.value) }}></textarea>
                                    <label htmlFor="textarea1">name</label>
                                </div>
                                <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setDob(e.target.value) }}></textarea>
                                    <label htmlFor="textarea1">DOB</label>
                                </div>
                                <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setPh(e.target.value) }}></textarea>
                                    <label htmlFor="textarea1">Phone Number</label>
                                </div>
                                <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setaddr(e.target.value) }}></textarea>
                                    <label htmlFor="textarea1">Address</label>
                                </div>
                                <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setSal(e.target.value) }}></textarea>
                                    <label htmlFor="textarea1">Hourly Salary</label>
                                </div>
                                <button className="col s2"> Add Teacher</button>
                            </div>

                        </form>
                    </div>
                </li>
                <li>

                    <div className="collapsible-header">Terminate Teacher</div>

                    <div className="collapsible-body">
                        <form className="col s12" onSubmit={handleDeleteTeacher}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setTeacheremail(e.target.value) }}></textarea>
                                    <label htmlFor="textarea1">Email ID</label>
                                </div>
                                <button className="col s2"> Terminate</button>
                            </div>

                        </form>
                    </div>
                </li>
                <li>

                    <div className="collapsible-header">Assign Teacher to Class</div>

                    <div className="collapsible-body">
                        <form className="col s12" onSubmit={handleTeacherAssgn}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setClassdid(e.target.value) }}></textarea>
                                    <label htmlFor="textarea1">Class ID</label>
                                </div>
                                <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setTeacheremail(e.target.value) }}></textarea>
                                    <label htmlFor="textarea1">Teacher ID</label>
                                </div>
                                <button className="col s2"> Assign</button>
                            </div>

                        </form>
                    </div>
                </li>



            </ul>
        </div>
    )
}

export default EnrollTeacher;