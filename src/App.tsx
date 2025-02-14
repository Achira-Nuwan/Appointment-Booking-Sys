import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Calendar } from './components/Calendar';
import CreateUser from './components/CreateUser';
import Home from './components/Home';
import Services from './components/Servicers';

function App() {
  return (
    <BrowserRouter>
    <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/calendar' element={<Calendar/>} />
          <Route path='/services' element={<Services/>} />
          <Route path='/createUser' element={<CreateUser/>} />
    </Routes>
</BrowserRouter>
  )
}

export default App
