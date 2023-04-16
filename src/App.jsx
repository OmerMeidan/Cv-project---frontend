import './App.css';
import {Routes,Route} from 'react-router-dom'
import  Login  from '../src/components/Login'
import  SignUp  from '../src/components/SignUp'
import HomePage from './components/HomePage';
import Context from './components/Context';
import axios from 'axios'
import { createContext,useEffect} from 'react';
import CvResults from './components/CvResults';
import Pdf from './components/Pdf';
export const IdContext=createContext()
function App() {
  const {setId,id,resultsArr,setResultsArr}=Context()
  const data={setId,id,resultsArr,setResultsArr}
  return (
    <div style={{width:'100vw',height:'100vh',textAlign:'center'}}>
      <IdContext.Provider value={data}>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/HomePage' element={<HomePage/>}/>
        <Route path='/CvResults' element={<CvResults/>}/>
        <Route path='/Pdf/:index' element={<Pdf/>}/>
        <Route path='/Pdf' element={<Pdf/>}/>
      </Routes>
      </IdContext.Provider>
    </div>
  );
}

export default App;
