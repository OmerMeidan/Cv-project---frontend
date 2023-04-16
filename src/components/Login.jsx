import React from 'react';
import {useState,useEffect} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import SignUp from '../components/SignUp'
import axios from 'axios'
import { useContext } from 'react';
import { IdContext } from '../App';
import img from '../images/img.png'
import {Card,TextField,Button,Typography,Box} from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';
function Login() {
    const [none,setNone]=useState('none')
    const {id,setId}=useContext(IdContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error,setError]=useState('')
    const navigate=useNavigate()
    useEffect(() =>  {
        if(!sessionStorage.getItem('token')){
            navigate('/')
        }
    }, [])
    const getData = async ()=>{
        const obj={
            email:email,
            password:password
        }
        try{
            const res= await axios.post("http://localhost:3003/Login",obj)
            const res2=await axios.post("http://localhost:3003/GetId",obj)
            console.log(res.data);
            if(res.data){
                setId(res2.data)
                sessionStorage.setItem("id",JSON.stringify(res2.data))
                console.log(res2.data);
                navigate("/HomePage")
                sessionStorage.setItem("token",JSON.stringify(res.data))
            }
        }
        catch(error){
            setError('Incorect password or email')
            setNone('block')
            console.log(error);
        }
    }
    return (
        <div style={{width:'100vw',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',justifyContent:'space-around',backgroundImage:`url(${img})`}}>
            <Typography color='white' variant="h1" gutterBottom>Cv Creator</Typography>
            <Card style={{width:'30%',height:'60%',display:'flex',display:'flex',flexDirection:'column',justifyContent:'space-evenly',alignItems:'center',backgroundColor:'rgba(255,255,255,.5)'}}>
            <TextField label="Email" variant="outlined"  sx={{width:'fit-content'}} onChange={(e)=>setEmail(e.target.value)} type="text"/>
            <TextField helperText={<Typography sx={{color:'red',fontSize:'0.9vw'}}>{`${error}`}</Typography>} label="Password" variant="outlined"  sx={{width:'fit-content'}} onChange={(e)=>setPassword(e.target.value)} type="password"/>
            <Button variant="outlined" sx={{backgroundColor:'rgba(255,255,255,.2)'}} onClick={()=>getData()}>Log in</Button>
            <NavLink to='/SignUp' style={{textDecoration:'none'}}><Typography sx={{color:'white'}}>Doesnt have an acount? Sing in for free !</Typography></NavLink>
            </Card>
            <Box sx={{display:`${none}`}}>
            <Alert severity="error">This is an error alert — check it out!</Alert>
            </Box>
           
        </div>
    );
}

export default Login;