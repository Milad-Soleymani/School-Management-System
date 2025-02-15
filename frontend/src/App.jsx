import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import School from './school/school';
import Attendance from './school/components/attendance/attendance';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* SCHOOL ROUTE */}
          
            <Route path='school' element={<School />}>
            <Route path='attendance' element={<Attendance />} />

          </Route>
          {/* STUDENT */}
          <Route>

          </Route>
          {/* TEACHER */}
          <Route>

          </Route>
          {/* CLIENT */}
          <Route>

          </Route>



        </Routes>


      </BrowserRouter>
    </>
  )
}

export default App
