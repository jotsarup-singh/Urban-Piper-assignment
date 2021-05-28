import React,{useState, useEffect} from 'react';
import logo from './star-wars-logo.png';
import './index.css';
import useDebouncer from '../../CustomHook/useDebouncer';
import axios from 'axios';
// GrFormClose

import { GrClose } from 'react-icons/gr';


function HomePage() {
  const [query, setQuery] = useState('');
  const debouncedQuery=useDebouncer(query,300)                         //delayed query
  const [data,setdata]=useState([])
  const [isLoading,setLoading]=useState(false)
  const [isError,setError]=useState(false)
  

  useEffect(()=>{
    setLoading(false)
    async function callapi(character){
      const response=await axios(`https://swapi.dev/api/people/?search=${character}`)
      response.data.count>0?setdata(response.data.results):setdata([{name:"No data"}])
    }
    debouncedQuery?callapi(debouncedQuery):setdata([]) 
    
  },[debouncedQuery])

  console.log(data)

  function setInput(e){
    setQuery(e.target.value)
  }
  
  console.log(data)
  return (
    <div>
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>
      
      <input autoFocus onChange={setInput} value={query} className={data.length>0?"search-inputbottomradius":"search-input"} placeholder="Search by name" />  
      <div className="container">{data &&data.map((el,i)=>5>i?<div className="styles" >{el.name}</div>:null)}</div>
    </div>
  );
}

export default HomePage;
