import React from "react";

const SystemAdmin = () =>{

    console.log('entered System admin Page!!');

    return(
        <div>
            <div className="container">
            <h2 className="center">System Admin</h2>
            <h3 className="center">HOME PAGE</h3>
            <div className="collection" >
                <a href="/login" className="collection-item" style={{ color: "black" }}>Create Facility</a>
                {/* <a href="/instructorlist" className="collection-item" style={{ color: "black" }}>Manage Instructors</a>
                <a href="/courselist" className="collection-item" style={{ color: "black" }}>Manage Courses</a> */}
            </div>
        </div>
        </div>
    )
}

export default SystemAdmin;