import React, {useState, useEffect} from "react"
import './App.css';




function App({UserName}) {
  
  const [userName, setUserName] = useState(UserName)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)


  useEffect(() => {
    if(!userName) return
    setLoading(true)
    fetch(`https://api.github.com/users/${userName}`)
      .then((response) => response.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError)  
  }, [userName])

  if (loading) return <h1>loadning...</h1>; 
  if (error) 
    return <pre>{JSON.stringify(error, null, 2)}</pre>
  if (!data) return null


  return( 
    <div>
      <h1>{data.login}</h1>
      <h2>{data.email}</h2>
      <img alt={data.login} src={data.avatar_url}/><br></br>
      
      <input type="text" value={userName} onChange={ e => {setUserName(e.target.value)}}/>
    </div>
  )
}

export default App;


