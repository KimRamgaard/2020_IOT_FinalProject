import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } 
    from 'recharts';
import  {listSensordata} from './API'
import { useEffect, useState } from 'react';

function Chart() {
      

    const [sensordata, setSensordata] = useState([])

    useEffect(() => {
      //iffy
      (async() => {
         const _sensordata = await listSensordata();
         setSensordata(_sensordata)
         console.log(_sensordata)
      })()
    }, [])

    var data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}]

    return (
        <>
        <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
            top: 5, right: 30, left: 20, bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis dataKey=""/>
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
        </>
    );
}

export default Chart;