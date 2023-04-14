import axios from "axios"
import { useQuery, useQueryClient } from "react-query"

/*const fetchSuperHero = (heroId)=>{
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const useSuperHeroData = (heroId)=>{
    return useQuery(["super-hero",heroId], ()=>fetchSuperHero(heroId)) //We make an array with the key and the id
                                                                        
}*/

//We can use fetchSuperHero without arroy function and query will pass it automatically
const fetchSuperHero = ({queryKey})=>{
    const heroId = queryKey[1] //QueryKey is the array we defined on line 20 
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const useSuperHeroData = (heroId)=>{
    const queryClient = useQueryClient() //To access the cache information and fire a fetch in the background
    return useQuery(["super-hero",heroId], fetchSuperHero,{
        initialData: ()=>{
            const hero = queryClient.getQueryData("super-heroes")?.data?.find(h=>h.id === parseInt(heroId)) //Search if the hero existe in cache
            if(hero){
                return{
                    data:hero //we must set data to the hero because in the jsx we are accessing the information through data?.data.name
                }
            }else{
                return undefined
            }
        }
    }) //We make an array with the key and the id
                                                                        
}