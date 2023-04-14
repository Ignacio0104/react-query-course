import axios from "axios"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import { useAddSuperHeroData, useSuperHeroesData } from "../hooks/useSuperHeroesData"
import { useState } from "react"

/*const fetchSuperHeros =()=>{
  return axios.get("http://localhost:4000/superheroes")
}*/
const RQSuperHeroesPage = () => {
  const [name, setName] = useState("")
  const [alterEgo, setAlterEgo] = useState("")

  const onSuccess =(data)=>{
    console.log("Perfom side effect",data)
  }
  const onError =(data)=>{
    console.log("Perfom side effect after error",data)
  }

  const {isLoading, data, error,isError,isFetching, refetch}= useSuperHeroesData(onSuccess,onError);
  const {mutate} = useAddSuperHeroData() //ADD HERO

  const handleAddHeroClick = ()=>{
    const hero = {name:name, alterEgo:alterEgo}
    mutate(hero)
  }

    if(isLoading || isFetching){
      return <h2>Loading...</h2>
    }
    console.log({isLoading, isFetching}) //flag to indicate background fetching

    if(isError){
      return <h2>Please verify the informaction</h2>
    }
    return (
      <>
      <h1>RQ Super Heroes Page</h1>
      <div>
        <input type="text" value={name} onChange={(e)=> setName (e.target.value)}></input>
        <input type="text" value={alterEgo} onChange={(e)=> setAlterEgo (e.target.value)}></input>
        <button onClick={handleAddHeroClick}>Add hero</button>
      </div>
      <button onClick={refetch}>Fetch heros</button>{/*refect comes from useQuery*/}
      {
        data?.data.map(h=>(
          <div key={h.id}>
            <Link to={`/rq-super-heroes/${h.id}`}>{h.name}</Link>
          </div>
        ))
      } 
      {/* {
        data?.data.map(h=>(
          <div key={h.name}>
            {h.name} 
          </div>
        ))
      } 

      //map with the data changed. No longer hero.name thanks to select
      data.map(heroName=>(
        <div key={heroName}>
        {heroName} 
      </div>
      ))
      */}
      </>
    )
    
  }
  
  export default RQSuperHeroesPage


    //Receives two arguments: 1st unique key to identifiy this query. 
  //2nd: A function that return a promise
  /*const {isLoading, data}=useQuery("super-heroes", ()=>{
    return axios.get("http://localhost:4000/superheroes")
  })*/
  /* This now is called through the custom Hook
  useQuery("super-heroes",fetchSuperHeros, 
  {
    //cacheTime:5000,  //You can update the time that info is cached
    //staleTime: 30000, //delays de background fetched. The default staleTime is 0
    //refetchOnMount: true, //default value is true
    //refetchOnWindowFocus: true,
    //refetchInterval: 2000 //Default is false. If number, it will refetched every x seconds
    //refetchIntervalInBackground: true //with this, the refetchInterval works even when the browser is not on focus
    //enabled:false, //this disabled the call of fetchSuperHeros to automatic
    onSuccess: onSuccess, //We assign which function to run when success or error
    onError: onError,
    select: (data) =>{
      const superHeroNames =data.data.map(h=>h.name)
      return superHeroNames
    } //function that receives api data as argument. 
  })*/
  //Every query result is cache for 5 minutes. UseQuery rely on that for next requests
  //A background fetch is donde in the background to check for updates