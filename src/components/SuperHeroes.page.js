import axios from "axios";
import { useEffect, useState } from "react"

const SuperHeroesPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([])

    useEffect(() => {
      axios.get("http://localhost:4000/superheroes").then((res)=>{
        setData(res.data)
      })
      setIsLoading(false) //No poner dentro del axios, errores eslint
    }, [])
    
    return (
        <>
        <h1>SuperHeroesPage</h1>
        {isLoading ? (<h2>Loading...</h2>)
        :
        (
            data.map((heroe)=>
            (
                <div key={heroe.name}>{heroe.name}</div>
            ))
        )}
        
        </>
      
    )
  }
  
  export default SuperHeroesPage