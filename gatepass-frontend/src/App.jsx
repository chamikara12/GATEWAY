
import './App.css'
import Header from './components/header'
import ProduxtCarts from './components/productCarts'
import Footer from './components/footer.jsx'
import LodingPage from './pages/loginPage.jsx'
import LoginPage from './pages/loginPage.jsx'
import SignIn from './pages/signIn.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AdminPage } from './pages/admin.jsx'

//api me function eka athule header tag eka liyn warayak pasa awenne header.jsx eka uda isana pallehata read wena eka 

function App() {
  return(
    
    <BrowserRouter>
      <div>
        <Header/>
        <Routes path='/*'>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/signin/*' element={<SignIn/>}/> 
          <Route path='/admin/*' element={<AdminPage/>}/>
          <Route path='/*' element={<h1>404 Not Found</h1>}/>

        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
