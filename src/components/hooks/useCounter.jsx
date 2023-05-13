import React, { useState } from 'react';

const useCounter = () => {
  const [counter, setCounter]= useState(0);
  const increase =()=>{
    setCounter(count=>count+1);
  }
  const decrease =()=>{
    setCounter((prev)=>(prev-1))
  }
  
    return [counter, increase, decrease]
}

export default useCounter