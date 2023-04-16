import {useState} from 'react'
function Context(props) {
    const [id,setId]=useState(JSON.parse(localStorage.getItem('id')))
    const [resultsArr,setResultsArr]=useState([])
    return {
        id,setId,resultsArr,setResultsArr
    }
}

export default Context;