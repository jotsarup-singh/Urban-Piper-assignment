import {useState,useEffect} from 'react';



function useDebouncer(query,delay=0){
   const [debouncedQuery,setdebouncedQuery]=useState("")
   useEffect(() => {
       const handler=setTimeout(() => {
        setdebouncedQuery(query)
       }, delay);
       return ()=>{
           clearTimeout(handler)
       }
   }, [query,delay])
   return debouncedQuery
}

export default useDebouncer