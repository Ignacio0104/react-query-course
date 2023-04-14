import axios from "axios"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { request } from "../utils/axios-utils"

const fetchSuperHeros =()=>{
    //return axios.get("http://localhost:4000/superheroes") Without interceptor
    return request({url: "/superheroes"}) //With interceptor
  }

const addSuperHero =(hero)=>{
    //return axios.post("http://localhost:4000/superheroes",hero) Without interceptor
    return request({url: "/superheroes", method: "post", data:hero}) //With interceptor
  }


export const useSuperHeroesData =(onSuccess, onError)=>{ //Pass through params so each components can manage their actions
 return useQuery("super-heroes",fetchSuperHeros, //function that receives api data as argument. 
  {
    onSuccess: onSuccess,
    onError: onError,
    /*select: (data) =>{
      const superHeroNames =data.data.map(h=>h.name)
      return superHeroNames
    } */
  })
}

//Optimistic updates (assuming nothing can go wrong)

export const useAddSuperHeroData = ()=>{
  const queryClient = useQueryClient();
  return useMutation(addSuperHero,{
    onMutate: async (newHero)=>{//Before the mutation fn is fired.
      await queryClient.cancelQueries("super-heroes") //Cancel any outgoing refetches so they don't override our optimistic update
      const prevHeroData = queryClient.getQueryData("super-heroes") //Get the data to roll back in case something goes wrong
      queryClient.setQueryData("super-heroes",(oldQueryData)=>{
        return { ...oldQueryData,data:[...oldQueryData.data,{id: oldQueryData.data.length+1,...newHero}]}
      })
      return{
        prevHeroData, //Return the old data in case something goes wrong
      }
    }, 
    onError:(err,hero,context)=>{ //Calls only if the mutation encounters an error
      queryClient.setQueryData("super-heroes",context.prevHeroData)
    },
    onSettled: ()=>{ //Called if the mutation ends (With or without error)
      queryClient.invalidateQueries("super-heroes");
    }
  })
}
/*
export const useAddSuperHeroData = ()=>{
  const queryClient = useQueryClient();
  return useMutation(addSuperHero,{
    onSuccess:(data This param is added when using the response of the mutation)=>{
      //queryClient.invalidateQueries("super-heroes") //by invalidating this query, RQ will fetch it again
      //We can handle the mutation response to bring the new information instead of making a new call
      //That's why we commented out the invalidateQueries
      queryClient.setQueryData("super-heroes",(oldQueryData)=>{
        return { ...oldQueryData,data:[...oldQueryData.data,data.data]}
        //the first spread is to maintain the same info (response,status, etc)
        //The second spread is to update the array within that information
      })
    }
  })
}*/