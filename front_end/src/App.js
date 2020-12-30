import React from "react"
import './App.css';
import  {listSensordata} from './API'
import { useEffect, useState } from 'react';




function App() {

  const [sensordata, setSensordata] = useState([])
  

  useEffect(() => {
    //iffy
    (async() => {
       const _sensordata = await listSensordata();
       setSensordata(_sensordata)
       console.log(_sensordata)
    })()
  }, [])


  return( 
    <div>
      <h1>testing...</h1>
      <ul>
      {
        sensordata.map(entry => (
          <li>{entry.topic}</li>
        ))
      }
      </ul>
      
    </div>
  )
}

export default App;


