import React,{useState, useEffect} from 'react';
import logo from './star-wars-logo.png';
import './index.css';
import useDebouncer from '../../CustomHook/useDebouncer';
import axios from 'axios';
import {IoMdSearch} from 'react-icons/io'
import { GrClose } from 'react-icons/gr';
import { ListItem } from './ListItem';
import { useHistory } from 'react-router';


function HomePage() {
  const [query, setQuery] = useState('');
  const debouncedQuery=useDebouncer(query,300)                         //delayed query
  let [data,setdata]=useState([])     
  const [isLoading,setLoading]=useState(false)
  const [selectItem,setselectItem]=useState()                        //setting up selected item key
  const history=useHistory()

  useEffect(()=>{

    async function callapi(character){
      try{
        const response=await axios(`https://swapi.dev/api/people/?search=${character}`)
        response.data.count>0?setdata(response.data.results):setdata([{name:"No data"}])
      }
      catch(err){
        console.log("Error Fetching Data,Error :"+err)
      }
      finally{
        setLoading(false)
      }      
    }
    debouncedQuery?callapi(debouncedQuery):setdata([])
    setLoading(false)

  },[debouncedQuery])
    
  function setInput(e){
    setLoading(true) 
    setQuery(e.target.value)
  }

  function handleKeydown(e){                          //function for setting selected item
    if(e.keyCode===38 ||e.keyCode===40 ){
      if(e.keyCode===38){
        if (selectItem === 1) {
          setselectItem(0);
        } else if (selectItem <= 0) {
          setselectItem(5);
        }
        else{
          setselectItem(selectItem=>selectItem-1)
        }
      }
      else if(e.keyCode===40){  
        if(selectItem>4 || selectItem>data.length-1){
          setselectItem(0)
        }
        else{
          setselectItem(selectItem=>selectItem+1) 
        }
      }
      else{
        setselectItem(0)
      }
    }
    else if(e.keyCode===13 && data[0].name!=="No data"){
      history.push(`/person/${data[selectItem].name}`)
    }
    else{
      setselectItem(-1)  
    }
  }
  const handleclose=()=>{
    setQuery("")
  }
  return (
    <div>
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>      
      <div className="inputdiv" >
        <input autoFocus onKeyDown={handleKeydown} onChange={setInput} value={query} className={data.length>0?"search-inputbottomradius":"search-input"} placeholder="Search by name" />  
        <div className="icons">
          <div>
          <GrClose onClick={handleclose} />
          </div>
          {isLoading?<div className="spinner"></div>:
          <div className="search" >
            <IoMdSearch/>
          </div>}
        </div>
      </div>
      <div className="container">
        {data &&data.map((elem,index)=>5>index?<ListItem select={index===selectItem?"selected":"Notselected"} data={elem} />:null)}
      </div>
    </div>
  );
}

export default HomePage;
