import React,{useEffect,useState} from 'react';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';
import styles from './index.module.css'
import { Loading } from './Loading';

function Person() {

  const [cardData,setCardData]=useState([])
  const [isLoading,setIsLoading]=useState(false)
  let {id}=useParams()
  const history=useHistory()


  useEffect(()=>{

    // IIFI for fetching data
   (async function fetchdata(){
     try{
       setIsLoading(true)
       let response=await axios(`https://swapi.dev/api/people/?search=${id}`)
       setCardData(response.data.results[0])
     }catch(err){
       console.log("Error Fetching Data,Error :"+err)
     }
     finally{
       setIsLoading(true)
    }  
    })()

  },[id])


  // pushing to home page
  function handleGoBack(){
    history.push("/")
  }

  return (
    isLoading?(<div className={styles.personContainer}>
    <h2>MAY THE FORCE BE WITH YOU</h2>
    <div className={styles.cardContainer} >
        <div className={styles.personCard}>
          <h2>{cardData.name}</h2>
          <p>Gender:- {cardData.gender}</p>
          <p>Birth:- {cardData.birth_year}</p>
          <p>Eye Color:- {cardData.eye_color}</p>
          <p> Skin Color:- {cardData.skin_color}</p>
          <p>Mass:- {cardData.mass}</p>
          <div onClick={handleGoBack} className={styles.cardButton} >Go Back</div>
        </div>
      </div>
    </div>):<Loading/>
  );
}

export default Person;
