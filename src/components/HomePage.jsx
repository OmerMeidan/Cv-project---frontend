import React from 'react';
import {useNavigate,NavLink} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios'
import { useContext,useEffect} from 'react';
import { IdContext } from '../App';
import img from '../images/img.png'
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Card,TextField,Button,Typography,Box,InputLabel,Select,MenuItem,FormControl,AppBar} from '@mui/material';
function HomePage() {
    const {id,setId,resultsArr,setResultsArr}=useContext(IdContext)
    const [fullName, setFullName] = useState("")
    const [jobTitle, setJobTitle] = useState("")
    const [education, setEducation] = useState("")
    const [educationTime,setEducationTime]=useState('')
    const [aboutMe, setAboutMe] = useState("")
    const [skills, setSkills] = useState("")
    const [phone, setPhone] = useState("")
    const [mail, setMail] = useState("")
    const [adress, setAdress] = useState("")
    const [language, setLanguage] = useState("")
    const [languageLevel,setLanguageLevel]=useState(0)
    const [jobResume, setJobResume] = useState("")
    const [jobDiscription,setJobDiscription]=useState("")
    const [skillsArr,setSkillsArr]=useState([])
    const [jobArr,setJobArr]=useState([])
    const [educationArr,setEducationArr]=useState([])
    const [languageArr,setLanguageArr]=useState([])
    const navigate=useNavigate()
    useEffect(() =>  {
        if(!sessionStorage.getItem('token')){
            navigate('/')
        }
    }, [])
    const logOut=()=>{
        sessionStorage.clear()
        if(!sessionStorage.getItem('token')){
            navigate('/')
        }
    }
    const addSkills=()=>{
        setSkillsArr([...skillsArr,skills])
    }
    const addToJobList =()=>{
        setJobArr([...jobArr,[jobResume,jobDiscription]])
    }
    const addToEducationList=()=>{
        setEducationArr([...educationArr,[education,educationTime]])
    }
    const addLanguage=()=>{
        setLanguageArr([...languageArr,[language,languageLevel]])
    }
    const SetNewCv= async ()=>{
       console.log(fullName);
       const obj= {
            fullName:fullName,
            jobTitle:jobTitle,
            education:educationArr,
            aboutMe:aboutMe,
            skills:skillsArr,
            contact:[phone,mail,adress],
            language:languageArr,
            jobResume:jobArr,
            owner:id
         }
         console.log(obj);
         try{
             const response = await axios.post('http://localhost:3003/CvCreator',obj)
             console.log(response.data)
         }
         catch(error){
            console.log(error);
         }
    }
    console.log(languageLevel);
    return (
        <Box sx={{width:'100vw',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',justifyContent:'space-around',backgroundImage:`url(${img})`}}>
            <Box sx={{position:'sticky'}}>
            <AppBar sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%',height:'8%',background:'lightblue',marginTop:'0'}}>
            <Typography fontSize='2vw' color='black'>CvCreator</Typography>
            <IconButton><LogoutIcon sx={{alignSelf:'flex-end'}} onClick={()=>logOut()}/></IconButton>
            </AppBar>
            </Box>

            <Card  style={{width:'40%',height:'80%',display:'flex',flexDirection:'column',justifyContent:'space-evenly',alignItems:'center',backgroundColor:'rgba(255,255,255,.5)'}}>
            <Box sx={{display:'flex',flexDirection:'row',width:'100%',gap:'1vw',justifyContent:'center'}}>
            <TextField label="Full Name" variant="outlined"  sx={{width:'fit-content'}} type="text" onChange={(e)=>setFullName(e.target.value)} />
            <TextField label="Job title" variant="outlined"  sx={{width:'fit-content'}} type="text" placeholder='' onChange={(e)=>setJobTitle(e.target.value)} />
            </Box>

            <Box sx={{display:'flex',flexDirection:'row',width:'100%',gap:'1vw',justifyContent:'center'}}>
            <TextField label="Education" variant="outlined"  sx={{width:'fit-content'}} type="text" placeholder='' onChange={(e)=>setEducation(e.target.value)} />
            <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            <TextField label="Education Time" variant="outlined"  sx={{width:'fit-content'}} type="text" placeholder='' onChange={(e)=>setEducationTime(e.target.value)} />
            <IconButton onClick={()=>addToEducationList()}><AddCircleOutlineIcon/></IconButton>
            </Box>
            </Box>
            <label>About Me</label>
            <textarea style={{width:'65%',height:'20%',backgroundColor:'transparent',border:'0.1px solid',borderRadius:'1vw',minWidth:'69%',maxWidth:'70%',maxHeight:'20%',fontFamily:'inherit'}} type="text" onChange={(e)=>setAboutMe(e.target.value)} />

            <Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'center'}}>
            <TextField label="Skills" variant="outlined"  sx={{width:'66%'}} type="text" placeholder='' onChange={(e)=>setSkills(e.target.value)} />
            <IconButton><AddCircleOutlineIcon onClick={()=>addSkills()}/></IconButton>
            </Box>

            <Box sx={{display:'flex',flexDirection:'row',width:'100%',gap:'1vw',justifyContent:'center'}}>
            <TextField label="Phone Number" variant="outlined"  sx={{width:'30%'}} type="text" placeholder='' onChange={(e)=>setPhone(e.target.value)} />
            <TextField label="Email" variant="outlined"  sx={{width:'25%'}} type="text" placeholder='' onChange={(e)=>setMail(e.target.value)} />
            <TextField label="Adress" variant="outlined"  sx={{width:'25%'}} type="text" placeholder='' onChange={(e)=>setAdress(e.target.value)} />
            </Box>

            <Box sx={{display:'flex',flexDirection:'row',width:'100%',gap:'2vw',justifyContent:'center'}}>
            <TextField label="Language" variant="outlined"  sx={{width:'fit-content'}} type="text" placeholder='' onChange={(e)=>setLanguage(e.target.value)} />
            <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',width:'40%'}}>
            <FormControl sx={{width:'100%'}}>
                <InputLabel>Level</InputLabel>
            <Select label="Level" onChange={(e)=>setLanguageLevel(e.target.value)}>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
            </Select>
            </FormControl>
            <IconButton><AddCircleOutlineIcon onClick={()=>addLanguage()}/></IconButton>
            </Box>
            </Box>

            <Box sx={{display:'flex',flexDirection:'row',width:'100%',gap:'2vw',justifyContent:'center'}}>
            <TextField label="Job Resume" variant="outlined"  sx={{width:'fit-content'}} type="text" placeholder='' onChange={(e)=>setJobResume(e.target.value)} />
            <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            <TextField label="Job Discription" variant="outlined"  sx={{width:'fit-content'}} type="text" placeholder='' onChange={(e)=>setJobDiscription(e.target.value)} />
            <IconButton><AddCircleOutlineIcon onClick={()=>addToJobList()}/></IconButton>
            </Box>
            </Box>

            <Box sx={{display:'flex',flexDirection:'row',width:'100%',gap:'2vw',alignItems:'center',justifyContent:'center'}}>
            <Button variant="outlined" sx={{backgroundColor:'rgba(255,255,255,.2)'}} onClick={()=>SetNewCv()}>Create</Button>
            <NavLink style={{textDecoration:'none'}} to='/CvResults'><Button variant="outlined" sx={{backgroundColor:'rgba(255,255,255,.2)',width:'fit-content'}}>show me the result</Button></NavLink> 
            </Box>
        </Card>
        </Box>
    );
}

export default HomePage;