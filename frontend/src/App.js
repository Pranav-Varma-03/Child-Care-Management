import React, { Component } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Login from './Components/Login';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import Home from './Components/Home'

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
            <Route path='/home' element={<Home/>} />
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