import React, { Component } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Login from './Components/Login';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import Home from './Components/Home'
import FacilityAdmin from './Components/Roles/FacilityAdmin/FacilityAdmin';
import Parent from './Components/Roles/Parent/Parent';
import SystemAdmin from './Components/Roles/SystemAdmin/SystemAdmin';
import Teacher from './Components/Roles/Teacher/Teacher';
import EnrollChild from './Components/Child/EnrollChild';
import EnrollTeacher from './Components/Roles/Teacher/EnrollTeacher';
import TeacherAttendance from './Components/Attendance/TeacherAttendance';
import LedgerData from './Components/Ledger/LedgerData';
import Reports from './Components/Report/Report';
import ClassAttendance from './Components/Attendance/ClassAttendance';


class App extends Component {
  render() {
    return (
      // <div className="App">
      // <h1>HI</h1>
      // </div>
      <BrowserRouter>
        {/* <Navbar/> */}
        <Routes>
          <Route index element={<Navigate to='/login' />} />
          <Route path='/login' element={<Login />} />

          <Route element={<ProtectedRoute />}>
            {/* <Route path='/home' element={<Home/>} /> */}

            <Route path='/teacher'>
              <Route path=':teacher_id' element={<Teacher />} />
            </Route>
            <Route path='/systemadmin' element={<SystemAdmin/>} />
            <Route path='/facilityadmin'>
              <Route path=':facility_id' element={<FacilityAdmin />} />
            </Route>
            <Route path='/parent'>
              <Route path=':parent_id' element={<Parent />} />
            </Route>
            <Route path='/attendance'>
              <Route path=':class_id' element={<ClassAttendance/>} />
            </Route>

            <Route path='/enrollchild' element={<EnrollChild/>} />
            <Route path='/enrollteacher' element={<EnrollTeacher/>} />
            <Route path='/teacherattendance' element={<TeacherAttendance/>} />
            <Route path='/ledgerdata' element={<LedgerData/>} />
            <Route path='/reports' element={<Reports/>} />
            
          </Route>

          {/* <Route element={<ProtectedRoute />}>
            <Route path='/student'>
              <Route path=':s_id' element={<Student />} />
            </Route>
            <Route path='/takes/student'>
              <Route path=':s_id' element={<TakesStudent />} />
            </Route>
            <Route path='/takes/course'>
              <Route path=':c_id' element={<TakesCourse />} />
            </Route>

            <Route path='/instructor'>
              <Route path=':i_id' element={<Instructor />} />
            </Route>
            <Route path='/teaches/instructor'>
              <Route path=':i_id' element={<Teaches />} />
            </Route>
            <Route path='/admin'>
              <Route path=':a_id' element={<Admin />} />
            </Route>

            <Route path='/studentlist' element={<Studentlist/>} />
            <Route path='/instructorlist' element={<Instructorlist />} />
            <Route path='/courselist' element={<Courselist/>} />
          </Route> */}

        </Routes>
      </BrowserRouter>
    );
  }

}

export default App;