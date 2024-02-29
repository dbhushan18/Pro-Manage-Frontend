import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import RegisterPage from "./Pages/RegisterPage/Register"
import LoginPage from "./Pages/LoginPage/Login"
import HomePage from "./Pages/HomePage/Home"
import AnalyticsPage from './Pages/AnalyticsPage/AnalyticsPage'
import SettingsPage from './Pages/SettingsPage/SettingsPage'
import CardDetailsPage from './Pages/CardDetailsPage/CardDetailsPage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './Components/Protected Route/ProtectedRoute'

function App() {
  return (
    <>
      <BrowserRouter>
      <ToastContainer />
        <Routes>
          <Route path="/" element={<RegisterPage key="register"/>}/>
          <Route path="/login" element={<LoginPage key="login"/>}/>
          <Route path="/board" element={<ProtectedRoute Component= {HomePage} key="board"/>}/>
          <Route path="/analytics" element={<ProtectedRoute Component={AnalyticsPage} key="analytics"/>}/>
          <Route path='/settings' element={<ProtectedRoute Component={SettingsPage} key="settings"/>}/>
          <Route path='/board/card/:cardId' element={<CardDetailsPage key="card"/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
