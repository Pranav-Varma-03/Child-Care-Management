import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from 'axios';
import M from "materialize-css";

const SystemAdmin = () => {

    console.log('entered System admin Page!!');
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [FAname, setFAname] = useState('');
    const [Fname, setFname] = useState('');
    const [license, setlicense] = useState('');
    const [addr, setaddr] = useState('');

    useEffect(() => {
        M.AutoInit();
    }, []);

    const handleAddFacility = (e) => {
        e.preventDefault();
        console.log(license)
        const addF = async () => {
            try {

                axios.post(`http://localhost:3002/facility/add`, {
                    Fname: Fname,
                    addr: addr,
                    license: license

                }).then(res => {

                    if (res.data[0].val === 1) {
                        alert("Facility Added Successfully!");
                    } else {
                        alert("Invalid, Please Re-try.");
                    }
                    window.location.reload();
                })

            } catch (error) {
                console.error(error)
            }
        }

        addF();


    }

    const handleAddFacilityAdmin = (e) => {
        e.preventDefault();

        const addFA = async () => {
            try {

                axios.post(`http://localhost:3002/facilityadmin/add`, {
                    FAname: FAname,
                    email: email,
                    password: password,
                    license: license
                }).then(res => {

                    if (res.data[0].val === 1) {
                        alert("Facility Admin Added Successfully!");
                    } else {
                        alert("Invalid, Please Re-try.");
                    }
                    // window.location.reload();
                })

            } catch (error) {
                console.error(error)
            }
        }

        addFA();

    }

    return (
        <div>
            <div className="container">
                <h2 className="center">System Admin</h2>
                <h3 className="center">HOME PAGE</h3>


                <ul className="collapsible">
                    <li>
                        <div className="collapsible-header">
                            Create Facility
                        </div>
                        <div className="collapsible-body">
                            <form className="col s12" onSubmit={handleAddFacilityAdmin}>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setemail(e.target.value) }}></textarea>
                                        <label htmlFor="textarea1">email id</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setPassword(e.target.value) }}></textarea>
                                        <label htmlFor="textarea1">Password</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setFAname(e.target.value) }}></textarea>
                                        <label htmlFor="textarea1">Facility Admin Name</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setlicense(e.target.value) }}></textarea>
                                        <label htmlFor="textarea1">License Number</label>
                                    </div>
                                    <button className="col s2"> Add Facility Admin</button>
                                </div>
                            </form>
                            <form className="col s12" onSubmit={handleAddFacility}>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setFname(e.target.value) }}></textarea>
                                        <label htmlFor="textarea1">Facility Name</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setaddr(e.target.value) }}></textarea>
                                        <label htmlFor="textarea1">Address</label>
                                    </div>
                                    <button className="col s2"> Add Facility</button>
                                </div>
                            </form>
                        </div>
                    </li>

                </ul>

                <ul className="collapsible">
                    <h6 className="center">
                    Note: Following links are only for Viewing Purposes, Actual Data will not be displayed. 
                    </h6>
                    <li>
                        <div className="collapsible-header">
                            View Models
                        </div>
                        <div className="collapsible-body">
                            <ul>
                                <li>
                                <a href="/facilityadmin/0">Facility Admin</a> 
                                </li>
                                <li>
                                <a href="/teacher/0">Teacher</a> 
                                </li>
                                <li>
                                <a href="/parent/0">Parent</a> 
                                </li>
                            </ul>
                        </div>
                    </li>

                </ul>

            </div>
        </div>
    )
}

export default SystemAdmin;