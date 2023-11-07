import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import M from "materialize-css";
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {

    const navigate = useNavigate();

    const [emailid, setemailid] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Roles');

    // const [valid,setValid] = useState(10);

    useEffect(() => {
        M.AutoInit();
    }, [])

    const handleSubmit = (e) => {

        e.preventDefault();

        const getData = async () => {
            try {
                await axios.get(`http://localhost:3002/auth`, {
                    params: {
                        role: role,
                        email: emailid,
                        password: password
                    }
                }).then(res => {


                    console.log(res.data[0].valid);

                    if (res.data[0].valid) {

                        //  
                        // navigate('/home');

                        Cookies.set('email', emailid);
                        Cookies.set('role', role);

                        console.log(role)

                        if (role === "System") {

                            navigate('/systemadmin');

                        } else if (role === "Facility") {
                            navigate('/facilityadmin/' + res.data[0].id);
                        } else if (role === "Teacher") {
                            navigate('/teacher/' + res.data[0].id);
                        } else if (role === "Parent") {
                            navigate('/parent/' + res.data[0].id);
                        }

                    } else {
                        alert('Incorrect Credentials, Please Retry');
                    }

                })

                // if(emailid == "krishna323@gmail.com" && password == "123"){
                //     navigate('/home');
                //             Cookies.set('User',1);
                //             Cookies.set('role',role);
                // }else{
                //                 alert('Incorrect Credentials, Please Retry');
                // }

            } catch (error) {

            }
        }

        getData();

        console.log(role, emailid, password);
        // console.log(valid);


    }

    return (
        <div className="center">
            <h1>Login Page</h1>
            <div className="container">

                <div className="dropdown-container">

                    <ul id="dropdown2" className="dropdown-content">
                        <li><a id="System" onClick={(e) => { setRole(e.target.id) }}>System Admin</a></li>
                        <li><a id="Facility" onClick={(e) => { setRole(e.target.id) }}>Facility Admin</a></li>
                        <li><a id="Teacher" onClick={(e) => { setRole(e.target.id) }}>Teacher</a></li>
                        <li><a id="Parent" onClick={(e) => { setRole(e.target.id) }}>Parent</a></li>
                    </ul>
                    <a className="btn dropdown-trigger" href="#!" data-target="dropdown2">{role}</a>

                    <div className="row">
                        <form className="col s12" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setemailid(e.target.value) }}></textarea>
                                    <label htmlFor="textarea1">Email id</label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setPassword(e.target.value) }}></textarea>
                                    <label htmlFor="textarea1">Password</label>
                                </div>
                            </div>

                            <button className="waves-effect waves-light btn"> Login </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login