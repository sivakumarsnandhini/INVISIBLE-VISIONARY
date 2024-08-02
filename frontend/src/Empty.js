
import React,{useEffect,useState} from 'react'

export default function Empty() {
    let [count,setcount]=useState(1)
    useEffect(()=>{
        count =count+1
        console.log(count);
    },[])
  return (
    <div>Empty</div>
  )
}
