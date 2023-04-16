import React from 'react';
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useContext } from 'react';
import { IdContext } from '../App';
import img from '../images/img.png'
import {Card,TextField,Button,Typography} from '@mui/material';
function SignUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [error,setError]=useState('')
    const navigate = useNavigate()
    const getData = async ()=>{
        const obj={
            email:email,
            password:password,
            firstName:firstName,
            lastName:lastName
        }
        try{
            const response = await axios.post("http://localhost:3003/SignUp",obj)
            console.log(response.data);
            navigate("/HomePage")
        }
        catch(error){
            setError('Please Fulfill All Fields')
            console.log(error);
        }
    }
    return (
        <div style={{width:'100vw',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',justifyContent:'space-around',backgroundImage:`url(${img})`}}>
            <Typography color='white' variant="h1" gutterBottom>Sign Up</Typography>
            <Card style={{width:'30%',height:'60%',display:'flex',display:'flex',flexDirection:'column',justifyContent:'space-evenly',alignItems:'center',backgroundColor:'rgba(255,255,255,.5)'}}>
                <TextField helperText={<Typography sx={{color:'red',fontSize:'0.9vw'}}>{`${error}`}</Typography>} label="Email" variant="outlined" onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='email' />
                <TextField helperText={<Typography sx={{color:'red',fontSize:'0.9vw'}}>{`${error}`}</Typography>} label="Password" variant="outlined" onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='password' />
                <TextField helperText={<Typography sx={{color:'red',fontSize:'0.9vw'}}>{`${error}`}</Typography>} label="First Name" variant="outlined" onChange={(e)=>setFirstName(e.target.value)} type="text" placeholder='first Name' />
                <TextField helperText={<Typography sx={{color:'red',fontSize:'0.9vw'}}>{`${error}`}</Typography>} label="Last Name" variant="outlined" onChange={(e)=>setLastName(e.target.value)} type="text" placeholder='last Name' />
                <Button variant="outlined" sx={{backgroundColor:'rgba(255,255,255,.2)'}} onClick={()=>getData()}>Sign up</Button>
            </Card>

        </div>
    );
}

export default SignUp;