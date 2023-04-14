import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

const fetchSuperHeroes = ()=>{
    return axios.get("http://localhost:4000/superheroes")
}

const fetchFriends = ()=>{
    return axios.get("http://localhost:4000/friends")
}

const ParallelQueriesPage= () => {
    const {data:superHeroes}=useQuery("super-heroes",fetchSuperHeroes); //We use alias so theres no conflict for two variables called data
    const {data:friends}=useQuery("friends",fetchFriends);
    console.log(friends.data)
  return (
    <div>
        <h2>RQ Parallel</h2>
        {superHeroes?.data.map((h)=>(
            <h3>{h.name}</h3>
        ))}
        {friends?.data.map((h)=>(
            <h3>{h.name}</h3>
        ))}
    </div>
  )
}

export default ParallelQueriesPage