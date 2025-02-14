import React from 'react'
import './css/App.css'
import NavBar from './components/NavBar'
import { FormComponent } from './components/FormComponent.jsx'
import{Route,Routes} from 'react-router'
import { ApiPage } from './pages/ApiPage.jsx'
import { LoginProvider } from './components/Context/LoginProvider.jsx'
import { UserPage } from './pages/userPage.jsx'
import { CosasReact } from './pages/CosasReact.jsx'
import { ComprasReducer } from './pages/ComprasReducer.jsx'
import { ThemeProvider } from './components/Context/ThemeContext.jsx'
import PaginaVoz from './components/PaginaVoz.jsx'
import { Chatbot } from './components/Chatbot.jsx'
import LolReport from './pages/LolReport.jsx'

const App=()=> {

  return (
    <>
    <ThemeProvider>
      <NavBar/>
      <LoginProvider>
      <Chatbot></Chatbot>
        <Routes>
          <Route path='/' element={<ApiPage></ApiPage>}></Route>
          <Route path='/form' element={<FormComponent/>}></Route>
          <Route path='/userpage' element={<UserPage/>}></Route>
          <Route path='/react' element={<CosasReact/>}></Route>
          <Route path='/useReducer' element={<ComprasReducer/>}></Route>
          <Route path='/Voz' element={<PaginaVoz/>}></Route>
          <Route path='/Box' element={<Chatbot/>}></Route>
          <Route path='/Report' element={<LolReport/>}></Route>
        </Routes>
      
      </LoginProvider>
      </ThemeProvider>
    </>
  )
}

export default App
