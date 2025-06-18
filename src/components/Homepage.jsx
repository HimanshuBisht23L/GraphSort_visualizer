import React from 'react'
import '../styles/Homepage.css'
import { useNavigate } from 'react-router-dom'


export default function Homepage() {

  const navigate = useNavigate();

  return (
    <div className='main-box'>
        <div className='sub-box'>

          <div className='Page-head'>
                <h1>Graph and Sorting Visualizer</h1>
                <p className='para-data'>learn and understand graphs easy.</p>
          </div>

          <div className='visoBtn'>
              <button onClick={()=>navigate('/Graph')} >Graph Visualizer</button>
              <button onClick={()=>navigate('/Sorting')} >Sorting Visualizer</button>
          </div>

        </div>
    </div>
  )
}
