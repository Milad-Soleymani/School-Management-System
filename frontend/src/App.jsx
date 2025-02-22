import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import School from './school/school';
import Attendance from './school/components/attendance/attendance';
import Class from './school/components/class/Class';
import Dashboard from './school/components/dashboard/dashboard';
import Examinations from './school/components/examinations/examinations';
import Notice from './school/components/notice/notice';
import Schedule from './school/components/schedule/schedule';
import Students from './school/components/students/Students';
import Subjects from './school/components/subjects/Subjects';
import Teachers from './school/components/teachers/Teachers';
import Client from './client/Client';
import Register from './client/components/register/Register';
import Home from './client/components/home/Home';
import Login from './client/components/login/Login';
import Teacher from './teacher/Teacher';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* SCHOOL ROUTE */}

          <Route path='school' element={<School />}>
            <Route index element={<Dashboard />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='attendance' element={<Attendance />} />
            <Route path='class' element={<Class />} />
            <Route path='examinations' element={<Examinations />} />
            <Route path='notice' element={<Notice />} />
            <Route path='schedule' element={<Schedule />} />
            <Route path='students' element={<Students />} />
            <Route path='subjects' element={<Subjects />} />
            <Route path='teachers' element={<Teachers />} />

          </Route>
          {/* STUDENT */}
          <Route>

          </Route>
          {/* TEACHER */}
          <Route path='teacher' element={<Teacher />} />
          {/* CLIENT */}

          <Route path='/' element={<Client />}>
            <Route index element={<Home />} />
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />


          </Route>



        </Routes>


      </BrowserRouter>
    </>
  )
}

export default App
