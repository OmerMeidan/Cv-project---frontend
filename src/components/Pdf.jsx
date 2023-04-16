import React from 'react';
import {Card,TextField,Button,Typography,Box,InputLabel,Select,MenuItem,FormControl,AppBar} from '@mui/material';
import img from '../images/img.png'
import { useLocation, useParams } from 'react-router-dom';
import { useContext,useEffect,useState } from 'react';
import { IdContext } from '../App';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas'
import IconButton from '@mui/material/IconButton';
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import RoomIcon from '@mui/icons-material/Room';
import { useRef } from 'react';
function Pdf() {
    const {id,setId,resultsArr,setResultsArr}=useContext(IdContext)
    const div=useRef()
    const location=useLocation()
    const cv=location.state
    const toPdf = async ()=>{
        const pdf = new jsPDF();
        const canvas  = await html2canvas(div.current)
        pdf.addImage(canvas.toDataURL("image/png"),"PNG",0,0)
        pdf.save("a4.pdf")
    }
    console.log(cv);
    return (
        <Box sx={{width:'100vw',height:'100%',backgroundImage:`url(${img})`,display:'flex',flexDirection:'column',gap:'2vw',justifyContent:'center',alignItems:'center'}}>
            <div ref={div} style={{width:'43%',height:'80%',backgroundColor:'white'}}>
                <div style={{width:'100%',height:'15%',background:'black',color:'white',display:'flex',flexDirection:'column',justifyContent:'space-between',textAlign:'left'}}>
                 <Typography variant='h4' sx={{marginLeft:'0.5vw'}}>{cv.fullName}</Typography>
                 <p style={{marginLeft:'0.5vw'}}>{cv.jobTitle}</p>
                </div>
                <div style={{width:'100%',height:'85%',display:'flex',flexDirection:'row'}}>
                    <div style={{width:'30%',height:'100%',backgroundColor:'white'}}>
                        <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                        <IconButton><PhoneIcon/></IconButton>
                        {cv.contact[0]}
                        </Box>
                        <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                            <IconButton><AlternateEmailIcon/></IconButton>
                            {cv.contact[1]}
                        </Box>
                        <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                            <IconButton><RoomIcon/></IconButton>
                            {cv.contact[2]}
                        </Box>
                        <hr style={{width:'85%'}}/>
                        <Typography><b>Skills</b></Typography>
                        <Box sx={{display:'flex',flexDirection:'row',textAlign:'left'}}>
                            <ul>
                            {cv.skills.map((a,i)=>
                                <li>{a}</li>
                            )}
                            </ul>
                        </Box>
                        <hr style={{width:'85%'}}/>
                        <Typography><b>Languages</b></Typography>
                        <Box sx={{display:'flex',flexDirection:'row',textAlign:'left'}}>
                            <ul>
                            {cv.language.map((a,i)=>
                                <li>{a.map((b,j)=>b +( j===0? " - ":""))}</li>
                            )}
                            </ul>
                        </Box>
                    </div>
                    <div style={{width:'70%',height:'100%',backgroundColor:'white',borderLeft:'black solid 1px'}}>
                       <Typography><b> About me</b></Typography>
                        <Typography sx={{textAlign:'left'}}>{cv.aboutMe}</Typography>
                        <hr style={{width:'85%'}}/>
                        <Typography><b>Education</b></Typography>
                        <Typography>
                            <ul>
                                {cv.education.map((a,i)=>
                                <li>{a.map((b,j)=>b +( j===0? " - ":""))}</li>
                            )}
                        </ul>
                        </Typography>
                        <hr style={{width:'85%'}}/>
                        <Typography><b>Job Resume</b></Typography>
                        <Typography><b>Education</b></Typography>
                        <Typography>
                            <ul>
                                {cv.jobResume.map((a,i)=><li>{a.map((b,j)=>b +( j===0? " - ":""))}</li>)}
                            </ul>
                        </Typography>
                        <hr style={{width:'85%'}}/>
                    </div>
                </div>
            </div>
            <button onClick={()=>toPdf()}>click</button>
            
        </Box>
    );
}

export default Pdf;