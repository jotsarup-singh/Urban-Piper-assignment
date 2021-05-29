import React,{useState, useEffect} from 'react';
import logo from './star-wars-logo.png';
import './index.css';
import useDebouncer from '../../CustomHook/useDebouncer';
import axios from 'axios';

import {IoMdSearch} from 'react-icons/io'
import { GrClose } from 'react-icons/gr';


function HomePage() {
  const [query, setQuery] = useState('');
  const debouncedQuery=useDebouncer(query,300)                         //delayed query
  const [data,setdata]=useState([])     
  const [isLoading,setLoading]=useState(false)
  const [isError,setError]=useState(false)
  const [selectItem,setselectItem]=useState()                        //setting up selected item key


  useEffect(()=>{
    setLoading(false)
    async function callapi(character){
      const response=await axios(`https://swapi.dev/api/people/?search=${character}`)
      response.data.count>0?setdata(response.data.results):setdata([{name:"No data"}])
    }
    debouncedQuery?callapi(debouncedQuery):setdata([]) 
  },[debouncedQuery])
  
  function setInput(e){
    setQuery(e.target.value)
  }

  function handleKeydown(e){                              //function for setting selected item
    if(e.keyCode===38 ||e.keyCode===40 ){
      if(e.keyCode===38){
        setselectItem(selectItem=>selectItem-1)
      }
      else if(e.keyCode===40){  
        setselectItem(selectItem=>selectItem+1)
      }
      else{
        setselectItem(0)
      }
    }
    else if(e.keyCode===13 && data[0].name!=="No data"){
      console.log("enter")
    }
    else{
      setselectItem(-1)  
    }
  }

  return (
    <div>
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>
      {/* <div className="icons">
        <div>
        <GrClose/>
        </div>
        <div>
          <IoMdSearch/>
        </div>
      </div> */}

      <input autoFocus onKeyDown={handleKeydown} onChange={setInput} value={query} className={data.length>0?"search-inputbottomradius":"search-input"} placeholder="Search by name" />  
      <div className="container">
        {data &&data.map((el,i)=>5>i?<div className={i===selectItem?"selected":"Notselected"} >{el.name}</div>:null)}
      </div>
    </div>
  );
}

export default HomePage;
