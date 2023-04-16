import React from 'react';
import { useContext,useEffect,useState } from 'react';
import { IdContext } from '../App';
import axios from 'axios'
import img from '../images/img.png'
import {Card,TextField,Button,Typography,Box,InputLabel,Select,MenuItem,FormControl,AppBar} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkIcon from '@mui/icons-material/Work';
import IconButton from '@mui/material/IconButton';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import {NavLink, useNavigate} from 'react-router-dom'
import FormatPaintIcon from '@mui/icons-material/FormatPaint';

function CvResults() {
    const {id,setId,resultsArr,setResultsArr}=useContext(IdContext)
    const [deleteId,setDeleteId]=useState('')
    const [triger,setTriger]=useState(true)
    const [psik,setPsik]=useState(',')
    const [index,setIndex]=useState()
    const navigate=useNavigate()
    useEffect(() => {
        const CvResult= async()=>{
            console.log(id);
            const response= await axios.post('http://localhost:3003/UserCvs',{owner:id})
            console.log(response.data);
            setResultsArr(response.data)
            // localStorage.setItem('resultArr',JSON.stringify(response.data))
        }
        CvResult()
    },[triger])
        const DeleteCv = async (index)=>{
            console.log(index);
            try{
                    await axios.post('http://localhost:3003/DeleteCv',{index})
                    setResultsArr(resultsArr.filter((a,i)=>a._id!=index))
                    setTriger(!triger)
                }
                catch(error){
                    console.log(error);
                }
        }
           
    
    return (
        <Box sx={{width:'100vw',height:'100%',backgroundImage:`url(${img})`}}>
            <Typography color='white' variant="h1" gutterBottom>My Cv's</Typography>
            <Box sx={{width:'100%',height:'fit-content',display:'flex',flexDirection:'column',gap:'4vw',alignItems:'center',justifyContent:'center'}}>
            {resultsArr&&resultsArr.map((a,i)=>
            <Box component='div' sx={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
             <List
             sx={{
               width: '30%',
               bgcolor: 'background.paper',
             }}
           >
             <ListItem>
               <ListItemAvatar>
                 <Avatar>
                   <PersonIcon />
                 </Avatar>
               </ListItemAvatar>
               <ListItemText primary={a.fullName} secondary='' />
             </ListItem>
             <Divider variant="inset" component="li" />
             <ListItem>
               <ListItemAvatar>
                 <Avatar>
                   <WorkIcon />
                 </Avatar>
               </ListItemAvatar>
               <ListItemText primary="Profession" secondary={a.jobTitle} />
             </ListItem>
             <Divider variant="inset" component="li" />
             <ListItem>
               <ListItemAvatar>
                 <Avatar>
                   <SchoolIcon />
                 </Avatar>
               </ListItemAvatar>
               <ListItemText primary="Education" secondary={a.education.map((a,i)=>a[0]+(','))} />
             </ListItem>
           </List>
           <Box sx={{display:'flex',flexDirection:'column'}}>
             <IconButton onClick={()=>DeleteCv(a._id)}><DeleteIcon sx={{color:'white'}}/></IconButton>
           <NavLink to={`/Pdf/${i}`} state={a}><IconButton><FormatPaintIcon sx={{color:'white'}}/></IconButton></NavLink>
            </Box>
             </Box>
                )}

        </Box>
        </Box>
    );
}

export default CvResults;