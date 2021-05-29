import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import './index.css';

function Person() {

  const [cardData,setCardData]=useState([])
  const [isLoading,setIsLoading]=useState(false)
  let {id}=useParams()

  useEffect(()=>{
   (async function callfetchdata(){
     try{
       setIsLoading(true)
       let response=await axios(`https://swapi.dev/api/people/?search=${id}`)
       setCardData(response.data.results[0])
       console.log(response.data.results)
     }catch(err){
       console.log("Error Fetching Data,Error :"+err)
     }
     finally{
       setIsLoading(false)
    }  
    })()

  },[id])

  return (
    <div className="container">
      <h1>{cardData.name}</h1>
    </div>
  );
}

export default Person;
